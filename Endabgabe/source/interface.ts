interface LoginMessage {
    message: string;
    error: string;
}

interface User {
    username: string;
    password: string;
    myFavs: Recipe[];
}

interface Recipe {
    title: string;
    author: string;
    ingredients: string[];
    preparation: string;
}
