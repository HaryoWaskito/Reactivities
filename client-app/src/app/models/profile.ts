import { User } from "./user";

export interface IProfile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
    followersCount: number;
    followingCount: number;
    following: boolean;
    photos?: Photo[]
}

export class Profile implements IProfile {
    constructor(user: User) {
        this.username = user.userName;
        this.displayName = user.displayName;
        this.image = user.image;     
        this.followersCount = 0;
        this.followingCount = 0;
        this.following = false;   
    }

    username: string;
    displayName: string;
    image?: string;
    bio?: string;
    followersCount: number;
    followingCount: number;
    following: boolean;
    photos?: Photo[];
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}