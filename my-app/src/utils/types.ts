import {number} from "framer-motion";

export type CampaignType = {
    id: string;
    title: string;
    organizer: string;
    organizerLocation: string;
    category: string;
    media: string;
    raised: number;
    goal: number;
    story: string;
    organizerAvatar?: string;
}

export type DonationItem = {
    id: string;
    userId: string;
    media: string;
    title: string;
    amount: number;
    description: string;
    campaignId: string;
    note: string;
    firstName: string;
    lastName: string;
};