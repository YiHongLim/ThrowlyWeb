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
// Admin Panel Types
export type AdminType = {
  id: string;
  userIds: string[];
}

export type FeedbackType = {
  id: string;
  userId: string;
  description: string;
  rating?: number;
  createdAt: any;
  status: 'pending' | 'reviewed' | 'resolved';
}

export type ReportType = {
  id: string;
  createdAt: any;
  itemId: string;
  reason: string;
  sellerId: string;
  status: 'REPORTED' | 'INVESTIGATING' | 'RESOLVED' | 'DISMISSED';
  userId: string;
  adminId?: string;
  timeResolved?: any;
  resolutionDescription?: string;
}

export type MYCollectionItemType = {
  id: string;
  LLMexplanation?: string;
  STATUS?: string;
  buyerId?: string;
  category?: string;
  categoryId?: string;
  condition?: string;
  date?: any;
  description?: string;
  freePrice?: number;
  geohash?: string;
  hideLocation?: boolean;
  images?: any[];
  likes?: number;
  location?: any;
  points?: number;
  price?: number;
  searchKeywords?: string[];
  size?: string;
  soldTime?: any;
  tagname?: string;
  title?: string;
  titleLower?: string;
  userId?: string;
}
