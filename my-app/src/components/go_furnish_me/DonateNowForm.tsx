import React from 'react';
import {Modal, Form, Input, InputNumber, Button, Select, Upload} from 'antd';
import {InboxOutlined} from "@ant-design/icons";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "../../firebase";

type DonateNowFormProps = {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (values: any) => void;
    campaignId: string;
};

const { TextArea } = Input;

const DonateNowForm: React.FC<DonateNowFormProps> = ({ visible, onCancel, onSubmit, campaignId }) => {
    const [form] = Form.useForm();
    const storage = getStorage();

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
            media: mediaUrl,
            created_at: serverTimestamp(),
            campaignId
        })
        form.resetFields();
        onSubmit(docRef);
        onCancel();
    }

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
            >
                <Form.Item
                    label="Donor Name"
                    name="name"
                    rules={[{ required: true, message: 'Your name is required!' }]}
                >
                    <Input placeholder="Full name" />
                </Form.Item>

                <Form.Item
                    label="Donation Type"
                    name="type"
                    rules={[{ required: true, message: 'Select what you want to donate!' }]}
                >
                    <Select>
                        <Select.Option value="money">Money</Select.Option>
                        <Select.Option value="goods">Goods/Items</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Media (Image/Video)" name="media" valuePropName={"fileList"} getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}>
                    <Upload.Dragger>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className={"ant-upload-text"}>Click or drag file to this area to upload</p>
                    </Upload.Dragger>
                </Form.Item>

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

                <Form.Item
                    label="Goods/Items to Donate"
                    name="goods"
                    dependencies={['type']}
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (getFieldValue('type') === 'goods' && (!value || value.trim() === '')) {
                                    return Promise.reject('Please describe what you want to donate!');
                                }
                                return Promise.resolve();
                            }
                        }),
                    ]}
                >
                    <TextArea rows={2} placeholder="Describe item(s), quantity, brand, condition, etc." />
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
