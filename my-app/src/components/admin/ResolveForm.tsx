import React, { useCallback } from 'react';
import { Input, Typography } from 'antd';

const { TextArea } = Input;
const { Text } = Typography;

interface ResolveFormProps {
  reportId: string;
  isResolving: boolean;
  onResolve: (reportId: string) => void;
  resolutionDescription: string;
  setResolutionDescription: (value: string) => void;
  getButtonStyles: (loading: boolean) => any;
}

const ResolveFormComponent: React.FC<ResolveFormProps> = ({ 
  reportId, 
  isResolving, 
  onResolve,
  resolutionDescription,
  setResolutionDescription,
  getButtonStyles
}) => {
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResolutionDescription(e.target.value);
  }, [setResolutionDescription]);

  const handleResolve = useCallback(() => {
    onResolve(reportId);
  }, [onResolve, reportId]);

  return (
    <div 
      style={{ 
        padding: '12px', 
        background: 'linear-gradient(135deg, #f6ffed 0%, #f0f9ff 100%)', 
        border: '1px solid #b7eb8f', 
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        position: 'relative',
        overflow: 'hidden',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
        borderRadius: '50%',
        opacity: 0.1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30px',
        left: '-30px',
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
        borderRadius: '50%',
        opacity: 0.1
      }} />
      
      <div style={{ marginBottom: '8px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ fontSize: '14px', marginRight: '4px' }}>✍️</span>
          <Text strong style={{ color: '#52c41a', fontSize: '14px' }}>Resolution</Text>
        </div>
        <Text type="secondary" style={{ fontSize: '10px', marginLeft: '18px' }}>
          Describe how this was resolved
        </Text>
      </div>
       
      <div style={{ marginBottom: '12px', position: 'relative', zIndex: 1, flex: 1 }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '6px', 
          fontSize: '12px', 
          fontWeight: 'bold',
          color: '#1890ff'
        }}>
          Description:
        </label>
        <TextArea
          rows={4}
          placeholder="Describe how this was resolved..."
          value={resolutionDescription}
          onChange={handleTextChange}
          style={{ 
            width: '100%',
            fontSize: '12px',
            lineHeight: '1.4',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            padding: '8px',
            transition: 'all 0.3s ease',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
            resize: 'vertical'
          }}
          disabled={isResolving}
          onFocus={(e) => {
            e.target.style.borderColor = '#1890ff';
            e.target.style.boxShadow = '0 0 0 2px rgba(24, 144, 255, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d9d9d9';
            e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.04)';
          }}
        />
        <div style={{ 
          marginTop: '4px', 
          fontSize: '10px', 
          color: resolutionDescription.length > 500 ? '#ff4d4f' : '#666',
          textAlign: 'right'
        }}>
          {resolutionDescription.length}/500
        </div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        marginTop: 'auto'
      }}>
        <button
          onClick={handleResolve}
          disabled={isResolving || !resolutionDescription.trim()}
          style={{
            ...getButtonStyles(isResolving || !resolutionDescription.trim()),
            fontSize: '12px',
            padding: '8px 16px',
            fontWeight: 'bold',
            borderRadius: '6px',
            boxShadow: '0 2px 6px rgba(24, 144, 255, 0.3)',
            transition: 'all 0.3s ease',
            transform: 'translateY(0)',
            border: 'none',
            flex: 1
          }}
          onMouseOver={(e) => {
            if (!isResolving && resolutionDescription.trim()) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(24, 144, 255, 0.4)';
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(24, 144, 255, 0.3)';
          }}
        >
          {isResolving ? '⏳ Resolving...' : '✅ Mark as Resolved'}
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Text type="secondary" style={{ fontSize: '12px', margin: 0 }}>
            {isResolving ? '⏳ Please wait...' : '⚠️ This action cannot be undone'}
          </Text>
          {resolutionDescription.length < 10 && resolutionDescription.length > 0 && (
            <Text style={{ fontSize: '11px', color: '#faad14', margin: 0 }}>
              💡 Consider adding more details
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

// Wrap with React.memo to prevent unnecessary re-renders
export const ResolveForm = React.memo(ResolveFormComponent);
