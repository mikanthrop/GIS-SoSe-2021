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
    ingredients: string[];
    preparation: string;
}
