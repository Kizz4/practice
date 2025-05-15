import './style.css';
import { DateTime } from 'luxon';
import flatpickrImport from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const flatpickr = flatpickrImport as any;

const form = document.querySelector("form");
const resultContainer = document.getElementById("result");
const input = document.getElementById("birthdate") as HTMLInputElement;

flatpickr('#birthdate', {
  dateFormat: 'Y-m-d',
});

function displayResult(event: Event) {
  event.preventDefault();

  const birthdate = DateTime.fromISO(input.value);
  const now = DateTime.now();
  const age = now.diff(birthdate, ['years', 'months', 'days']).toObject();

  const years = Math.floor(age.years || 0);
  const months = Math.floor(age.months || 0);
  const days = Math.floor(age.days || 0);

  let res = "";

  if(years < 0 || months < 0 || days < 0){
    res = "Use a valid date please !"
    resultContainer!.style.color = "red";

  }else{
    res = `You are <strong>${years} years ${months} months</strong> old`;
    resultContainer!.style.color = "inherit";
  } 

  resultContainer!.innerHTML = res;
}

form?.addEventListener("submit", displayResult);
