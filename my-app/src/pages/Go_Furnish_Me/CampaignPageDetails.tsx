import React from 'react';
import { Row, Col, Card, Typography, Button, Progress, Avatar, Divider, Tag } from 'antd';

const { Title, Paragraph, Text } = Typography;

// Example props/data — you’d fetch from API or server in production.
const campaign = {
    title: "Chandra Mouli ‘Bob’ Nagamallaiah – Support for His Family",
    organizer: "Tanmay Patel",
    organizerLocation: "Dallas, TX",
    category: "Funerals & Memorials",
    image: "/img1.jpg",
    raised: 263565,
    goal: 400000,
    story: `
Yesterday, our dear friend Chandra Mouli “Bob” Nagamallaiah tragically lost his life in a horrific act of violence at Downtown Suites in Dallas. Known as Bob to his friends and family, he was a loving husband, devoted father, and kind soul who touched the lives of everyone who knew him.

He leaves behind his wife, Nisha, and his 18-year-old son, Gaurav, who just graduated high school and is preparing to begin college this fall. Gaurav dreams of studying Hospitality Management, inspired by his father’s hard work and generosity.

This unimaginable tragedy was not only sudden but deeply traumatic. Bob’s life was taken in a brutal attack that occurred in front of his wife and son, who bravely tried to protect him. The shocking nature of this event has shaken our community.

We are coming together as friends, family, and community to support Nisha and Gaurav as they navigate this painful chapter.

Your donations will go directly to:
• Covering funeral and memorial expenses
• Helping Nisha and Gaurav with immediate living and household costs
• Supporting Gaurav’s college education and future

No contribution is too small—every donation will ease their burden and show this family that they are not alone. Even if you are unable to give, please consider sharing this campaign with others.

Let’s honor Bob’s memory and bravery by standing beside his family in their greatest time of need.
`,
    organizerAvatar: "/organizer_photo.jpg", // add your image path if available
};

export default function CampaignDetailGoFundMeStyle() {
    return (
        <div style={{
            minHeight: "100vh",
            background: "#fafafa",
            padding: "32px 0"
        }}>
            <div style={{
                maxWidth: 1080,
                margin: "0 auto",
                padding: "0 16px"
            }}>
                <Title level={2} style={{ fontWeight: 800, marginBottom: 24 }}>
                    {campaign.title}
                </Title>
                <Row gutter={[32, 32]} justify="center" align="top">
                    {/* Main Column */}
                    <Col xs={24} md={15}>
                        {/* Campaign Image */}
                        <Card
                            bodyStyle={{ padding: 0, marginBottom: 24 }}
                            style={{ border: "none", marginBottom: 16, background: "#fff" }}
                            cover={
                                <img
                                    alt="campaign"
                                    src={campaign.image}
                                    style={{ width: "100%", maxHeight: 340, objectFit: "cover", borderRadius: 8 }}
                                />
                            }
                        />
                        {/* Organizer/Badge/Meta */}
                        <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
                            <Avatar src={campaign.organizerAvatar} size={50} />
                            <div>
                                <Text strong>{campaign.organizer}</Text>
                                <div>
                                    <Tag color="blue" style={{ marginLeft: 0 }}>{campaign.organizerLocation}</Tag>
                                </div>
                                <Text type="secondary" style={{ fontSize: 12 }}>Organizer</Text>
                            </div>
                        </div>
                        {/* Story */}
                        <Card style={{ border: "none", background: "#fff" }}>
                            <Paragraph style={{ whiteSpace: "pre-line" }}>
                                {campaign.story}
                            </Paragraph>
                            <Divider />
                            <Text type="secondary">
                                <b>Created:</b> September 11th, 2025 &nbsp;|&nbsp; <b>Category:</b> {campaign.category}
                            </Text>
                        </Card>
                    </Col>
                    {/* Sidebar */}
                    <Col xs={24} md={9}>
                        <Card style={{
                            borderRadius: 16,
                            boxShadow: "0 2px 12px rgba(0,0,0,0.09)",
                            background: "#fff",
                            marginBottom: 32
                        }}>
                            <Text style={{ fontWeight: 700, fontSize: 24 }}>{`$${campaign.raised.toLocaleString()}`}</Text>
                            <Text style={{ marginLeft: 8 }} type="secondary">{`raised`}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: 13 }}>{`$${(campaign.goal / 1000).toLocaleString()}k goal`}</Text>
                            <div style={{ margin: '10px 0 22px' }}>
                                <Progress
                                    percent={Math.round((campaign.raised / campaign.goal) * 100)}
                                    showInfo={false}
                                    strokeColor="#60c130"
                                    trailColor="#e1e1e1"
                                    style={{ height: 10 }}
                                />
                            </div>
                            <Button type="primary" block size="large" style={{ marginBottom: 10 }}>
                                Share
                            </Button>
                            <Button block size="large" style={{ background: "#d3fdba", border: "none", color: "#137c23", fontWeight: 700 }}>
                                Donate now
                            </Button>
                            <Divider />
                            {/* Recent donation examples */}
                            <div>
                                <Text strong>4.1K people just donated</Text>
                                <ul style={{ margin: "10px 0", paddingLeft: 20 }}>
                                    <li><Text strong>Anonymous: </Text> $100 - Recent donation</li>
                                    <li><Text strong>Anonymous: </Text> $5000 - Top donation</li>
                                    <li><Text strong>{campaign.organizer}: </Text> $100 - First donation</li>
                                </ul>
                                <Button type="link" style={{ padding: 0 }}>See all</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
