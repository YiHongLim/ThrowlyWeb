import React, { useState } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Select,
    Button,
    Upload,
    message,
    Steps
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {useAuth} from "../../context/useAuth";

const { Step } = Steps;

interface StepFormData {
    title: string;
    goal: string;
    media: any;
    category: string;
    story: string;
}

const initialFormState: StepFormData = {
    title: '',
    goal: '',
    media: null,
    category: '',
    story: ''
};

// Step 1
type StepOneProps = {
    onNext: (values: Pick<StepFormData, "title" | "goal">) => void;
    initialValues: Partial<StepFormData>;
};
function StepOne({ onNext, initialValues }: StepOneProps) {
    const [form] = Form.useForm();
    return (
        <Form form={form} initialValues={initialValues} onFinish={onNext} layout="vertical">
            <Form.Item
                label="Fundraiser Title"
                name="title"
                rules={[{ required: true, message: "Please enter a fundraiser title!" }]}
            >
                <Input placeholder="Enter Fundraiser Title" />
            </Form.Item>
            <Form.Item
                label="Fundraising Goal ($)"
                name="goal"
                rules={[{ required: true, message: "Please enter a fundraiser goal!" }]}
            >
                <InputNumber style={{ width: '100%' }} placeholder="Enter Fundraiser Goal ($)" />
            </Form.Item>
            <Button type="primary" htmlType="submit">Next</Button>
        </Form>
    );
}

// Step 2
type StepTwoProps = {
    onNext: (values: Pick<StepFormData, "media" | "category">) => void;
    onPrev: () => void;
    initialValues: Partial<StepFormData>;
};
function StepTwo({ onNext, onPrev, initialValues }: StepTwoProps) {
    const [form] = Form.useForm();
    return (
        <Form form={form} initialValues={initialValues} onFinish={onNext} layout="vertical">
            <Form.Item label="Media (Image)" name="media" valuePropName="fileList"
                       getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
                       rules={[{ required: true, message: "Please upload a cover photo!" }]}>
                <Upload.Dragger beforeUpload={() => false} maxCount={1}>
                    <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                    <p>Click or drag file to this area to upload</p>
                </Upload.Dragger>
            </Form.Item>
            <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please select a category!" }]}>
                <Select placeholder="Select a category">
                    <Select.Option value="medical">Medical</Select.Option>
                    <Select.Option value="education">Education</Select.Option>
                    <Select.Option value="emergency">Emergency</Select.Option>
                </Select>
            </Form.Item>
            <Button onClick={onPrev} style={{ marginRight: 8 }}>Previous</Button>
            <Button type="primary" htmlType="submit">Next</Button>
        </Form>
    );
}

// Step 3
type StepThreeProps = {
    onNext: (values: Pick<StepFormData, "story">) => void;
    onPrev: () => void;
    initialValues: Partial<StepFormData>;
};
function StepThree({ onNext, onPrev, initialValues }: StepThreeProps) {
    const [form] = Form.useForm();
    return (
        <Form form={form} initialValues={initialValues} onFinish={onNext} layout="vertical">
            <Form.Item label="Fundraiser Story" name="story"
                       rules={[{ required: true, message: "Please tell your story!" }]}>
                <Input.TextArea rows={5} placeholder="Enter Fundraiser Story" />
            </Form.Item>
            <Button onClick={onPrev} style={{ marginRight: 8 }}>Previous</Button>
            <Button type="primary" htmlType="submit">Launch Fundraiser</Button>
        </Form>
    );
}

export default function GoFurnishMePage() {
    const storage = getStorage();
    const [formData, setFormData] = useState<StepFormData>(initialFormState);
    const [current, setCurrent] = useState(0);
    const { currentUser } = useAuth();

    const handleStepOne = (values: Pick<StepFormData, "title" | "goal">) => {
        setFormData(prev => ({ ...prev, ...values }));
        setCurrent(1);
    };
    const handleStepTwo = (values: Pick<StepFormData, "media" | "category">) => {
        setFormData(prev => ({ ...prev, ...values }));
        setCurrent(2);
    };
    const handleStepThree = async (values: Pick<StepFormData, "story">) => {
        const uploadMedia = async () => {
            if (formData.media && formData.media[0] && formData.media[0].originFileObj) {
                const fileObj = formData.media[0].originFileObj;
                const storageRef = ref(storage, `FurnishCampaign/${fileObj.name}`);
                await uploadBytes(storageRef, fileObj);
                return await getDownloadURL(storageRef);
            }
            return "";
        };
        try {
            const mediaUrl = await uploadMedia();
            const finalData = { ...formData, ...values, media: mediaUrl };
            await addDoc(collection(db, "FurnishCampaign"), {
                ...finalData,
                userId: currentUser?.uid,
                created: serverTimestamp(),
            });
            message.success("Furnish-raiser launched!");
            setFormData(initialFormState);
            setCurrent(0);
        } catch (err) {
            message.error("Failed to launch furnish-raiser");
        }
    };

    return (
        <div style={{ maxWidth: 520, margin: "40px auto", background: "#fff", borderRadius: "12px", padding: 24 }}>
            <Steps current={current} style={{ marginBottom: 32 }}>
                <Step title="Basic info" />
                <Step title="Details" />
                <Step title="Story" />
            </Steps>
            {current === 0 && <StepOne onNext={handleStepOne} initialValues={formData} />}
            {current === 1 && <StepTwo onNext={handleStepTwo} onPrev={() => setCurrent(0)} initialValues={formData} />}
            {current === 2 && <StepThree onNext={handleStepThree} onPrev={() => setCurrent(1)} initialValues={formData} />}
        </div>
    );
}
