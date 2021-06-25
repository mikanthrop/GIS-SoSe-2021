namespace Endabgabe {
    document.getElementById("switchToSignup").addEventListener("click", handleClickSwitchToSignup);
    document.getElementById("switchToLogin").addEventListener("click", handleClickSwitchToLogin);
    document.getElementById("buttonLogin").addEventListener("click", handleClickButtonLogin);
    document.getElementById("buttonSignup").addEventListener("click", handleClickButtonSignup);
    let loginForm: HTMLFormElement = <HTMLFormElement>document.getElementById("loginForm");
    let signupForm: HTMLFormElement = <HTMLFormElement>document.getElementById("signupForm");
    let serverResponseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("serverResponse");
    let url: string;
    let query: URLSearchParams;

    //make switching between login and signup form possible
    function handleClickSwitchToLogin(): void {
        console.log("SwitchToLogin wurde gedrückt.");
        
        signupForm.classList.add("ishidden");
        loginForm.classList.remove("ishidden");
    }

    function handleClickSwitchToSignup(): void {
        console.log("SwitchToSignup wurde gedrückt.");
        
        loginForm.classList.add("ishidden");
        signupForm.classList.remove("ishidden");
    }

    function getURL(): void {
        //url = "https://gis-server-git-gud.herokuapp.com";
        url = "http://localhost:8100";
    }

    function setQuery(_formData: FormData): void {
        //tslint:disable-next-line: no-any
        query = new URLSearchParams(<any>_formData);
    }

    function getFormDataLogin(): void {
        let formData: FormData = new FormData(loginForm);
        setQuery(formData);
    }

    function getFormDataSignup(): void {
        let formData: FormData = new FormData(signupForm);
        setQuery(formData);
    }

    async function handleClickButtonLogin(): Promise<void> {
        console.log("ButtonLogin wurde gedrückt. Server sieht nach, ob Eingabedaten mit Datenbank übereinstimmen.");
        
        getURL();
        getFormDataLogin();

        url += "/login?" + query.toString();
        let response: Response = await fetch(url);
        let serverResponse: JSON = await response.json();
        console.log(serverResponse);
        
        /*if (serverResponse != undefined) {
            for (let key in serverResponse) {
                sessionStorage.setItem(key, JSON.stringify(serverResponse[key]));
            }
        }*/
    }

    async function handleClickButtonSignup(): Promise<void> {
        console.log("ButtonSignup wurde gedrückt. Server erstellt ein neues Nutzerprofil.");
        
        getURL();
        getFormDataSignup();

        url += "/signup?" +  query.toString();
        let response: Response = await fetch(url);
        let displayResponse: string = await response.text();
        // string im if statement überprüfen
        window.open("../html/login.html");
        serverResponseDiv.innerHTML = displayResponse;

    }
}