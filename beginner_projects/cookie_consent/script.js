"use strict";
/*JavaScript from previous project 'Tabs'*/
const buttonsTabs = document.querySelectorAll('#tabs-selector button');
const eventButtonTabs = ['click', 'focus'];
const tabsContent = ['First Tab content is good',
  'Second Tab content is Great',
  'Third Tab content is AWESOME',
  'Fourth Tab content is LEGENDARYYYYY !!!'
];

const contentTab = document.getElementById("content-tab");

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


/*JavaScript for this project*/
const cookieConsent = document.getElementById('cookie-consent');
const resetCookie = document.getElementById('reset-cookie');


if (document.cookie.includes("cookieAccepted=")) {
  cookieConsent.style.display = 'none';
} else {
  const cookieConsentButtons = document.querySelectorAll('#cookie-consent button');
  const main = document.querySelector('main');

  document.body.style.pointerEvents = 'none';
  main.style.opacity = '0.2';

  cookieConsent.style.pointerEvents = 'auto';

  function answerCookieConsent(event) {
    if (event.target.id === 'accept-cookie-consent') {
      document.cookie = "cookieAccepted=true; path=/; max-age=31536000";
    }else document.cookie = "cookieAccepted=false; path=/; max-age=31536000";
    
    cookieConsent.style.display = 'none'
    main.style.opacity = '1';
    document.body.style.pointerEvents = 'auto';
  };

  cookieConsentButtons.forEach((btn) => {
    btn.addEventListener('click', answerCookieConsent);
  });
}

function resetCookieConsent(event) {
  document.cookie = "cookieAccepted=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  location.href = location.href;
};


resetCookie.addEventListener('click', resetCookieConsent);




