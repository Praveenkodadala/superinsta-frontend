export interface Reaction {
    userId: string;
    type: 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
    createdAt: Date;
  }
  
  export interface Comment {
    id: string;
    userId: string;
    username: string;
    profilePicture: string;
    content: string;
    createdAt: Date;
    likes: number;
    replies: Comment[];
    isEdited: boolean;
  }
  
  export interface Media {
    url: string;
    type: 'image' | 'video' | 'gif' | 'audio';
    thumbnailUrl?: string;  // Thumbnail for videos
    duration?: number;  // Video/audio duration in seconds
    dimensions?: { width: number; height: number };
    filters?: string[];  // Filters applied (Snapchat, Instagram)
    altText?: string; // For accessibility, describes the media for screen readers
    sourceUrl?: string; // Original source if not uploaded directly
  }
  
  export interface Engagement {
    likes: number;
    comments: number;
    shares: number;
    views: number;
    saves: number;
    reposts: number;
    reactions?: Reaction[];
    reactionCount?: { [key in 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry']: number };
  }
  
  export interface Post {
    id: string;
    // user: { avatar: { url: string , }, firstName: string, lastName: string, username: string, };
    // username: string;
    // profilePicture: string;
    content: string;
    media: Media[];
    postType: 'text' | 'image' | 'video' | 'reel' | 'story' | 'poll' | 'event' | 'live';
    visibility: 'public' | 'friends' | 'private' | 'custom';
    location?: string;
    taggedUsers?: string[];
    hashtags?: string[];
    createdAt: Date;
    updatedAt?: Date;
    engagement: Engagement;
    engagementRate?: number; // Engagement rate calculated by system
    comments: Comment[];
    sharedFrom?: string;
    isEdited: boolean;
    expiryTime?: Date;
    isLive?: boolean;
    status: 'active' | 'deleted' | 'archived' | 'reported';
    isPinned?: boolean;
    sensitivity?: 'none' | 'sensitive' | 'adult';
    pollOptions?: { option: string; votes: number }[];
    eventDetails?: {
      startDate: Date;
      endDate: Date;
      location: string;
      attendees: string[]; // List of user IDs
    };
    metadata?: {
      compressionQuality: number;
      aiGenerated?: boolean;
      nsfw?: boolean;
      analytics?: {
        impressions: number;
        clickThroughRate: number;
      };
    };
  }