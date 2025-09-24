import React from 'react';
import { Typography, Button} from 'antd';

const { Title, Paragraph } = Typography;

type HeroProps = {
    title: string;
    subtitle?: string;
    ctaText?: string;
    onCtaClick?: () => void;
    imageUrl?: string;
};

export default function CampaignHero({ title, subtitle, ctaText, onCtaClick, imageUrl }: HeroProps) {
    return (
        <div style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '48px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 32,
            flexWrap: 'wrap'
        }}>
            <div style={{ flex: 1, minWidth: 280 }}>
                <Title level={1} style={{ margin: 0, marginBottom: 12, fontWeight: 800 }}>
                    {title}
                </Title>
                {subtitle && (
                    <Paragraph style={{ fontSize: '1.125rem', color: '#595959', marginBottom: 24 }}>
                        {subtitle}
                    </Paragraph>
                )}
                {ctaText && (
                    <Button
                        type="primary"
                        size="large"
                        onClick={onCtaClick}
                        style={{ textTransform: 'none' }}
                    >
                        {ctaText}
                    </Button>
                )}
            </div>
            {imageUrl && (
                <div style={{
                    flex: 1,
                    minWidth: 280,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <img
                        src={imageUrl}
                        alt="CampaignHero"
                        style={{
                            width: '100%',
                            maxWidth: 480,
                            height: 'auto',
                            borderRadius: 12,
                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                        }}
                    />
                </div>
            )}
        </div>
    );
}
