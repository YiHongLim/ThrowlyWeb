import {Button, Card, Col, Divider, Layout, Row, Typography} from "antd";
import {useEffect, useState} from "react";
import {Text} from "lucide-react";
import {db} from "../../firebase";
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {CampaignType, DonationItem} from "../../utils/types";
import {useParams} from "react-router";
import {fetchDonorNames} from "../../utils/firebaseUtils";


const DonationListPage:React.FC = () => {

    const [items, setItems] = useState<DonationItem[]>([]);
    const { id } = useParams<{ id: string }>();
    
    /** Get ID from CampaignDonations collection and compare; Use it to retrieve info from CampaignDonations **/
    useEffect(() => {
        if (!id) return;

        const fetchDonationItems = async () => {
            const q = query(
                collection(db, "CampaignDonations"),
                where("campaignId", "==", id),
            )
            // const qPublic = query(
            //     collection(db, "CampaignDonations", "isPublic")
            // )
            const snap = await getDocs(q);
            const rows = snap.docs.map(doc => ({
                id: doc.id,
                ...(doc.data() as Omit<DonationItem, "id">)
            }));
            // setItems(rows);
            // rows.forEach(r => console.log("Doc", r.id, r))

            const enrichedRows = await fetchDonorNames(rows);
            setItems(enrichedRows);
        };
        if (id) fetchDonationItems();
    }, [id]);

const onRemove = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
};

const total = items.reduce((s, i) => s + i.amount, 0);

const { Content } = Layout;
const { Title, Text } = Typography;
return (

    <Layout style={{ background: "#F3F4F6", minHeight: "100vh" }}>
        <Content style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 0" }}>
            <Title level={4} style={{ marginBottom: 28, color: "#111827" }}>My Cart</Title>

            {items.length === 0 ? (
                <Card style={{ borderRadius: 12, textAlign: "center" }}>
                    Your cart is empty
                </Card>
            ) : (
                <>
                    <Row gutter={[0, 18]}>
                        {items.map((it) => (
                            <Col span={24} key={it.id}>
                                <Card
                                    style={{
                                        borderRadius: 12,
                                        padding: 0,
                                        boxShadow: "0 1px 6px rgba(16,24,40,0.06)",
                                        border: "1px solid #e6e9ee"
                                    }}
                                    styles = {{
                                        body: {
                                            display: "flex",
                                            gap: 32,
                                            alignItems: "center",
                                            paddingLeft: 0
                                        }
                                    }}
                                >
                                    <div style={{
                                        width: 350, height: 350,
                                        borderRadius: 8, overflow: "hidden",
                                        background: "#f3f4f6", flexShrink: 0, display: "flex",
                                        marginLeft: 0
                                    }}>
                                        <img
                                            src={it.media}
                                            alt={it.description}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </div>

                                    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                                        <Row justify="space-between" align="top">
                                            <Col flex="auto" style={{ minWidth: 0 }}>
                                                <Typography.Title
                                                    level={5}
                                                    style={{
                                                        maxWidth: 350,
                                                    }}
                                                >
                                                    {it.title}
                                                </Typography.Title>
                                                {/*<Text type="secondary" style={{ fontWeight: 500 }}>*/}
                                                    {/*<strong style={{ color: "#111827" }}>{it.condition}</strong>*/}
                                                {/*</Text>*/}
                                            </Col>
                                            <Col style={{ textAlign: "right" }}>
                                                <Text style={{ color: "#0ea5a2", fontWeight: 700, fontSize: 18 }}>
                                                    ${it.amount}
                                                </Text>
                                                <br />
                                                <Text style={{ color: "#9CA3AF", fontSize: 12 }}>Estimated value</Text>
                                            </Col>
                                        </Row>

                                        <Text style={{ color: "#374151", fontStyle: "italic", fontSize: 13 }}>
                                            {it.description}
                                        </Text>

                                        <div style={{ fontSize: 12 }}>
                                            <span style={{ fontWeight: 600, color: "#111827" }}>{it.firstName} {it.lastName}</span>
                                            <span style={{ marginLeft: 8, color: "#6b7280", fontWeight: 400 }}>
                        {/*{it.cartsCount ?? 0} {(it.cartsCount ?? 0) === 1 ? "cart" : "carts"} · {it.viewsCount ?? 0} views · {it.chatsCount ?? 0} chats*/}
                      </span>
                                        </div>
                                    </div>

                                    <div style={{ width: 140, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 7 }}>
                                        <Text style={{ fontSize: 12, color: "#6b7280" }}>Donor</Text>
                                        <Text strong style={{ fontWeight: 700 }}>{it.firstName} {it.lastName}</Text>
                                        <Button type="primary" style={{ width: "100%", borderRadius: 8, fontWeight: 600 }}>
                                            Chat with Donor
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Divider />
                    <Card style={{ borderRadius:12 }}>
                        <Row justify="space-between" align="middle">
                            <Col>
                                <Text style={{ color: "#6b7280" }}>Subtotal ({items.length} items)</Text>
                            </Col>
                            <Col>
                                <Text strong style={{ fontSize: 18, fontWeight: 700 }}>${total}</Text>
                            </Col>
                        </Row>
                    </Card>
                </>
            )}
        </Content>
    </Layout>
    );
};

export default DonationListPage;