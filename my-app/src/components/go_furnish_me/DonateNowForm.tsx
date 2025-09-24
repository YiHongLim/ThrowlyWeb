import React from 'react';
import { Modal, Form, Input, InputNumber, Button, Select } from 'antd';

type DonateNowFormProps = {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (values: any) => void;
};

const { TextArea } = Input;

const DonateNowForm: React.FC<DonateNowFormProps> = ({ visible, onCancel, onSubmit }) => {
    const [form] = Form.useForm();

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
                onFinish={onSubmit}
            >
                <Form.Item
                    label="Donor Name"
                    name="name"
                    rules={[{ required: true, message: 'Your name is required!' }]}
                >
                    <Input placeholder="Full name" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Your email is required!' },
                        { type: 'email', message: 'Please enter a valid email!' },
                    ]}
                >
                    <Input placeholder="Email address" />
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
