import React, {useEffect, useState} from 'react';
import { Row, Col, Card, Typography, Progress, Tag } from 'antd';
import {useNavigate} from "react-router";
import {collection, doc, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import {CampaignType} from "../../types";

const { Title, Text } = Typography;

async function getCampaigns() {
    const campaignCol = collection(db, "FurnishCampaign");
    const campaignSnapshot = await getDocs(campaignCol);
    const campaignList: CampaignType[] = campaignSnapshot.docs.map(doc => ({
        id: doc.id,
        media: doc.data().media || '/fallback.jpg',
        title: doc.data().title || 'No Title',
        organizer: doc.data().organizer || '',
        organizerLocation: doc.data().organizerLocation || '',
        category: doc.data().category || '',
        raised: doc.data().raised || 0,
        goal: doc.data().goal || 100,
        story: doc.data().story || '',
        organizerAvatar: doc.data().organizerAvatar || '',
        userId: doc.data().userId,
    }));
    return campaignList;
}
export default function CampaignCards() {
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState<CampaignType[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getCampaigns();
            setCampaigns(data);
        }
        fetchData();
    }, [])

    return (
        <div style={{ maxWidth: 1200, margin: '2rem auto', padding: '1rem' }}>
            <Title level={4} style={{ marginBottom: 24, fontWeight: 'bold' }}>
                Browse fundraisers
            </Title>
            <Row gutter={[24, 24]}>
                {campaigns.map((c) => (
                    <Col
                        key={c.id}
                        xs={24}
                        sm={12}
                        md={8}
                    >
                        <Card
                            hoverable
                            cover={
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src={c.media}
                                        alt={c.title}
                                        style={{
                                            width: '100%',
                                            height: 180,
                                            objectFit: 'cover',
                                            borderTopLeftRadius: 8,
                                            borderTopRightRadius: 8,
                                        }}
                                    />
                                    <Tag
                                        color="geekblue"
                                        style={{
                                            position: 'absolute',
                                            bottom: 12,
                                            left: 12,
                                            fontWeight: 600,
                                            fontSize: 14,
                                            background: 'rgba(24, 144, 255, 0.8)'
                                        }}
                                    >
                                        {/*{c.location}*/}
                                    </Tag>
                                </div>
                            }
                            style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                            onClick={() => {
                                navigate(`/campaign-page-details/${c.id}`)
                            }}
                        >
                            <Text strong style={{
                                display: 'block',
                                marginBottom: 8,
                                fontSize: 16,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {c.title}
                            </Text>
                            <Progress
                                percent={Math.min(100, (c.raised / c.goal) * 100)}
                                showInfo={false}
                                strokeColor="#52c41a"
                                style={{ marginBottom: 8, height: 10 }}
                            />
                            <Text type="secondary" strong>
                                ${c.raised.toLocaleString()} raised
                            </Text>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
