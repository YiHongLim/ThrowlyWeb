import React, { useState } from 'react';
import { Button, Modal, Input, message, Space, Tooltip } from 'antd';
import { ShareAltOutlined, CopyOutlined, WhatsAppOutlined, FacebookOutlined, TwitterOutlined, MailOutlined } from '@ant-design/icons';

type ShareCampaignButtonProps = {
    campaignId: string;
};

const ShareCampaignButtonWithModal: React.FC<ShareCampaignButtonProps> = ({ campaignId }) => {
    const [visible, setVisible] = useState(false);
    const url = `${window.location.origin}/campaign-page-details/${campaignId}`;

    const handleCopyClipboard = () => {
        navigator.clipboard.writeText(url).then(() => {
            message.success('Campaign link copied to clipboard!');

        }, () => {
            message.error('Failed to copy link.');
        });
    };

    const shareLinks = [
        {
            icon: <WhatsAppOutlined style={{ color: '#25D366' }} />,
            label: "WhatsApp",
            url: `https://wa.me/?text=${encodeURIComponent(url)}`,
        },
        {
            icon: <FacebookOutlined style={{ color: '#1877F3' }} />,
            label: "Facebook",
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        },
        {
            icon: <TwitterOutlined style={{ color: '#1DA1F2' }} />,
            label: "X",
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
        },
        {
            icon: <MailOutlined />,
            label: "Email",
            url: `mailto:?subject=Check out this campaign!&body=${encodeURIComponent(url)}`,
        },
    ];

    const handleOpen = () => setVisible(true);
    const handleClose = () => setVisible(false);

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Check out this campaign!",
                    url,
                });
            } catch (e) {
                message.error('Native share cancelled or failed.');
            }
        } else {
            message.info('Native sharing is not supported in this browser.');
        }
    };

    return (
        <>
            <Button
                icon={<ShareAltOutlined />}
                type="primary"
                block
                size="large"
                style={{ marginBottom: 10 }}
                onClick={handleOpen}
            >
                Share
            </Button>
            <Modal
                visible={visible}
                onCancel={handleClose}
                footer={null}
                title="Share this campaign"
                style={{top:400}}
            >
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Space>
                        {shareLinks.map(link => (
                            <Tooltip key={link.label} title={link.label}>
                                <Button
                                    type="default"
                                    shape="circle"
                                    size="large"
                                    icon={link.icon}
                                    style={{ fontSize: 22 }}
                                    onClick={() => window.open(link.url, '_blank')}
                                />
                            </Tooltip>
                        ))}
                        {"share" in navigator &&
                            <Tooltip title="Native Share">
                                <Button
                                    type="default"
                                    shape="circle"
                                    size="large"
                                    icon={<ShareAltOutlined />}
                                    onClick={handleNativeShare}
                                />
                            </Tooltip>
                        }
                    </Space>
                    <div style={{ marginTop: 16 }}>
                        <Input
                            value={url}
                            readOnly
                            addonAfter={
                                <Tooltip title="Copy link">
                                    <Button icon={<CopyOutlined />} onClick={handleCopyClipboard} />
                                </Tooltip>
                            }
                        />
                    </div>
                </Space>
            </Modal>
        </>
    );
};

export default ShareCampaignButtonWithModal;
