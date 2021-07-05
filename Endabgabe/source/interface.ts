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
    _id: string;
    title: string;
    author: string;
    ingredients: string|string[];
    preparation: string;
}

export interface MongoRecipe {
    title: string;
    author: string;
    ingredients: string|string[];
    preparation: string;
}
