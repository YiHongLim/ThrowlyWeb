import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Typography, message, Card, Tag, Empty, Image, Space, Divider } from 'antd';
import { UserOutlined, MessageOutlined, FileTextOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import { useAdmin } from '../components/admin/adminFunctions';
import { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { MYCollectionItemType, FeedbackType, ReportType } from '../types';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

type AdminView = 'feedback' | 'reports' | 'addAdmin';

const AdminPage: React.FC = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [currentView, setCurrentView] = useState<AdminView>('feedback');
  const [newAdminId, setNewAdminId] = useState('');
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<{[key: string]: any}>({});
  const [itemInfo, setItemInfo] = useState<{[key: string]: MYCollectionItemType}>({});
  const [expandedReports, setExpandedReports] = useState<Set<string>>(new Set());
  const [currentAdmins, setCurrentAdmins] = useState<any[]>([]);
  const loadedDataRef = useRef<{userIds: Set<string>, itemIds: Set<string>}>({userIds: new Set(), itemIds: new Set()});
  
  const { isAdmin, loading: adminLoading, feedback, reports, fetchFeedback, fetchReports, addAdmin, fetchUserInfo, fetchItemInfo, fetchCurrentAdmins, getInputStyles, getButtonStyles, adminStyles } = useAdmin(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('AdminPage - Auth state changed:', user?.uid || 'No user');
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchFeedback();
      fetchReports();
      fetchCurrentAdmins().then(setCurrentAdmins);
    }
  }, [isAdmin, fetchFeedback, fetchReports, fetchCurrentAdmins]);

  // Load user and item information when reports and feedback change
  useEffect(() => {
    const loadAdditionalInfo = async () => {
      if (reports.length > 0 || feedback.length > 0) {
        const reportUserIds = reports.map(r => r.userId).concat(reports.map(r => r.sellerId));
        const feedbackUserIds = feedback.map(f => f.userId);
        const userIds = Array.from(new Set([...reportUserIds, ...feedbackUserIds]));
        const itemIds = Array.from(new Set(reports.map(r => r.itemId)));
        
        // Check if we need to load new data
        const newUserIds = userIds.filter(id => id && !loadedDataRef.current.userIds.has(id));
        const newItemIds = itemIds.filter(id => id && !loadedDataRef.current.itemIds.has(id));
        
        if (newUserIds.length === 0 && newItemIds.length === 0) {
          return; // No new data to load
        }
        
        // Fetch user information for new users
        const userPromises = newUserIds.map(async (id) => {
          const info = await fetchUserInfo(id);
          return { id, info };
        });
        
        // Fetch item information for new items
        const itemPromises = newItemIds.map(async (id) => {
          const info = await fetchItemInfo(id);
          return { id, info };
        });
        
        const userResults = await Promise.all(userPromises);
        const itemResults = await Promise.all(itemPromises);
        
        // Update refs to track loaded data
        newUserIds.forEach(id => loadedDataRef.current.userIds.add(id));
        newItemIds.forEach(id => loadedDataRef.current.itemIds.add(id));
        
        // Update state with new data
        setUserInfo(prev => {
          const newUserInfo = { ...prev };
          userResults.forEach(({ id, info }) => {
            if (info) newUserInfo[id] = info;
          });
          return newUserInfo;
        });
        
        setItemInfo(prev => {
          const newItemInfo = { ...prev };
          itemResults.forEach(({ id, info }) => {
            if (info) newItemInfo[id] = info as MYCollectionItemType;
          });
          return newItemInfo;
        });
      }
    };
    
    loadAdditionalInfo();
  }, [reports, feedback, fetchUserInfo, fetchItemInfo]);

  const handleAddAdmin = async () => {
    if (!newAdminId.trim()) {
      message.error('Please enter a valid user ID');
      return;
    }

    setLoading(true);
    try {
      const result = await addAdmin(newAdminId.trim());
      if (result.success) {
        message.success('Admin added successfully');
        setNewAdminId('');
        // Refresh the current admins list
        fetchCurrentAdmins().then(setCurrentAdmins);
      } else {
        message.error('Failed to add admin');
      }
    } catch (error) {
      message.error('Error adding admin');
    } finally {
      setLoading(false);
    }
  };

  const toggleReportExpansion = (reportId: string) => {
    const newExpanded = new Set(expandedReports);
    if (newExpanded.has(reportId)) {
      newExpanded.delete(reportId);
    } else {
      newExpanded.add(reportId);
    }
    setExpandedReports(newExpanded);
  };

  // Reusable UI Components
  const IndexBadge = ({ index, color = '#1890ff' }: { index: number; color?: string }) => (
    <div style={adminStyles.indexBadge(color)}>
      {index}
    </div>
  );

  const StatCard = ({ value, label, color }: { value: number; label: string; color: string }) => (
    <Card size="small" style={adminStyles.statCard}>
      <div style={adminStyles.statNumber(color)}>{value}</div>
      <div style={adminStyles.statLabel}>{label}</div>
    </Card>
  );

  const UserInfo = ({ user, fallback }: { user: any; fallback: string }) => (
    <div>
      <div style={adminStyles.userInfo}>
        {user ? (user.username || user.email || 'Unknown User') : 'Loading...'}
      </div>
      <div style={adminStyles.userEmail}>
        {user ? user.email : fallback}
      </div>
    </div>
  );

  const DateDisplay = ({ date }: { date: any }) => (
    <div style={adminStyles.dateText}>
      {date ? (date.toDate ? date.toDate() : new Date(date)).toLocaleDateString() + ' ' + (date.toDate ? date.toDate() : new Date(date)).toLocaleTimeString() : 'N/A'}
    </div>
  );

  const StatusTag = ({ status }: { status: string }) => (
    <Tag color={status === 'RESOLVED' || status === 'DISMISSED' ? 'green' : 'red'}>
      {status === 'RESOLVED' || status === 'DISMISSED' ? 'Closed' : 'Open'}
    </Tag>
  );

  const ItemImages = ({ images, onClick }: { images: any[] | undefined; onClick?: (e: any) => void }) => {
    if (!images || images.length === 0) return null;
    
    return (
      <div style={{ marginBottom: '8px' }} onClick={onClick}>
        <Text strong>Images:</Text>
        <br />
        <Image.PreviewGroup>
          <Space wrap style={{ marginTop: '4px' }}>
            {images.slice(0, 4).map((img: any, imgIndex: number) => (
              <Image
                key={imgIndex}
                width={60}
                height={60}
                src={img.url || img.thumbnailUrl}
                style={{ borderRadius: '4px', objectFit: 'cover', cursor: 'pointer' }}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
              />
            ))}
            {images.length > 4 && (
              <Text style={{ fontSize: '10px', color: '#666' }}>
                +{images.length - 4} more
              </Text>
            )}
          </Space>
        </Image.PreviewGroup>
      </div>
    );
  };

  // Main content rendering functions
  const renderFeedbackContent = (feedback: FeedbackType[], userInfo: {[key: string]: any}) => {
    const sortedFeedback = [...feedback].sort((a, b) => {
      const dateA = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt).getTime()) : 0;
      const dateB = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt).getTime()) : 0;
      return dateB - dateA;
    });

    if (sortedFeedback.length === 0) {
      return <Empty description="No feedback available" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {sortedFeedback.map((feedbackItem, index) => {
          const user = userInfo[feedbackItem.userId];
          const date = feedbackItem.createdAt ? (feedbackItem.createdAt.toDate ? feedbackItem.createdAt.toDate() : new Date(feedbackItem.createdAt)) : null;
          
          return (
            <Card
              key={feedbackItem.id}
              size="small"
              style={adminStyles.card}
              bodyStyle={{ padding: '16px' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <IndexBadge index={index + 1} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <DateDisplay date={date} />
                      <UserInfo user={user} fallback={feedbackItem.userId} />
                    </div>
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <Text style={adminStyles.descriptionText}>
                      {feedbackItem.description || 'No description provided'}
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderReportsContent = (
    reports: ReportType[], 
    userInfo: {[key: string]: any}, 
    itemInfo: {[key: string]: MYCollectionItemType},
    expandedReports: Set<string>,
    toggleReportExpansion: (id: string) => void
  ) => {
    const stats = {
      total: reports.length,
      closed: reports.filter(r => r.status === 'RESOLVED' || r.status === 'DISMISSED').length,
      open: reports.filter(r => r.status === 'REPORTED' || r.status === 'INVESTIGATING').length
    };

    const sortedReports = [...reports].sort((a, b) => {
      const dateA = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt).getTime()) : 0;
      const dateB = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt).getTime()) : 0;
      return dateB - dateA;
    });

    return (
      <div>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <StatCard value={stats.total} label="Total Reports" color="#1890ff" />
            <StatCard value={stats.open} label="Open" color="#cf1322" />
            <StatCard value={stats.closed} label="Closed" color="#52c41a" />
          </div>
        </div>
        
        {sortedReports.length > 0 ? (
          <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            {sortedReports.map((report, index) => {
              const isExpanded = expandedReports.has(report.id);
              const seller = userInfo[report.sellerId];
              const reporter = userInfo[report.userId];
              const item = itemInfo[report.itemId];
              const date = report.createdAt ? (report.createdAt.toDate ? report.createdAt.toDate() : new Date(report.createdAt)) : null;
              
              return (
                <Card 
                  key={report.id} 
                  size="small" 
                  style={{ 
                    marginBottom: '8px', 
                    cursor: 'pointer',
                    border: isExpanded ? '2px solid #1890ff' : '1px solid #d9d9d9',
                    backgroundColor: isExpanded ? '#f6ffed' : '#fff'
                  }}
                  onClick={() => toggleReportExpansion(report.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <IndexBadge index={index + 1} />
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                          Report #{report.id}
                        </div>
                        <DateDisplay date={date} />
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                          Seller: {seller ? (seller.username || seller.email || 'Loading...') : 'Loading...'}
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                          Reporter: {reporter ? (reporter.username || reporter.email || 'Loading...') : 'Loading...'}
                        </div>
                      </div>
                      
                      <StatusTag status={report.status} />
                      
                      <div>
                        {isExpanded ? <UpOutlined /> : <DownOutlined />}
                      </div>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div 
                      style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        {/* Item Information */}
                        <Card size="small" title="Item Information" style={{ margin: 0 }}>
                          {item ? (
                            <div>
                              <div style={{ marginBottom: '8px' }}>
                                <Text strong>Title:</Text> {item.title || 'N/A'}
                              </div>
                              <div style={{ marginBottom: '8px' }}>
                                <Text strong>Price:</Text> ${item.price || 'N/A'}
                              </div>
                              <div style={{ marginBottom: '8px' }}>
                                <Text strong>Category:</Text> {item.category || 'N/A'}
                              </div>
                              <div style={{ marginBottom: '8px' }}>
                                <Text strong>Condition:</Text> {item.condition || 'N/A'}
                              </div>
                              <div style={{ marginBottom: '8px' }}>
                                <Text strong>Status:</Text> {item.STATUS || 'N/A'}
                              </div>
                              <ItemImages images={item.images} onClick={(e) => e.stopPropagation()} />
                              <div>
                                <Text strong>Description:</Text>
                                <br />
                                <Text style={{ fontSize: '12px', display: 'block', marginTop: '4px' }}>
                                  {item.description || 'N/A'}
                                </Text>
                              </div>
                            </div>
                          ) : (
                            <Text>Loading item details...</Text>
                          )}
                        </Card>
                        
                        {/* Report Details */}
                        <Card size="small" title="Report Details" style={{ margin: 0 }}>
                          <div style={{ marginBottom: '8px' }}>
                            <Text strong>Reason:</Text>
                            <br />
                            <Text style={{ fontSize: '12px', display: 'block', marginTop: '4px', whiteSpace: 'pre-wrap' }}>
                              {report.reason || 'No reason provided'}
                            </Text>
                          </div>
                          <Divider style={{ margin: '8px 0' }} />
                          <div style={{ marginBottom: '8px' }}>
                            <Text strong>Seller Details:</Text>
                            <br />
                            <Text style={{ fontSize: '12px', display: 'block', marginTop: '4px' }}>
                              <Text strong>Name:</Text> {seller ? (seller.username || seller.email || 'N/A') : 'Loading...'}
                              <br />
                              <Text strong>Email:</Text> {seller ? seller.email : 'Loading...'}
                            </Text>
                          </div>
                          <Divider style={{ margin: '8px 0' }} />
                          <div>
                            <Text strong>Reporter Details:</Text>
                            <br />
                            <Text style={{ fontSize: '12px', display: 'block', marginTop: '4px' }}>
                              <Text strong>Name:</Text> {reporter ? (reporter.username || reporter.email || 'N/A') : 'Loading...'}
                              <br />
                              <Text strong>Email:</Text> {reporter ? reporter.email : 'Loading...'}
                            </Text>
                          </div>
                        </Card>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        ) : (
          <Empty description="No reports available" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    );
  };

  const renderAddAdminContent = (
    newAdminId: string,
    setNewAdminId: (id: string) => void,
    handleAddAdmin: () => void,
    loading: boolean,
    currentAdmins: any[]
  ) => {
    return (
      <div>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label>User ID</label>
            <input
              type="text"
              placeholder="Enter user ID to make admin"
              value={newAdminId}
              onChange={(e) => setNewAdminId(e.target.value)}
              style={getInputStyles()}
            />
          </div>
          <button
            onClick={handleAddAdmin}
            disabled={loading}
            style={getButtonStyles(loading)}
          >
            {loading ? 'Adding...' : 'Add Admin'}
          </button>
        </div>
        
        <div>
          <div style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Current Admins</div>
          {currentAdmins.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {currentAdmins.map((admin, index) => (
                <Card key={admin.id} size="small" style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <IndexBadge index={index + 1} color="#52c41a" />
                    <div style={{ flex: 1 }}>
                      <div style={adminStyles.userInfo}>
                        {admin.userInfo ? (admin.userInfo.username || admin.userInfo.email || 'Unknown User') : 'Loading...'}
                      </div>
                      <div style={adminStyles.userEmail}>
                        {admin.userInfo ? admin.userInfo.email : admin.userId}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Empty description="No admins found" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      </div>
    );
  };





  const renderContent = () => {
    switch (currentView) {
      case 'feedback':
        return (
          <div>
            <Title level={4}>Feedback Management</Title>
            {renderFeedbackContent(feedback, userInfo)}
          </div>
        );
      
      case 'reports':
        return (
          <div>
            <Title level={4}>Reports Management</Title>
            {renderReportsContent(reports, userInfo, itemInfo, expandedReports, toggleReportExpansion)}
          </div>
        );
      
      case 'addAdmin':
        return renderAddAdminContent(newAdminId, setNewAdminId, handleAddAdmin, loading, currentAdmins);
      
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <Title level={3}>Please Log In</Title>
        <Text>You need to be logged in to access the admin panel.</Text>
        <br />
        <Text type="secondary">User: No user</Text>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <Title level={3}>Loading...</Title>
        <Text>Checking admin status...</Text>
      </div>
    );
  }

  // Show admin interface regardless of admin status, but indicate if not admin
  if (!isAdmin) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={250} style={{ background: '#fff' }}>
          <div style={{ padding: '16px' }}>
            <Title level={3}>Admin Panel</Title>
            <Text type="warning">⚠️ You don't have admin privileges</Text>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[currentView]}
            style={{ border: 'none' }}
            onClick={({ key }) => setCurrentView(key as AdminView)}
          >
            <Menu.Item key="feedback" icon={<MessageOutlined />}>
              Feedback
            </Menu.Item>
            <Menu.Item key="reports" icon={<FileTextOutlined />}>
              Reports
            </Menu.Item>
            <Menu.Item key="addAdmin" icon={<UserOutlined />}>
              Add Admins
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: '24px' }}>
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <Title level={3}>Access Denied</Title>
              <Text>You don't have admin privileges to access this page.</Text>
              <br />
              <Text type="secondary">Admin status: {isAdmin ? 'Yes' : 'No'}</Text>
              <br />
              <Text type="secondary">User ID: {user?.uid || 'No user ID'}</Text>
              <br />
              <Text type="secondary">Loading: {adminLoading ? 'Yes' : 'No'}</Text>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} style={{ background: '#fff' }}>
        <div style={{ padding: '16px' }}>
          <Title level={3}>Admin Panel</Title>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            User: {user.uid}
          </Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[currentView]}
          style={{ border: 'none' }}
          onClick={({ key }) => setCurrentView(key as AdminView)}
        >
          <Menu.Item key="feedback" icon={<MessageOutlined />}>
            Feedback
          </Menu.Item>
          <Menu.Item key="reports" icon={<FileTextOutlined />}>
            Reports
          </Menu.Item>
          <Menu.Item key="addAdmin" icon={<UserOutlined />}>
            Add Admins
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: '24px' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
