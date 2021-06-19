import { ObjectID } from "mongodb";

export namespace Kapiteldreivier {
    export interface Rant {
        _id: ObjectID;
        user: string;
        category: string;
        title: string;
        rant: string;
    }
}