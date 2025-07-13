import { createHTMLElement } from "sharable";
import "./HomePage.scss"

export function getHomePage(): HTMLDivElement {
    const homePage = createHTMLElement("div", {id:"home-page"});
    const popUpButton = createHTMLElement("button",
        { id: "pop-up-button" }, "+");

    const form = createHTMLElement("form", 
        {id:"subreddit-name-form", class:"hidden"});

    const label = createHTMLElement("label", { for: "subreddit-name" }, "Enter the name of subreddit");
    const textInput = createHTMLElement("input",
        {
            id: "subreddit-name",
            name: "subreddit-name",
            type: "text"
        });

    const submitInput = createHTMLElement("input",
        {
            id: "subreddit-submit",
            name: "subreddit-submit",
            type: "submit"
        });

    form.append(label, textInput, submitInput);

    homePage.append(popUpButton, form);

    popUpButton.addEventListener("click", () => showPopUp(form));

    return homePage;
}

function showPopUp(form:HTMLFormElement) {
    form.classList.remove("hidden");
}