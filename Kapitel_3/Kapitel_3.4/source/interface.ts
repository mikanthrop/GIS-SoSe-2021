import { ObjectID } from "mongodb";

export interface Rant {
    _id: ObjectID;
    user: string;
    category: string;
    title: string;
    rant: string;
}
