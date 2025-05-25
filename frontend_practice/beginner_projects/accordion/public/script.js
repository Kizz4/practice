"use strict";
const _FAQ_Buttons = document.querySelectorAll("#faq-buttons-container button");
const containersButtonContent = document.querySelectorAll(".button-content");
const currentContentDisplaying = [_FAQ_Buttons[0], containersButtonContent[0]]; // [button, p]

function displayButtonContent(event, index) {
  let btn = event.target;
  let containerButtonContent = containersButtonContent[index];
  let isSameButtonAlreadyActive = btn === currentContentDisplaying[0] && btn.classList.contains("active-button");

  currentContentDisplaying[0].classList.remove("active-button");
  currentContentDisplaying[1].classList.remove("active-content");

  if (!isSameButtonAlreadyActive) {
    btn.classList.add("active-button");
    containerButtonContent.classList.add("active-content");
    containerButtonContent.setAttribute("aria-expanded", "true");
    currentContentDisplaying[0] = btn;
    currentContentDisplaying[1] = containerButtonContent;
  }
}


_FAQ_Buttons.forEach((btn, index) => {
  btn.addEventListener("click", (event) => displayButtonContent(event, index));
});




