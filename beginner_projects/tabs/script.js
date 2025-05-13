"use strict";
let buttonsTabs = document.querySelectorAll('#tabs-selector button');
let eventButtonTabs = ['click', 'focus'];
let tabsContent = ['First Tab content is good',
    'Second Tab content is Great',
    'Third Tab content is AWESOME',
    'Fourth Tab content is LEGENDARYYYYY !!!'
];

let contentTab = document.getElementById("content-tab");

let currentButtonActive = buttonsTabs[0];

function switchTabsContent(event, index) {
    contentTab.textContent = tabsContent[index];
    
    currentButtonActive.classList.remove('active');
    let btn = buttonsTabs[index];
    btn.classList.add('active');
    currentButtonActive = btn;
};


buttonsTabs.forEach((btn, index) => {
  eventButtonTabs.forEach((event) => {
    btn.addEventListener(event, (e) => switchTabsContent(e, index));
  });
});
