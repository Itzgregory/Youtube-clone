import { User } from "../user/user"

export interface video {
    _id: string;
    videoPath: string;
    extension: string;
    videoId: string;
    comments: Array<comment>;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    description: string;
    title: string;
    previewPath: string;
    thumbnailPath: string; 
    videoLength: string;
    user: User;
    views: number;
    subscribers: Array<string>;
    datePublished: string;
    likeId: Array<string>;
    thumbnail?: string; 
}

interface comment {
    user: User;
    commentUser: string;
    numberComment: number;
}

