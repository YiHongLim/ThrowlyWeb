// import React from 'react';
import {Form, Input, InputNumber, Select, Button, Card, Row, Col, Typography, Upload} from 'antd';
import { ArrowLeftOutlined, InboxOutlined } from '@ant-design/icons';
import {useNavigate} from "react-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {db} from "../../firebase";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import NavBar from "../../components/home/NavBar";
import {useState} from "react";

const { TextArea } = Input;

const categories = [
    "Home",
    "Office",
    "Outdoor",
    "Children",
    "Other"
];

export default function GoFurnishMePage() {
    const navigate = useNavigate();
    const storage = getStorage();

    const [form] = Form.useForm();
    const [createdCampaignId, setCreatedCampaignId] = useState("");

    const handleFinish = async (values: any) => {
        try {
            let mediaUrl = "";
            if (values.media && values.media.length > 0) {
                const fileObj = values.media[0].originFileObj;
                const storageRef = ref(storage, `FurnishCampaign/${fileObj.media}`);
                await uploadBytes(storageRef, fileObj);
                mediaUrl = await getDownloadURL(storageRef);
            }
            const docRef = await addDoc(collection(db, "FurnishCampaign"), {
                ...values,
                media: mediaUrl,
                created: serverTimestamp(),
            });
            setCreatedCampaignId(docRef.id);
            form.resetFields();
            alert("Furnish-raiser launched!");
        } catch (e) {
            if (e instanceof Error) {
                alert("Failed to launch furnish-raiser: " + e.message)
            }
        }
    };

    return (
        <>
            <NavBar />
            <Card
                style={{ maxWidth: 900, margin: '48px auto', padding: 32 }}
            >
                <Button
                    type="link"
                    icon={<ArrowLeftOutlined />}
                    style={{ marginBottom: 16, paddingLeft: 0}}
                    onClick={() => navigate('/campaign-page')}
                    >
                    Back to Campaigns
                </Button>
                <Row gutter={[48, 32]} style={{ alignItems: 'flex-start' }}>
                    {/* Main Form */}
                    <Col xs={24} md={16}>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleFinish}
                        >
                            <Form.Item label="Media (Image/Video)" name="media" valuePropName={"fileList"} getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}>
                                <Upload.Dragger>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className={"ant-upload-text"}>Click or drag file to this area to upload</p>
                                </Upload.Dragger>
                            </Form.Item>

                            <Form.Item
                                label="Fundraiser Title"
                                name="title"
                                rules={[{ required: true, message: 'Please enter a fundraiser title' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Fundraising Goal ($)"
                                name="goal"
                                rules={[{ required: true, message: 'Please enter a fundraising goal' }]}
                            >
                                <InputNumber style={{ width: '100%' }} min={1} />
                            </Form.Item>

                            <Form.Item
                                label="Category"
                                name="category"
                                rules={[{ required: true, message: 'Please select a category' }]}
                            >
                                <Select placeholder="Select a category">
                                    {categories.map(cat => (
                                        <Select.Option key={cat} value={cat}>{cat}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Location"
                                name="location"
                                rules={[{ required: true, message: 'Please enter a location' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Fundraiser Story"
                                name="story"
                                rules={[{ required: true, message: 'Please describe the story' }]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                            <Button
                                type="primary"
                                size="large"
                                style={{ textTransform: 'none', whiteSpace: 'nowrap', width: '100%' }}
                                onClick={() => form.submit()}

                            >
                                Launch Fundraiser
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </>
    );
}
