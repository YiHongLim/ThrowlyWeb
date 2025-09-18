import React from 'react';
import { Row, Col, Card, Typography, Progress, Tag } from 'antd';
import {useNavigate} from "react-router";

const { Title, Text } = Typography;

// Example data
const campaigns = [
    {
        id: 1,
        image: '/img1.jpg',
        location: 'Mooresville, NC',
        title: 'College student just moved in - Chair and Table',
        raised: 234,
        goal: 400
    },
    {
        id: 2,
        image: '/img2.jpg',
        location: 'Dallas, TX',
        title: "Bed needed",
        raised: 155,
        goal: 200
    },
    {
        id: 3,
        image: '/img3.jpg',
        location: 'Ames, IA',
        title: "Laptop stand needed",
        raised: 20,
        goal: 40
    },
    {
        id: 4,
        image: '/img3.jpg',
        location: 'Ames, IA',
        title: "PC needed",
        raised: 200,
        goal: 400
    }
    // Add more as needed...
];

export default function CampaignCardsGrid() {
    const navigate = useNavigate();
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
                                        src={c.image}
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
                                        {c.location}
                                    </Tag>
                                </div>
                            }
                            style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                            onClick={() => {
                                navigate('/campaign-page-details')
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
