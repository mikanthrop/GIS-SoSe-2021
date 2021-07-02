import { ObjectId } from "mongodb";

export interface LoginMessage {
    message: string;
    error: string;
}

export interface User {
    username: string;
    password: string;
    myFavs: Recipe[];
}

export interface Recipe {
    _id: ObjectId;
    title: string;
    author: string;
    ingredients: string[];
    preparation: string;
}
