import React from 'react';
import { Layout, Row, Col, Typography, Divider, Space } from 'antd';
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  InstagramOutlined, 
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  HeartOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import gutter from "../assets/images/home_images/gutter.png";

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <AntFooter style={{ 
      background: '#001529', 
      color: 'white',
      padding: '48px 24px 24px',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Row gutter={[32, 32]}>
          {/* Company Info */}
          <Col xs={24} sm={12} md={6}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <img 
                  src={gutter} 
                  alt="Gutter Logo"
                  style={{ 
                    height: '40px', 
                    width: 'auto', 
                    marginRight: '12px',
                    backgroundColor: 'white',
                    padding: '4px',
                    borderRadius: '4px'
                  }} 
                />
                <Title level={4} style={{ color: 'white', margin: 0 }}>
                  Throwly
                </Title>
              </div>
            </div>
            
            {/* Social Media */}
            <Space size="large">
              <Link href="#" style={{ color: '#bfbfbf', fontSize: '20px' }}>
                <FacebookOutlined />
              </Link>
              <Link href="#" style={{ color: '#bfbfbf', fontSize: '20px' }}>
                <TwitterOutlined />
              </Link>
              <Link href="#" style={{ color: '#bfbfbf', fontSize: '20px' }}>
                <InstagramOutlined />
              </Link>
              <Link href="#" style={{ color: '#bfbfbf', fontSize: '20px' }}>
                <LinkedinOutlined />
              </Link>
            </Space>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: 'white', marginBottom: '16px' }}>
              Quick Links
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link 
                onClick={() => handleNavigation('/')} 
                style={{ color: '#bfbfbf', fontSize: '14px' }}
              >
                Home
              </Link>
              <Link 
                onClick={() => handleNavigation('/listings')} 
                style={{ color: '#bfbfbf', fontSize: '14px' }}
              >
                Browse Listings
              </Link>
              <Link 
                onClick={() => handleNavigation('/go-furnish-me')} 
                style={{ color: '#bfbfbf', fontSize: '14px' }}
              >
                Go Furnish Me
              </Link>
              <Link 
                onClick={() => handleNavigation('/about')} 
                style={{ color: '#bfbfbf', fontSize: '14px' }}
              >
                About
              </Link>
            </div>
          </Col>

          {/* Support */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: 'white', marginBottom: '16px' }}>
              Support
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="#" style={{ color: '#bfbfbf', fontSize: '14px' }}>
                Help Center
              </Link>
              <Link href="#" style={{ color: '#bfbfbf', fontSize: '14px' }}>
                Contact Support
              </Link>
              <Link href="#" style={{ color: '#bfbfbf', fontSize: '14px' }}>
                Safety Guidelines
              </Link>
            </div>
          </Col>

          {/* Info */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: 'white', marginBottom: '16px' }}>
              Info
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link 
                onClick={() => handleNavigation('/terms')} 
                style={{ color: '#bfbfbf', fontSize: '14px' }}
              >
                Terms of Service
              </Link>
              <Link 
                onClick={() => handleNavigation('/privacy')} 
                style={{ color: '#bfbfbf', fontSize: '14px' }}
              >
                Privacy Policy
              </Link>
              <Link 
                onClick={() => handleNavigation('/overview')} 
                style={{ color: '#bfbfbf', fontSize: '14px' }}
              >
                Overview
              </Link>
            </div>
          </Col>

          {/* Contact Info */}
          
        </Row>

        <Divider style={{ borderColor: '#434343', margin: '32px 0 24px' }} />

        {/* Bottom Section */}
        <Row justify="space-between" align="middle">
          <Col xs={24} sm={12}>
            <Text style={{ color: '#8c8c8c', fontSize: '14px' }}>
              © 2024 GoFurnishMe. All rights reserved.
            </Text>
          </Col>
          
        </Row>
      </div>
    </AntFooter>
  );
};

export default Footer;
