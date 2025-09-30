import React, {useEffect, useState} from 'react';
import {Modal, Form, Input, InputNumber, Button, Select, Upload} from 'antd';
import {InboxOutlined} from "@ant-design/icons";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "../../firebase";
import {getLLMPrice} from "../../utils/api";

type DonateNowFormProps = {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (values: any) => void;
    campaignId: string;
};

const { TextArea } = Input;

// TEMP: Replace these with real values as needed
const latitude = 37.7749;   // e.g., from geolocation or props
const longitude = -122.4194;  // e.g., from geolocation or props
const username = "user_jt7bdy"; // e.g., from auth context
const model = "claude-3-haiku-20240307"; // or your target model

const DonateNowForm: React.FC<DonateNowFormProps> = ({ visible, onCancel, onSubmit, campaignId }) => {
    const [form] = Form.useForm();
    const [imageUrls, setImageUrls] = React.useState<string[]>([]);
    const [description, setDescription] = React.useState('');
    const [estimatedAmount, setEstimatedAmount] = React.useState(null);
    const [uploading, setUploading] = useState(false);

    const storage = getStorage();
    // const { currentUser } = useAuth();

    const handleFinish = async(values:any) => {
        let mediaUrl = null;

        if (values.media && values.media.length > 0) {
            const file = values.media[0].originFileObj;
            const storageRef = ref(storage, `CampaignDonations/${file.name}`);
            await uploadBytes(storageRef, file);
            mediaUrl = await getDownloadURL(storageRef);
        }

        const docRef = await addDoc(collection(db, "CampaignDonations"), {
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


    useEffect(() => {
        // Only run if both an uploaded Firebase image URL and a non-empty description are available
        if (imageUrls.length > 0 && description.trim() !== '' && !uploading) {
            // Print for debugging
            console.log("imageUrls:", imageUrls);
            console.log("First imageUrl:", imageUrls[0]);
            console.log("Description:", description);
            console.log("Uploading flag:", uploading);
            const fetchEstimate = async () => {
                try {
                    // Always use the Firebase Storage URL, not a blob!
                    const priceResult = await getLLMPrice(
                        [imageUrls[0]],
                        description,
                        latitude,
                        longitude,
                        username,
                        model
                    );
                    const llmPrice = priceResult.listing.llmPrice;
                    setEstimatedAmount(llmPrice);
                    console.log('Estimate:', llmPrice , { url: imageUrls[0], description });
                } catch (e) {
                    console.error("Estimation error:", e, { url: imageUrls[0], description });
                }
            };
            fetchEstimate();
        }
    }, [imageUrls, description, uploading]);

    return (
        <Modal
            visible={visible}
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
                        beforeUpload={() => false}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className={"ant-upload-text"}>Click or drag file to this area to upload your donation item</p>
                    </Upload.Dragger>
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    dependencies={['type']}
                >
                    <TextArea rows={2} placeholder="Describe item(s), quantity, brand, condition, etc." />
                </Form.Item>

                {estimatedAmount !== null && (
                    <div style={{ marginBottom: 16, color: '#1890ff', fontWeight: 500 }}>
                        Estimated Amount: ${estimatedAmount}
                    </div>
                )}

                <Form.Item
                    label="Amount ($)"
                    name="amount"
                    dependencies={['type']}
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (getFieldValue('type') === 'money' && (!value || value <= 0)) {
                                    return Promise.reject('Please enter a valid donation amount!');
                                }
                                return Promise.resolve();
                            }
                        }),
                    ]}
                >
                    <InputNumber min={1} placeholder="Amount in USD" style={{ width: '100%' }} />
                </Form.Item>




                <Form.Item label="Message or Note" name="note">
                    <TextArea rows={2} placeholder="Leave a message for the campaign (optional)" />
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
