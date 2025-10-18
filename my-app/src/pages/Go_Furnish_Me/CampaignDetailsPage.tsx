import React, {useEffect, useState} from 'react';
import { Row, Col, Card, Typography, Button, Progress, Avatar, Divider, Tag } from 'antd';
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {useParams} from "react-router";
import {CampaignType} from "../../utils/types";
import DonateNowButton from "../../components/go_furnish_me/DonateNowButton";
import {withAuthProtection} from "../../components/WithAuthProtection";
import shareCampaignButton from "../../components/go_furnish_me/ShareCampaignButton";
import ShareCampaignButton from "../../components/go_furnish_me/ShareCampaignButton";
import {useAuth} from "../../context/useAuth";

const { Title, Paragraph, Text } = Typography;

export default function CampaignDetailsPage() {
    const { id } = useParams();
    const [campaign, setCampaign] = useState<CampaignType | null>(null);
    const { currentUser } = useAuth();
    const userId = currentUser?.uid;
    const isSelfDonation = userId === campaign?.userId;

    useEffect(() => {
        async function fetchCampaign() {
            if (!id) return;
            const campaignDoc = doc(db, "FurnishCampaign", id);
            const docSnap = await getDoc(campaignDoc);
            if (docSnap.exists()) {
                const docData = docSnap.data();
                setCampaign({
                    category: docData?.category || "",
                    goal: docData?.goal ?? 0,
                    id: docSnap.id,
                    media: docData?.media || "",
                    organizer: docData?.organizer || "",
                    organizerAvatar: docData?.organizerAvatar || "",
                    organizerLocation: docData?.organizerLocation || "",         // Use 0 if undefined
                    raised: docData?.raised ?? 0,             // Use 0 if undefined
                    story: docData?.story || "",
                    title: docData?.title || "",
                    userId: userId || "",
                });
            } else {
                setCampaign(null);
            }
        }
        fetchCampaign();
    }, [id])
    if (!campaign) {
        return <div>Loading...</div>;
    }

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
                            styles={{ body: {padding: 0} }}
                            style={{ border: "none", marginBottom: 16, background: "#fff" }}
                            cover={
                                <img
                                    alt="campaign"
                                    src={campaign.media}
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
                            <ShareCampaignButton campaignId={campaign.id} />
                            <DonateNowButton campaign={campaign} />
                            <Divider />
                            {/* Recent donation examples */}
                            <div>
                                <Text strong>4.1K people just donated</Text>
                                <ul style={{ margin: "10px 0", paddingLeft: 20 }}>
                                    <li><Text strong>Anonymous: </Text> $100 - Recent donation</li>
                                    <li><Text strong>Anonymous: </Text> $5000 - Top donation</li>
                                    <li><Text strong>{campaign.organizer}: </Text> $100 - First donation</li>
                                </ul>
                                <Button type="link" href={`/campaign-donation-list-page/${campaign.id}`} style={{ padding: 0 }}>See all donations</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
