import React from 'react';
import {
  Typography,
  Card,
  Row,
  Col,
  Button,
  Space,
  Avatar,
  Grid,
  Layout,
  Collapse,
  Divider,
  Tag,
  theme,
} from 'antd';
import {
  SwapOutlined,
  HeartOutlined,
  TeamOutlined,
  RobotOutlined,
  TruckOutlined,
  HomeOutlined,
  SafetyCertificateOutlined,
  CarryOutOutlined,
  BankOutlined,
  GiftOutlined,
  DollarOutlined,
  ArrowRightOutlined,
  MobileOutlined,
  CheckCircleOutlined,
  UserOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import overviewPicture from '../assets/images/Download_images/Overviewpicture.jpeg';
import appStoreBadge from '../assets/images/Download_images/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.jpg';
import googlePlayBadge from '../assets/images/Download_images/GetItOnGooglePlay_Badge_Web_color_English.png';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;
const { Panel } = Collapse;

type Feature = { icon: React.ReactNode; title: string; description: string };
type UseCase = { icon: React.ReactNode; title: string; blurb: string };
type Testimonial = { name: string; location: string; text: string; avatar: string };

const Section: React.FC<React.PropsWithChildren<{ id?: string; padTop?: boolean; bg?: string }>> = ({
  children,
  id,
  padTop = true,
  bg,
}) => {
  const { token } = theme.useToken();
  return (
    <div
      id={id}
      style={{
        background: bg ?? 'transparent',
        padding: `${padTop ? token.paddingXL : token.paddingLG}px 0`,
      }}
    >
      {children}
    </div>
  );
};

const FeatureCard: React.FC<Feature> = ({ icon, title, description }) => {
  const { token } = theme.useToken();
  return (
    <Card
      bordered={false}
      style={{ height: '100%' }}
      bodyStyle={{ padding: token.paddingLG }}
    >
      <Space size="large" align="start">
        <div style={{ fontSize: 32 }}>{icon}</div>
        <div>
          <Title level={4} style={{ marginBottom: 8 }}>
            {title}
          </Title>
          <Paragraph style={{ margin: 0, color: token.colorTextSecondary }}>
            {description}
          </Paragraph>
        </div>
      </Space>
    </Card>
  );
};

const UseCaseCard: React.FC<UseCase> = ({ icon, title, blurb }) => {
  const { token } = theme.useToken();
  return (
    <Card
      bordered
      style={{ height: '100%' }}
      bodyStyle={{ padding: token.paddingLG }}
    >
      <Space direction="vertical" size="small">
        <div style={{ fontSize: 28 }}>{icon}</div>
        <Title level={4} style={{ marginTop: 8 }}>
          {title}
        </Title>
        <Paragraph style={{ margin: 0, color: token.colorTextSecondary }}>{blurb}</Paragraph>
      </Space>
    </Card>
  );
};

const TestimonialCard: React.FC<Testimonial> = ({ name, location, text, avatar }) => {
  const { token } = theme.useToken();
  return (
    <Card
      bordered
      style={{ height: '100%' }}
      bodyStyle={{ padding: token.paddingLG }}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Avatar 
          size={48} 
          style={{ 
            background: 'linear-gradient(135deg, #ff6f73 0%, #ff4757 100%)', 
            fontWeight: 700 
          }}
        >
          {avatar}
        </Avatar>
        <Paragraph italic style={{ marginBottom: 0 }}>
          "{text}"
        </Paragraph>
        <div>
          <Text strong>{name}</Text>
          <br />
          <Text type="secondary">{location}</Text>
        </div>
      </Space>
    </Card>
  );
};

const Overview: React.FC = () => {
  const { token } = theme.useToken();
  const screens = Grid.useBreakpoint();
  const navigate = useNavigate();

  const testimonials: Testimonial[] = [
    {
      name: 'Sarah',
      location: 'Toronto, Canada',
      text:
        "If you want to trade your stuff with trustworthy and considerate people, use this app. I struggled on other platforms—Throwly was a breeze.",
      avatar: 'S',
    },
    {
      name: 'Mike',
      location: 'Toronto, Canada',
      text: 'Super straightforward to use. Great experience and smooth trades so far!',
      avatar: 'M',
    },
    {
      name: 'Lisa',
      location: 'Toronto, Canada',
      text:
        "Very user-friendly. Admins deal with scammers quickly—it's nice knowing safety is taken seriously.",
      avatar: 'L',
    },
    {
      name: 'David',
      location: 'Toronto, Canada',
      text:
        'Trading my personal items has been simple and easy. I’m learning a lot about sustainable living with Throwly.',
      avatar: 'D',
    },
  ];

   const valueProps: Feature[] = [
     {
       icon: <UserOutlined style={{ color: '#ff6f73' }} />,
       title: 'Real neighbours, real profiles',
       description: 'Verified accounts so you can connect with confidence.',
     },
     {
       icon: <MessageOutlined style={{ color: '#ff6f73' }} />,
       title: 'Connections first, transactions second',
       description: 'Context search, AI chat suggestions, and VoIP for seamless exchanges.',
     },
     {
       icon: <HeartOutlined style={{ color: '#ff6f73' }} />,
       title: 'No fees—just feel-good swaps',
       description: 'Trade with your community. Keep cash for what matters.',
     },
   ];

  const benefits: Feature[] = [
    {
      icon: <RobotOutlined style={{ color: '#ff6f73' }} />,
      title: 'AI pricing',
      description: 'Fair, transparent point values—no awkward haggling.',
    },
    {
      icon: <TruckOutlined style={{ color: '#ff6f73' }} />,
      title: 'No meetups',
      description: 'Uber-style delivery. Skip ghosting and unsafe exchanges.',
    },
    {
      icon: <HomeOutlined style={{ color: '#ff6f73' }} />,
      title: 'Local & circular',
      description: 'Keep items in your community and out of landfills.',
    },
    {
      icon: <SafetyCertificateOutlined style={{ color: '#ff6f73' }} />,
      title: 'Safer by design',
      description: 'Verification, ratings, and reporting built in.',
    },
  ];

  const useCases: UseCase[] = [
    {
      icon: <CarryOutOutlined style={{ color: '#ff6f73' }} />,
      title: 'Moving or graduating',
      blurb: 'Turn old stuff into points now—redeem later when you settle in.',
    },
    {
      icon: <BankOutlined style={{ color: '#ff6f73' }} />,
      title: 'Upgrading furniture',
      blurb: "Trade in what you don't need and get better pieces delivered.",
    },
    {
      icon: <GiftOutlined style={{ color: '#ff6f73' }} />,
      title: 'Declutter fast',
      blurb: 'Free space quickly without feeling wasteful.',
    },
    {
      icon: <DollarOutlined style={{ color: '#ff6f73' }} />,
      title: 'On a budget',
      blurb: 'Get essentials with points. Keep cash for what matters.',
    },
  ];

  const HowItWorks = () => (
    <Row gutter={[16, 16]} align="middle">
      <Col xs={24} md={8}>
        <Card bordered={false}>
          <Space direction="vertical" size="small">
            <Tag color="magenta">Step 1</Tag>
            <Title level={4} style={{ margin: 0 }}>
              List an item
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              Snap a photo, add a short description, and publish. Our AI suggests a fair point value.
            </Paragraph>
          </Space>
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card bordered={false}>
          <Space direction="vertical" size="small">
            <Tag color="magenta">Step 2</Tag>
            <Title level={4} style={{ margin: 0 }}>
              Match & deliver
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              Find a local match instantly. Choose meet-free courier pickup if you prefer.
            </Paragraph>
          </Space>
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card bordered={false}>
          <Space direction="vertical" size="small">
            <Tag color="magenta">Step 3</Tag>
            <Title level={4} style={{ margin: 0 }}>
              Earn & redeem
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              Earn points for what you give. Redeem them later for what you need.
            </Paragraph>
          </Space>
        </Card>
      </Col>
    </Row>
  );

  return (
    <Layout style={{ background: '#fff' }}>
      {/* HERO */}
      <div
        style={{
          position: 'relative',
          minHeight: screens.md ? 520 : 440,
          backgroundImage: `url(${overviewPicture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.45) 100%)',
          }}
        />
        <Content style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              padding: screens.md ? `0 ${token.paddingLG * 2}px` : `0 ${token.paddingLG}px`,
              textAlign: 'center',
              color: '#fff',
            }}
          >
            <Title
              level={1}
              style={{
                color: '#fff',
                marginBottom: 12,
                lineHeight: 1.15,
                fontSize: screens.md ? 56 : 40,
              }}
            >
              Free. Sustainable. Rewarding.
            </Title>
            <Paragraph style={{ fontSize: screens.md ? 18 : 16, opacity: 0.95, marginBottom: 24 }}>
              Trade and donate locally with verified neighbours—no fees, no hassle, no waste.
            </Paragraph>
             <Space wrap>
               <Button
                 type="primary"
                 size="large"
                 icon={<SwapOutlined />}
                 onClick={() => navigate('/listings')}
                 style={{
                   background: 'linear-gradient(135deg, #ff6f73 0%, #ff4757 100%)',
                   border: 'none',
                   borderRadius: '12px',
                   height: '56px',
                   fontSize: '15px',
                   fontWeight: '600',
                   boxShadow: '0 4px 15px rgba(255,111,115,0.4)',
                 }}
               >
                 Start browsing
               </Button>
               <Button
                 size="large"
                 icon={<ArrowRightOutlined />}
                 onClick={() => navigate('/listings')}
                 style={{
                   background: 'white',
                   border: '2px solid #ff6f73',
                   color: '#ff6f73',
                   borderRadius: '12px',
                   height: '56px',
                   fontSize: '15px',
                   fontWeight: '600',
                 }}
               >
                 List an item
               </Button>
             </Space>
            <div style={{ marginTop: 16 }}>
              <Space size="small" wrap>
                <CheckCircleOutlined />
                <Text style={{ color: '#fff' }}>Verified profiles</Text>
                <Divider type="vertical" style={{ borderColor: 'rgba(255,255,255,0.35)' }} />
                <CheckCircleOutlined />
                <Text style={{ color: '#fff' }}>Meet-free delivery</Text>
                <Divider type="vertical" style={{ borderColor: 'rgba(255,255,255,0.35)' }} />
                <CheckCircleOutlined />
                <Text style={{ color: '#fff' }}>No fees</Text>
              </Space>
            </div>
          </div>
        </Content>
      </div>

      <Content style={{ maxWidth: 1200, margin: '0 auto', padding: `0 ${screens.md ? 32 : 20}px` }}>
        {/* What is Throwly */}
        <Section id="about">
          <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto' }}>
            <Title level={2} style={{ marginBottom: 12 }}>
              What is Throwly?
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              A better way to trade and donate—built around community. Discover great items, connect
              with neighbours, and keep goods in circulation.
            </Paragraph>
          </div>

          <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
            {valueProps.map((item, i) => (
              <Col xs={24} md={8} key={i}>
                <FeatureCard {...item} />
              </Col>
            ))}
          </Row>
        </Section>

        {/* How it works */}
        <Section id="how" bg="transparent">
          <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto' }}>
            <Title level={2} style={{ marginBottom: 12 }}>
              How it works
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 24 }}>
              Three simple steps to turn unused items into value for you (and your neighbours).
            </Paragraph>
          </div>
          <HowItWorks />
        </Section>

        {/* Benefits */}
        <Section id="benefits" bg={token.colorFillAlter}>
          <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto' }}>
            <Title level={2} style={{ marginBottom: 12 }}>
              Why people choose Throwly
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              Practical features that remove friction while keeping things safe and fair.
            </Paragraph>
          </div>

          <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
            {benefits.map((b, i) => (
              <Col xs={24} sm={12} md={12} lg={6} key={i}>
                <FeatureCard {...b} />
              </Col>
            ))}
          </Row>
        </Section>

        {/* Use cases */}
        <Section id="fits">
          <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto' }}>
            <Title level={2} style={{ marginBottom: 12 }}>
              Throwly fits your life
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              Popular ways people use Throwly every week.
            </Paragraph>
          </div>

          <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
            {useCases.map((u, i) => (
              <Col xs={24} sm={12} md={12} lg={6} key={i}>
                <UseCaseCard {...u} />
              </Col>
            ))}
          </Row>
        </Section>

        {/* Social proof / Testimonials */}
        <Section id="testimonials" bg={token.colorFillAlter}>
          <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto' }}>
            <Title level={2} style={{ marginBottom: 12 }}>
              Loved by local communities
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              Real stories from people trading and donating with Throwly.
            </Paragraph>
          </div>

          <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
            {testimonials.map((t, i) => (
              <Col xs={24} sm={12} lg={6} key={i}>
                <TestimonialCard {...t} />
              </Col>
            ))}
          </Row>
        </Section>

        {/* FAQ */}
        <Section id="faq">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <Title level={2} style={{ marginBottom: 12 }}>
                Frequently asked
              </Title>
              <Paragraph type="secondary" style={{ marginBottom: 24 }}>
                Quick answers to the most common questions.
              </Paragraph>
              <Collapse bordered={false}>
                <Panel header="How do points work?" key="1">
                  <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                    Items earn points based on condition and category. Use points to redeem other
                    items—no cash needed.
                  </Paragraph>
                </Panel>
                <Panel header="Do I have to meet people in person?" key="2">
                  <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                    Nope. Choose meet-free delivery and a courier will handle the pickup and drop-off.
                  </Paragraph>
                </Panel>
                <Panel header="How does verification keep me safe?" key="3">
                  <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                    Profiles are verified and reputation grows with successful trades. Reports are
                    reviewed promptly.
                  </Paragraph>
                </Panel>
              </Collapse>
            </Col>
            <Col xs={24} md={12}>
              <Card
                bordered
                bodyStyle={{ padding: token.paddingXL }}
                style={{ height: '100%' }}
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <Title level={4} style={{ marginBottom: 0 }}>
                    Ready to try Throwly?
                  </Title>
                  <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                    Browse what’s nearby or list your first item—it takes less than a minute.
                  </Paragraph>
                   <Space wrap>
                     <Button 
                       type="primary" 
                       size="large" 
                       onClick={() => navigate('/listings')}
                       style={{
                         background: 'linear-gradient(135deg, #ff6f73 0%, #ff4757 100%)',
                         border: 'none',
                         borderRadius: '12px',
                         height: '56px',
                         fontSize: '15px',
                         fontWeight: '600',
                         boxShadow: '0 4px 15px rgba(255,111,115,0.4)',
                       }}
                     >
                       Start browsing
                     </Button>
                     <Button 
                       size="large" 
                       onClick={() => navigate('/listings')}
                       style={{
                         background: 'white',
                         border: '2px solid #ff6f73',
                         color: '#ff6f73',
                         borderRadius: '12px',
                         height: '56px',
                         fontSize: '15px',
                         fontWeight: '600',
                       }}
                     >
                       List an item
                     </Button>
                   </Space>
                </Space>
              </Card>
            </Col>
          </Row>
        </Section>

        {/* Download CTA */}
        <Section id="download" bg={token.colorFillAlter}>
          <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto' }}>
            <Title level={3} style={{ marginBottom: 8 }}>
              Get the app
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 24 }}>
              The full Throwly experience on the go.
            </Paragraph>
            <Space size="large" wrap>
              <img 
                src={appStoreBadge} 
                alt="Download on the App Store"
                style={{ 
                  height: '60px', 
                  width: '180px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  objectFit: 'contain'
                }}
                onClick={() => {/* Add App Store link */}}
              />
              <img 
                src={googlePlayBadge} 
                alt="Get it on Google Play"
                style={{ 
                  height: '60px', 
                  width: '180px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  objectFit: 'contain'
                }}
                onClick={() => {/* Add Google Play link */}}
              />
            </Space>
          </div>
        </Section>
      </Content>
    </Layout>
  );
};

export default Overview;
