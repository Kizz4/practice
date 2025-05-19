"use strict";
const maxLength = 250;
const textAreas = document.querySelectorAll(".restricted-textarea");
const countersLength = document.querySelectorAll(".textareas-counter-length")



textAreas.forEach((textArea, index) => {
  textArea.setAttribute('maxlenght', maxLength)
  let length = textArea.value.length;
  countersLength[index].textContent = length + "/" + maxLength;
  
  if(length >= maxLength){
    textArea.classList.add("error-length")
    countersLength[index].classList.add("error-length")
  }
});


function updateCounterLength(event, index) {
  let textArea = event.target;
  let length = textArea.value.length; 

  if(length >= maxLength){
    textArea.classList.add("error-length")
    countersLength[index].classList.add("error-length")
    textArea.value = textArea.value.slice(0, maxLength);
    length = maxLength;

  }else{
    textArea.classList.remove("error-length")
    countersLength[index].classList.remove("error-length")
  }

  countersLength[index].textContent = length + "/" + maxLength;
};


textAreas.forEach((textArea, index) => {
  textArea.addEventListener("input", (event) => updateCounterLength(event, index));
});




