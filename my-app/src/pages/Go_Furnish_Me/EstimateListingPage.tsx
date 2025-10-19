import {Button, Form, Input, Typography, Upload, Spin, message, Row, Col, Divider, Collapse, Modal, Card} from "antd";
import React, { useState } from "react";
import { getLLMPrice } from "../../utils/api";
import { InboxOutlined, CheckCircleTwoTone, DeleteOutlined } from "@ant-design/icons";
import { UploadFile, UploadChangeParam } from 'antd/es/upload/interface';
import { getCategoryLabel } from "../../utils/helpers";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const username = "user_jt7bdy";
const model = "claude-3-haiku-20240307";

const EstimateListingPage: React.FC = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]);
    const [description, setDescription] = useState("");
    const [estimatedAmount, setEstimatedAmount] = useState<number | null>(null);
    const [priceExplanation, setPriceExplanation] = useState<string>("");
    const [categoryId, setCategoryId] = useState<string>("");
    const [size, setSize] = useState("");
    const [responseTime, setResponseTime] = useState<number | null>(null);
    const [isEstimating, setIsEstimating] = useState<boolean>(false);
    const [showEstimate, setShowEstimate] = useState<boolean>(false);
    const [successAnim, setSuccessAnim] = useState<boolean>(false);
    const [dragIconAnim, setDragIconAnim] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const label = getCategoryLabel(categoryId);

    const onImageChange = (info: UploadChangeParam<UploadFile<any>>) => {
        const latestFiles = info.fileList.slice(-1);
        setFileList(latestFiles);
        if (latestFiles.length && latestFiles[0].originFileObj) {
            const reader = new FileReader();
            reader.onload = e => setImagePreview(e.target?.result as string);
            reader.readAsDataURL(latestFiles[0].originFileObj);
        }
        setDragIconAnim(true);
        setTimeout(() => setDragIconAnim(false), 800);
    };

    const removeImage = () => {
        setFileList([]);
        setImagePreview(null);
    }

    const fetchEstimate = async () => {
        if (fileList.length === 0 || description.trim() === '') {
            message.warning("Please upload an image and enter a description");
            return;
        }
        setIsEstimating(true);
        setShowEstimate(false);
        try {
            const fileToDataURL = (file: File): Promise<string> => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            };
            const fileObj = fileList[0].originFileObj;
            const dataURL = await fileToDataURL(fileObj);
            const priceResult = await getLLMPrice([dataURL], description, username, model);

            const llmPrice = priceResult.listing.llmPrice;
            setEstimatedAmount(llmPrice);
            setPriceExplanation(priceResult.listing.priceExplanation);
            setCategoryId(priceResult.listing.categoryId);
            setSize(priceResult.listing.size);
            setResponseTime(priceResult.responseTime);
            setSuccessAnim(true);
            setTimeout(() => setSuccessAnim(false), 1400);
            setShowEstimate(true);
        } catch (e) {
            console.error("Estimation error:", e);
        } finally {
            setIsEstimating(false);
        }
    };

    return (
        <Row style={{ width: "100vw", height: window.innerWidth > 768 ? "100vh" : "auto"  }}>
            <Col
                xs={24}
                md={11}
                style={{
                    width: '100%',
                    height: '100vh',
                    background: '#f7f9fd',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0
                }}
            >
                <div style={{
                    width: '100%',
                    maxWidth: 450,
                    minWidth: 300,
                    padding: '42px 30px 32px 30px',
                    margin: '0 auto'
                }}>
                    <Title level={1} style={{ textAlign: 'center', marginBottom: 15 }}>
                        Estimate Listing Price
                    </Title>
                    <Form form={form} layout="vertical" onFinish={fetchEstimate}>
                        <Form.Item label="Upload Item Image" required style={{ marginBottom: 18 }}>
                            {!imagePreview ? (
                                <Upload.Dragger
                                    beforeUpload={() => false}
                                    maxCount={1}
                                    accept="image/*"
                                    fileList={fileList}
                                    onChange={onImageChange}
                                    onRemove={removeImage}
                                    listType="picture"
                                    style={{
                                        borderRadius: 12,
                                        background: '#fafcff',
                                        border: '2px dashed #dde2ee',
                                        minHeight: 95
                                    }}
                                    // onPreview={file => {
                                    //     window.open(file.url || file.thumbUrl, '_blank');
                                    // }}
                                >
                                    <div style={{ textAlign: 'center' }}>
                                        <InboxOutlined
                                            style={{
                                                fontSize: 38,
                                                color: "#4a90e3",
                                                transition: "transform 0.4s, opacity 0.4s",
                                                transform: dragIconAnim ? "rotate(-15deg) scale(1.5)" : "none",
                                                opacity: dragIconAnim ? 0.5 : 1
                                            }}
                                        />
                                    </div>
                                    <p style={{ fontWeight: 500, marginBottom: 4 }}>
                                        Click or drag image to upload
                                    </p>
                                    <p style={{ fontSize: 12, color: "#888" }}>
                                        Only one image needed for estimate
                                    </p>
                                </Upload.Dragger>

                            ) : (
                                <div style={{textAlign: 'center'}}>
                                    <img src={imagePreview} alt={"Preview"} style={{ width: 350,borderRadius: 12, marginBottom: 8, cursor: "pointer" }}
                                        onClick={()=>setShowModal(true)}
                                    />
                                    <Modal open={showModal} footer={null} onCancel={() => setShowModal(false)} centered width={1400}>
                                        <img src={imagePreview} alt="Full Preview" style={{ width: '100%', height: 'auto', maxHeight: '75vh', objectFit: 'contain' }} />
                                    </Modal>

                                    <Button icon={<DeleteOutlined />} onClick={removeImage} danger size={"small"} style={{ marginTop: 0}}>
                                        Remove
                                    </Button>
                                </div>
                            )}

                        </Form.Item>
                        <Form.Item label="Description" required>
                            <Input.TextArea
                                rows={3}
                                placeholder="Describe your item, condition, brand, price, etc."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                style={{ borderRadius: 8 }}
                            />
                        </Form.Item>
                        <div style={{ textAlign: 'center', marginTop: 12 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isEstimating}
                                style={{
                                    width: 160,
                                    height: 52,
                                    fontSize: 18,
                                    borderRadius: 15,
                                    fontWeight: 600
                                }}
                            >
                                Estimate Price
                            </Button>
                        </div>
                    </Form>
                    {isEstimating && (
                        <div style={{ textAlign: 'center', marginTop: 18, marginBottom: 8 }}>
                            <Spin size="large" spinning tip="" />
                        </div>
                    )}
                </div>
            </Col>
                <Divider type="vertical" style={{ height: '100%', minHeight: 280, borderWidth: 2, background: "#e2eafd", borderRadius: 6, margin: 0, display: window.innerWidth < 768? "none" : "block" }} />
            {/*</Col>*/}
            {/* Right side: Output */}
            <Col xs={24} md={11} style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
                <div style={{
                    width: '100%',
                    minWidth: 300,
                    maxWidth: 410,
                    margin: '0 auto'
                }}>
                    {showEstimate && (
                        <div style={{ textAlign: 'left', marginBottom: 15 }}>
                            <Card>
                                <Title level={4} style={{margin: 0, fontWeight: "bold"}}>
                                    Estimated Price: <span style={{ color: "#2086ff" }}>${estimatedAmount ?? "N/A"}</span>
                                </Title>
                            </Card>
                            <Card>
                                <Paragraph><b>Explanation:</b> {priceExplanation ?? "N/A"}</Paragraph>
                            </Card>
                            <Card>
                                <Paragraph><b>Category:</b> {label ?? categoryId ?? "N/A"}</Paragraph>
                            </Card>
                            <Card>
                                <Paragraph><b>Size:</b> {size ?? "N/A"}</Paragraph>
                            </Card>
                            <Card>
                                <Paragraph><b>Response Time:</b> {responseTime} ms</Paragraph>
                            </Card>
                        </div>
                    )}
                </div>
            </Col>
        </Row>
    )
}

export default EstimateListingPage;
