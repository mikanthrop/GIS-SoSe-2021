function buildNavbar(): void {
    let user: string = localStorage.getItem("user");
    let navBar: HTMLElement = document.getElementById("navBar");

    let recipesLink: HTMLAnchorElement = document.createElement("a");
    recipesLink.setAttribute("href", "../html/recipes.html");
    navBar.appendChild(recipesLink);
    let recipesHLine: HTMLElement = document.createElement("h1");
    recipesHLine.appendChild(document.createTextNode("Rezeptesammlung"));
    recipesLink.appendChild(recipesHLine);
    
    let loggedInOrNot: HTMLDivElement = document.createElement("div");
    loggedInOrNot.setAttribute("id", "loggedInOrNot");
    navBar.appendChild(loggedInOrNot);
    
    if (user == null) {
        let loginLink: HTMLAnchorElement = document.createElement("a");
        loginLink.setAttribute("href", "../html/login.html");
        loggedInOrNot.appendChild(loginLink);
        let loginHLine: HTMLElement = document.createElement("h2");
        loginHLine.appendChild(document.createTextNode("Login"));
        loginLink.appendChild(loginHLine);
    
    } else {
        let myFavoritesLink: HTMLAnchorElement = document.createElement("a");
        myFavoritesLink.setAttribute("href", "../html/myFavorites.html");
        loggedInOrNot.appendChild(myFavoritesLink);
        let myFavoritesHLine: HTMLElement = document.createElement("h2");
        myFavoritesHLine.appendChild(document.createTextNode("Meine Favoriten"));
        myFavoritesLink.appendChild(myFavoritesHLine);

        let myRecipesLink: HTMLAnchorElement = document.createElement("a");
        myRecipesLink.setAttribute("href", "../html/myRecipes.html");
        loggedInOrNot.appendChild(myRecipesLink);
        let myRecipesHLine: HTMLElement = document.createElement("h2");
        myRecipesHLine.appendChild(document.createTextNode("Meine Rezepte"));
        myRecipesLink.appendChild(myRecipesHLine);

        let loggedIn: HTMLElement = document.createElement("h3");
        loggedIn.innerText = "Eingeloggt als \n" + user;
        loggedInOrNot.appendChild(loggedIn);
    }

}