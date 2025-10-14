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
    userId: string;
}

export type DonationItem = {
    id: string;
    userId: string;
    media: string;
    title: string;
    amount: number;
    description: string;
    isPublic: boolean;
    campaignId: string;
    firstName: string;
    lastName: string;
};

interface imageProps{
    thumbnailUrl:string;
    url:string;
}

interface locationProps{
    _latitude:number;
    _longitude:number;
}

export type ProductType = {
    id:string;
    status: string;
    buyerId?: string;
    categoryId: string;
    condition: string;
    dateCreated: string;
    description: string;
    geohash: string;
    images:imageProps[];
    likes: number;
    location: locationProps;
    points:number;
    price: number;
    searchKeywords: string[];
    size: string;
    tagname:string;
    title: string;
    userId: string;
}