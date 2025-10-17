import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Layout, Menu, Typography, message, Card, Tag, Empty, Image, Space, Divider } from 'antd';
import { UserOutlined, MessageOutlined, FileTextOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import { useAdmin } from '../components/admin/adminFunctions';
import { ResolveForm } from '../components/admin/ResolveForm';
import { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { MYCollectionItemType, FeedbackType, ReportType } from '../types';
import { Input } from 'antd';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;


const { TextArea } = Input;

type AdminView = 'feedback' | 'reports' | 'addAdmin';


const AdminPage: React.FC = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [currentView, setCurrentView] = useState<AdminView>('feedback');
  const [newAdminId, setNewAdminId] = useState('');
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<{[key: string]: any}>({});
  const [itemInfo, setItemInfo] = useState<{[key: string]: MYCollectionItemType}>({});
  const [currentAdmins, setCurrentAdmins] = useState<any[]>([]);
  const [resolvingReports, setResolvingReports] = useState<Set<string>>(new Set());
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);
  const [resolutionDescription, setResolutionDescription] = useState('');
  const [showResolutionForm, setShowResolutionForm] = useState(false);
  const loadedDataRef = useRef<{userIds: Set<string>, itemIds: Set<string>}>({userIds: new Set(), itemIds: new Set()});

  const { isAdmin, loading: adminLoading, feedback, reports, fetchFeedback, fetchReports, addAdmin, resolveReport, fetchUserInfo, fetchItemInfo, fetchCurrentAdmins, getInputStyles, getButtonStyles, adminStyles } = useAdmin(user);

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


  const handleResolveReport = useCallback(async (reportId: string) => {
    if (!resolutionDescription.trim()) {
      message.error('Please enter a resolution description');
      return;
    }

    if (!user?.uid) {
      message.error('User not authenticated');
      return;
    }

    setResolvingReports(prev => new Set(prev).add(reportId));
    
    try {
      const result = await resolveReport(reportId, resolutionDescription.trim(), user.uid);
      if (result.success) {
        message.success('Report resolved successfully');
        setResolutionDescription(''); // Clear the form
        closeResolutionForm(); // Close the resolution form
      } else {
        message.error('Failed to resolve report');
      }
    } catch (error) {
      message.error('Error resolving report');
    } finally {
      setResolvingReports(prev => {
        const newSet = new Set(prev);
        newSet.delete(reportId);
        return newSet;
      });
    }
  }, [resolutionDescription, user?.uid, resolveReport]);

  const openResolutionForm = useCallback((report: ReportType) => {
    setSelectedReport(report);
    setShowResolutionForm(true);
    setResolutionDescription(''); // Clear any previous text
  }, []);

  const closeResolutionForm = useCallback(() => {
    setSelectedReport(null);
    setShowResolutionForm(false);
    setResolutionDescription(''); // Clear the form
  }, []);

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
    itemInfo: {[key: string]: MYCollectionItemType}
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
                    border: '1px solid #d9d9d9',
                    backgroundColor: '#fff'
                  }}
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
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                        {(report.status === 'REPORTED' || report.status === 'INVESTIGATING') && (
                          <button
                            onClick={() => openResolutionForm(report)}
                            style={{
                              ...getButtonStyles(false),
                              fontSize: '12px',
                              padding: '6px 12px',
                              borderRadius: '6px'
                            }}
                          >
                            Resolve Report
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
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
            {renderReportsContent(reports, userInfo, itemInfo)}
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
      
      {/* Centered Resolution Modal */}
      {showResolutionForm && selectedReport && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
            backdropFilter: 'blur(4px)'
          }}
          onClick={closeResolutionForm}
        >
          <div 
            style={{
              background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
              borderRadius: '12px',
              width: '500px',
              height: '500px',
              overflowY: 'auto',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.2)',
              border: '2px solid #1890ff',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
              borderRadius: '12px 12px 0 0',
              color: 'white',
              flexShrink: 0
            }}>
              <div>
                <Title level={5} style={{ margin: 0, color: 'white', fontSize: '14px' }}>
                  🔧 Resolve Report #{selectedReport.id}
                </Title>
              </div>
              <button
                onClick={closeResolutionForm}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  fontSize: '16px',
                  cursor: 'pointer',
                  color: 'white',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                ×
              </button>
            </div>
            
            {/* Content */}
            <div style={{ padding: '12px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                {/* Report Details Section */}
                <div style={{ maxHeight: '200px', overflowY: 'auto', flex: 1 }}>
                  <Card 
                    size="small" 
                    title={
                      <span style={{ color: '#1890ff', fontWeight: 'bold', fontSize: '12px' }}>
                        📋 Report
                      </span>
                    } 
                    style={{ 
                      marginBottom: '8px',
                      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
                      border: '1px solid #e8f4fd'
                    }}
                    headStyle={{ backgroundColor: '#f0f9ff', borderBottom: '1px solid #1890ff', padding: '4px 8px' }}
                    bodyStyle={{ padding: '8px' }}
                  >
                    <div style={{ marginBottom: '6px' }}>
                      <Text strong style={{ color: '#1890ff', fontSize: '10px' }}>Reason:</Text>
                      <Text style={{ 
                        fontSize: '9px', 
                        display: 'block', 
                        marginTop: '2px', 
                        whiteSpace: 'pre-wrap',
                        padding: '4px 6px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '3px',
                        border: '1px solid #e9ecef',
                        maxHeight: '40px',
                        overflow: 'hidden'
                      }}>
                        {selectedReport.reason || 'No reason provided'}
                      </Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Text strong style={{ color: '#1890ff', fontSize: '10px' }}>Status:</Text> <StatusTag status={selectedReport.status} />
                      </div>
                      <div>
                        <Text strong style={{ color: '#1890ff', fontSize: '10px' }}>Created:</Text> <DateDisplay date={selectedReport.createdAt} />
                      </div>
                    </div>
                  </Card>

                  {/* Item Information */}
                  <Card 
                    size="small" 
                    title={
                      <span style={{ color: '#52c41a', fontWeight: 'bold', fontSize: '12px' }}>
                        🛍️ Item
                      </span>
                    } 
                    style={{ 
                      marginBottom: '8px',
                      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
                      border: '1px solid #e6f7ff'
                    }}
                    headStyle={{ backgroundColor: '#f6ffed', borderBottom: '1px solid #52c41a', padding: '4px 8px' }}
                    bodyStyle={{ padding: '8px' }}
                  >
                    {itemInfo[selectedReport.itemId] ? (
                      <div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '6px' }}>
                          <div>
                            <Text strong style={{ color: '#52c41a', fontSize: '10px' }}>Title:</Text> 
                            <Text style={{ marginLeft: '2px', fontWeight: '500', fontSize: '9px' }}>
                              {(itemInfo[selectedReport.itemId].title || 'N/A').substring(0, 20)}...
                            </Text>
                          </div>
                          <div>
                            <Text strong style={{ color: '#52c41a', fontSize: '10px' }}>Price:</Text> 
                            <Text style={{ marginLeft: '2px', fontWeight: '500', color: '#1890ff', fontSize: '9px' }}>
                              ${itemInfo[selectedReport.itemId].price || 'N/A'}
                            </Text>
                          </div>
                          <div>
                            <Text strong style={{ color: '#52c41a', fontSize: '10px' }}>Category:</Text> 
                            <Text style={{ marginLeft: '2px', fontWeight: '500', fontSize: '9px' }}>
                              {itemInfo[selectedReport.itemId].category || 'N/A'}
                            </Text>
                          </div>
                          <div>
                            <Text strong style={{ color: '#52c41a', fontSize: '10px' }}>Condition:</Text> 
                            <Text style={{ marginLeft: '2px', fontWeight: '500', fontSize: '9px' }}>
                              {itemInfo[selectedReport.itemId].condition || 'N/A'}
                            </Text>
                          </div>
                        </div>
                        <div style={{ marginBottom: '6px' }}>
                          <Text strong style={{ color: '#52c41a', fontSize: '10px' }}>Status:</Text> 
                          <Text style={{ marginLeft: '2px', fontWeight: '500', color: '#1890ff', fontSize: '9px' }}>
                            {itemInfo[selectedReport.itemId].STATUS || 'N/A'}
                          </Text>
                        </div>
                        <div>
                          <Text strong style={{ color: '#52c41a', fontSize: '10px' }}>Description:</Text>
                          <Text style={{ 
                            fontSize: '8px', 
                            display: 'block', 
                            marginTop: '2px',
                            padding: '3px 4px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '3px',
                            border: '1px solid #e9ecef',
                            maxHeight: '30px',
                            overflow: 'hidden'
                          }}>
                            {(itemInfo[selectedReport.itemId].description || 'N/A').substring(0, 100)}...
                          </Text>
                        </div>
                      </div>
                    ) : (
                      <Text style={{ color: '#666', fontStyle: 'italic', fontSize: '10px' }}>Loading...</Text>
                    )}
                  </Card>

                  {/* User Information */}
                  <Card 
                    size="small" 
                    title={
                      <span style={{ color: '#722ed1', fontWeight: 'bold', fontSize: '12px' }}>
                        👥 Users
                      </span>
                    }
                    style={{ 
                      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
                      border: '1px solid #f0f0ff'
                    }}
                    headStyle={{ backgroundColor: '#f9f0ff', borderBottom: '1px solid #722ed1', padding: '4px 8px' }}
                    bodyStyle={{ padding: '8px' }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      <div>
                        <Text strong style={{ color: '#722ed1', fontSize: '10px' }}>Seller:</Text>
                        <div style={{ 
                          marginTop: '2px', 
                          padding: '3px 4px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '3px',
                          border: '1px solid #e9ecef'
                        }}>
                          <div style={{ marginBottom: '1px' }}>
                            <Text strong style={{ fontSize: '8px' }}>Name:</Text> 
                            <Text style={{ marginLeft: '2px', fontSize: '8px', fontWeight: '500' }}>
                              {userInfo[selectedReport.sellerId] ? (userInfo[selectedReport.sellerId].username || userInfo[selectedReport.sellerId].email || 'N/A').substring(0, 15) : 'Loading...'}
                            </Text>
                          </div>
                          <div>
                            <Text strong style={{ fontSize: '8px' }}>Email:</Text> 
                            <Text style={{ marginLeft: '2px', fontSize: '8px', fontWeight: '500' }}>
                              {userInfo[selectedReport.sellerId] ? userInfo[selectedReport.sellerId].email.substring(0, 20) : 'Loading...'}
                            </Text>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Text strong style={{ color: '#722ed1', fontSize: '10px' }}>Reporter:</Text>
                        <div style={{ 
                          marginTop: '2px', 
                          padding: '3px 4px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '3px',
                          border: '1px solid #e9ecef'
                        }}>
                          <div style={{ marginBottom: '1px' }}>
                            <Text strong style={{ fontSize: '8px' }}>Name:</Text> 
                            <Text style={{ marginLeft: '2px', fontSize: '8px', fontWeight: '500' }}>
                              {userInfo[selectedReport.userId] ? (userInfo[selectedReport.userId].username || userInfo[selectedReport.userId].email || 'N/A').substring(0, 15) : 'Loading...'}
                            </Text>
                          </div>
                          <div>
                            <Text strong style={{ fontSize: '8px' }}>Email:</Text> 
                            <Text style={{ marginLeft: '2px', fontSize: '8px', fontWeight: '500' }}>
                              {userInfo[selectedReport.userId] ? userInfo[selectedReport.userId].email.substring(0, 20) : 'Loading...'}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Resolution Form Section */}
                <div style={{ marginTop: '8px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <ResolveForm
                    reportId={selectedReport.id}
                    isResolving={resolvingReports.has(selectedReport.id)}
                    onResolve={handleResolveReport}
                    resolutionDescription={resolutionDescription}
                    setResolutionDescription={setResolutionDescription}
                    getButtonStyles={getButtonStyles}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminPage;
