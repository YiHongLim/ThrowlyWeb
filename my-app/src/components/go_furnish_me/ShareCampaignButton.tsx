import { Button, message, Dropdown, Menu } from "antd";
import { ShareAltOutlined, CopyOutlined } from "@ant-design/icons";

type ShareCampaignButtonProps = {
    campaignId: string;
};

const ShareCampaignButton: React.FC<ShareCampaignButtonProps> = ({ campaignId }) => {
    const url = `${window.location.origin}/campaign-page-details/${campaignId}`;

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Check out this campaign!',
                    url,
                });
            } catch (error) {
                message.error('Failed to share campaign link.');
            }
        } else {
            message.info('Native sharing is not supported in this browser.');
        }
    };

    const handleCopyClipboard = () => {
        navigator.clipboard.writeText(url).then(() => {
            message.success('Campaign link copied to clipboard!');
        }, () => {
            message.error('Failed to copy link.');
        });
    };

    const menu = (
        <Menu>
            <Menu.Item
                key="share"
                icon={<ShareAltOutlined />}
                onClick={handleNativeShare}
                disabled={!navigator.share}
            >
                Native Share
            </Menu.Item>
            <Menu.Item key="copy" icon={<CopyOutlined />} onClick={handleCopyClipboard}>
                Copy to Clipboard
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <Button
                icon={<ShareAltOutlined />}
                type="primary"
                block
                size="large"
                style={{ marginBottom: 10 }}
            >
                Share
            </Button>
        </Dropdown>
    );
};

export default ShareCampaignButton;
