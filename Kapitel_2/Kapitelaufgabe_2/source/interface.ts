namespace Kapitelaufgabe2 {

    export interface APart {
        picture: string;
        name: string;
        animal: string;
    }
    export interface AllParts {
        heads: APart[];
        bodies: APart[];
        feet: APart[];
    }
    export interface PickedBodyParts {
        head: APart;
        body: APart;
        feet: APart;
    }

    export interface BrowserCacheData {
        error: string;
        message: string;
    }
}
    