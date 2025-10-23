import React, { useState } from 'react';
import { 
  Layout, 
  Typography, 
  Input, 
  Button, 
  Card, 
  Space, 
  Avatar, 
  Row, 
  Col,
  Tag
} from 'antd';
import { 
  SendOutlined, 
  RobotOutlined, 
  UserOutlined,
  SearchOutlined,
  MessageOutlined
} from '@ant-design/icons';
import './ChatbotPage.css';

interface Listing {
  id: string;
  title: string;
  price?: number;
  imageUrl?: string;
}

interface SearchResponse {
  success: boolean;
  data: {
    listings: Listing[];
  };
  error?: string;
}

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;
const { Search } = Input;

const ChatbotPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Array<{id: number, text: string, isUser: boolean, data?: any}>>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ q: query, limit: "5" });
      const response = await fetch(
        `https://us-central1-gutter-bc42f.cloudfunctions.net/apiSearchByTitle?${params}`
      );
      const data: SearchResponse = await response.json();
      
      // Add user message
      const userMessage = {
        id: Date.now(),
        text: query,
        isUser: true
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Add bot response with search results
      const botResponse = {
        id: Date.now() + 1,
        text: data.success 
          ? `Found ${data.data.listings.length} results for "${query}"`
          : `Search failed: ${data.error || 'Unknown error'}`,
        isUser: false,
        data: data
      };
      setMessages(prev => [...prev, botResponse]);
      
      return data;
    } catch (err: any) {
      console.error('Search error:', err);
      const errorData = { success: false, data: { listings: [] }, error: err.message };
      
      // Add user message
      const userMessage = {
        id: Date.now(),
        text: query,
        isUser: true
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Add error response
      const botResponse = {
        id: Date.now() + 1,
        text: `Search failed: ${err.message}`,
        isUser: false,
        data: errorData
      };
      setMessages(prev => [...prev, botResponse]);
      
      return errorData;
    } finally {
      setLoading(false);
    }
  };

  // handleSubmit removed - using onSearch handler instead

  const MessageBubble: React.FC<{ message: any }> = ({ message }) => (
    <div style={{ 
      display: 'flex', 
      justifyContent: message.isUser ? 'flex-end' : 'flex-start',
      marginBottom: 16,
      alignItems: 'flex-start',
      gap: 12
    }}>
      {!message.isUser && (
        <Avatar 
          size={40} 
          style={{ 
            background: 'linear-gradient(135deg, #ff6f73 0%, #ff4757 100%)',
            flexShrink: 0
          }}
          icon={<RobotOutlined />}
        />
      )}
      <div style={{ maxWidth: '70%' }}>
        <Card
          size="small"
          style={{
            background: message.isUser 
              ? 'linear-gradient(135deg, #ff6f73 0%, #ff4757 100%)'
              : '#fff',
            border: message.isUser ? 'none' : '1px solid #f0f0f0',
            borderRadius: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
          bodyStyle={{ 
            padding: '12px 16px',
            color: message.isUser ? '#fff' : '#000'
          }}
        >
          <Text style={{ color: message.isUser ? '#fff' : '#000' }}>
            {message.text}
          </Text>
        </Card>
        {message.data && (
          <div style={{ marginTop: 12 }}>
            <Card
              size="small"
              title={
                <Space>
                  <SearchOutlined style={{ color: '#ff6f73' }} />
                  <Text strong>Search Results</Text>
                </Space>
              }
              style={{ marginBottom: 12 }}
            >
              <Row gutter={[12, 12]}>
                {message.data.data?.listings?.map((item: Listing) => (
                  <Col xs={24} sm={12} md={8} key={item.id}>
                    <Card
                      size="small"
                      hoverable
                      cover={item.imageUrl ? (
                        <img
                          alt={item.title}
                          src={item.imageUrl}
                          style={{ height: 120, objectFit: 'cover' }}
                        />
                      ) : null}
                    >
                      <Card.Meta
                        title={
                          <Text ellipsis={{ tooltip: item.title }}>
                            {item.title}
                          </Text>
                        }
                        description={
                          item.price ? (
                            <Text strong style={{ color: '#ff6f73' }}>
                              ${item.price}
                            </Text>
                          ) : null
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
            <Card
              size="small"
              title={
                <Space>
                  <MessageOutlined style={{ color: '#ff6f73' }} />
                  <Text strong>API Response</Text>
                </Space>
              }
            >
              <pre style={{
                background: '#f5f5f5',
                padding: 12,
                borderRadius: 6,
                fontSize: 12,
                maxHeight: 200,
                overflow: 'auto',
                margin: 0
              }}>
                {JSON.stringify(message.data, null, 2)}
              </pre>
            </Card>
          </div>
        )}
      </div>
      {message.isUser && (
        <Avatar 
          size={40} 
          style={{ 
            background: 'linear-gradient(135deg, #ff6f73 0%, #ff4757 100%)',
            flexShrink: 0
          }}
          icon={<UserOutlined />}
        />
      )}
    </div>
  );

  return (
    <Layout style={{ background: '#fff', minHeight: '100vh' }}>
      <Content style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Avatar 
                  size={80} 
                  style={{ 
                    background: 'linear-gradient(135deg, #ff6f73 0%, #ff4757 100%)',
                    marginBottom: 16
                  }}
                  icon={<RobotOutlined />}
                />
                <Title level={2} style={{ marginBottom: 8, color: '#ff6f73' }}>
                  Throwly AI - Your AI Shopping Assistant
                </Title>
                <Paragraph type="secondary" style={{ fontSize: 16, marginBottom: 0 }}>
                  Search for furniture, electronics, and more. Get instant results and detailed information.
                </Paragraph>
              </div>
              <div style={{ 
                background: 'linear-gradient(135deg, #ff6f73 0%, #ff4757 100%)',
                padding: '20px',
                borderRadius: 16,
                color: '#fff',
                maxWidth: 600,
                margin: '0 auto'
              }}>
                <Space direction="vertical" size="small">
                  <Text strong style={{ color: '#fff', fontSize: 16 }}>
                    Try searching for:
                  </Text>
                  <Space wrap>
                    <Tag color="default" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                      furniture
                    </Tag>
                    <Tag color="default" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                      electronics
                    </Tag>
                    <Tag color="default" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                      free items
                    </Tag>
                    <Tag color="default" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                      home goods
                    </Tag>
                  </Space>
                </Space>
              </div>
            </Space>
          </div>
        ) : (
          <Card
            style={{ 
              marginBottom: 24,
              borderRadius: 16,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            bodyStyle={{ 
              padding: '20px',
              maxHeight: '60vh',
              overflowY: 'auto'
            }}
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </Card>
        )}

        <Card
          style={{ 
            borderRadius: 16,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <Search
            placeholder="Search for furniture, electronics, free items..."
            enterButton={
              <Button
                type="primary"
                icon={<SendOutlined />}
                loading={loading}
                style={{
                  background: 'linear-gradient(135deg, #ff6f73 0%, #ff4757 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  height: '40px',
                  fontWeight: '600'
                }}
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            }
            size="large"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSearch={(value) => {
              if (value.trim()) {
                setInputValue('');
                handleSearch(value);
              }
            }}
            style={{ borderRadius: 12 }}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default ChatbotPage;
