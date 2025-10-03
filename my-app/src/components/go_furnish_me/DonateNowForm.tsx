import React, {useEffect, useState} from 'react';
import {Modal, Form, Input, InputNumber, Button, Select, Upload, message, Spin, Switch} from 'antd';
import {InboxOutlined} from "@ant-design/icons";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {addDoc, collection, doc, getDoc, serverTimestamp} from "firebase/firestore";
import {db} from "../../firebase";
import {getLLMPrice} from "../../utils/api";
import { debounce }  from "lodash";
import {getAuth} from "firebase/auth";

type DonateNowFormProps = {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (values: any) => void;
    campaignId: string;
};

const { TextArea } = Input;

async function fetchUsername(userId: string) {
    const userDocRef = doc(db, "Users", userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
        return userDocSnap.data().username;
    } else {
        return null;
    }
}

// TEMP: Replace these with real values as needed
const latitude = 37.7749;   // e.g., from geolocation or props
const longitude = -122.4194;  // e.g., from geolocation or props
const username = "user_jt7bdy"; // e.g., from auth context
const model = "claude-3-haiku-20240307"; // or your target model

const DonateNowForm: React.FC<DonateNowFormProps> = ({ visible, onCancel, onSubmit, campaignId }) => {
    const [form] = Form.useForm();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [description, setDescription] = useState('');
    const [estimatedAmount, setEstimatedAmount] = useState(null);
    const [priceExplanation, setPriceExplanation] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [isEstimating, setIsEstimating] = useState(false);

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const userId = currentUser?.uid;

    const storage = getStorage();

    const handleFinish = async(values:any) => {
        try {
            let mediaUrl = null;
            const username = await fetchUsername(userId!);

            if (values.media && values.media.length > 0) {
                const file = values.media[0].originFileObj;
                const storageRef = ref(storage, `CampaignDonations/${file.name}`);
                await uploadBytes(storageRef, file);
                mediaUrl = await getDownloadURL(storageRef);
            }

            const docRef = await addDoc(collection(db, "CampaignDonations"), {
                username: username,
                ...values,
                amount: estimatedAmount,
                media: mediaUrl,
                created_at: serverTimestamp(),
                campaignId
            })
            setImageUrls([]);
            setDescription('');
            setEstimatedAmount(null);
            onSubmit(docRef);
            onCancel();
        } catch (err: any) {
            message.error(`Donation failed to save: ${err.message || err}`);
            console.error(err);
        }

    }

    const handleValuesChange = async (changed: any, allValues: any) => {
        if ('media' in changed && allValues.media?.length > 0) {
            const file = allValues.media[0].originFileObj;
            const storageRef = ref(storage, `CampaignDonations/${file.name}`);
            await uploadBytes(storageRef, file);
            const mediaUrl = await getDownloadURL(storageRef);

            setImageUrls([mediaUrl]);  // set to uploaded Firebase URL!
            setUploading(false);
        } else if ('media' in changed && (!allValues.media || allValues.media.length === 0)) {
            setImageUrls([]);
        }
        if ('description' in changed) {
            setDescription(allValues.description || '');
        }
    };

    /** Fetch estimate listing price **/
    useEffect(() => {
        // Only run if both an uploaded Firebase image URL and a non-empty description are available
        if (imageUrls.length > 0 && description.trim() !== '' && !uploading) {

            const debouncedFetch = debounce(async () => {
                setIsEstimating(true);
                console.log("Estimating...");
                // console.log("Uploading flag:", uploading);
                const fetchEstimate = async () => {
                    try {
                        // Always use the Firebase Storage URL, not a blob!
                        const priceResult = await getLLMPrice(
                            [imageUrls[0]],
                            description,
                            username,
                            model
                        );
                        const llmPrice = priceResult.listing.llmPrice;
                        setEstimatedAmount(llmPrice);
                        setPriceExplanation(priceResult.listing.priceExplanation);
                        console.log('Estimate:', llmPrice , { url: imageUrls[0], description });
                    } catch (e) {
                        console.error("Estimation error:", e, { url: imageUrls[0], description });
                    }
                };
                try {
                    await fetchEstimate();
                } finally {
                    setIsEstimating(false);
                }
            }, 2000);
            debouncedFetch();
            return() => debouncedFetch.cancel();
        }
    }, [imageUrls, description, uploading]);

    useEffect(() => {
        if (estimatedAmount != null) {
            form.setFieldsValue({ points: estimatedAmount });
        }
    }, [estimatedAmount, form]);

    return (
        <Modal
            open={visible}
            title="Donate to This Campaign"
            onCancel={onCancel}
            footer={null}
            centered
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                onValuesChange={handleValuesChange}
            >
                {/* store the donor name */}

                <Form.Item label="Media (Image/Video)" name="media" valuePropName={"fileList"} getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}>
                    <Upload.Dragger
                        beforeUpload={() => false}
                        accept=".jpg,.jpeg,.png,.gif,.bmp,.webp, .avif"
                        listType="picture">
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className={"ant-upload-text"}>Click or drag file to this area to upload your donation item</p>
                    </Upload.Dragger>
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <TextArea rows={2} placeholder="Describe item(s), quantity, brand, condition, etc." />
                </Form.Item>

                {
                    <div> Points </div>
                }
                {isEstimating ? (
                    <Spin style={{ marginBottom: 16 }} tip={"Estimating points for item..."}>
                        <div style={{minHeight: 40}} />
                    </Spin>
                ) : (
                    estimatedAmount !== null && (
                        <div style={{ marginBottom: 16, color: '#1890ff', fontWeight: 500 }}>
                             {estimatedAmount}
                        </div>
                    )
                )}


                {/*<Form.Item*/}
                {/*    label="Points"*/}
                {/*    name="points"*/}
                {/*>*/}
                {/*    <Spin spinning={isEstimating} tip={"Estimating points for item..."}>*/}

                {/*    <InputNumber min={1} style={{ width: '100%' }} readOnly={true} value={estimatedAmount ?? 0} formatter={value => `$${value}`}/>*/}
                {/*    </Spin>*/}
                {/*</Form.Item>*/}
                <Form.Item label="Price explanation">
                    <div style={{ color: '#888', fontStyle: 'italic' }}>
                        {priceExplanation}
                    </div>
                </Form.Item>

                <Form.Item label="Campaign Visibility" name={"isPublic"} valuePropName={"checked"} initialValue={true}>
                    <Switch checkedChildren={"Public"} unCheckedChildren={"Private"} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Donate Now
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default DonateNowForm;
