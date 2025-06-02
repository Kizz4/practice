import './style.css'
import { CustomDropDownMenu, createHTMLElement } from 'shared_components';
import { getRandomRepositoryByLanguage, getLanguageNames } from './github_api_functions.ts'

getLanguageNames().then(names => {
  console.log(names);
}); 


const listContent = ["First Item", "Second Item", "Third Item", "Fourth Item", "Fifth Item"]
const customDropDownMenu = new CustomDropDownMenu(listContent);

const componentTitle = createHTMLElement('h2', {}, "GitHub Repository Finder");
const iconGitHub = createHTMLElement("img" , {id:"github-icon", src:"src/icon_GitHub.png", alt:"GitHub icon"})
componentTitle.prepend(iconGitHub);

const feedbackWrapper = createHTMLElement("div", {id:"feedback-wrapper"});
const infoDefaultContent = createHTMLElement("p", {id:"feedback-info", class:"error hidden"}, "Please select a language");
const retryButton = createHTMLElement("button", {id:"retry-button", class:"error hidden"}, "Click to retry")
feedbackWrapper.appendChild(infoDefaultContent);
feedbackWrapper.appendChild(retryButton);

const infoSection = createHTMLElement("section", {id:"section-info"});

const repoInfoWrapper = createHTMLElement("div", {id:"repo-info-wrapper"});
const repoNameTitle = createHTMLElement('p', {id:"repo-name"}, "repo name");
const repoDescription = createHTMLElement('p', {id:"repo-description"}, "repo description");

const repoStatsWrapper = createHTMLElement('div', {id:"repo-stats-wrapper"});
const repoLanguage = createHTMLElement('p', {id:"repo-language"}, "language");
const iconLanguage = createHTMLElement('img',  {id:"language-icon", src:"src/icon_language.png", alt:"icon to represent language programming"});
repoLanguage.prepend(iconLanguage);

const repoStarsCount = createHTMLElement('p', {id:"repo-stars-count"}, "xxx");
const iconStarsCount = createHTMLElement('img',  {id:"stars-icon", src:"src/icon_stars.png", alt:"star icon"});
repoStarsCount.prepend(iconStarsCount);

const repoForkCount = createHTMLElement('p', {id:"repo-fork-count"}, "xxx");
const iconForkCount = createHTMLElement('img', {id:"fork-icon", src:"src/icon_fork.png", alt:"fork icon"});
repoForkCount.prepend(iconForkCount);

const repoOpenIssuesCount = createHTMLElement('p', {id:"repo-open-issues-count"}, "xxx");
const iconOpenIssuesCount = createHTMLElement('img',  {id:"issues-icon", src:"src/icon_issues.png", alt:"issues icon"});
repoOpenIssuesCount.prepend(iconOpenIssuesCount);

repoStatsWrapper.appendChild(repoLanguage);
repoStatsWrapper.appendChild(repoStarsCount);
repoStatsWrapper.appendChild(repoForkCount);
repoStatsWrapper.appendChild(repoOpenIssuesCount);


repoInfoWrapper.appendChild(repoNameTitle);
repoInfoWrapper.appendChild(repoDescription);
repoInfoWrapper.appendChild(repoStatsWrapper);

const refreshButton = createHTMLElement('button', {id:"refresh-button"}, "Refresh");
infoSection.appendChild(repoInfoWrapper);
infoSection.appendChild(refreshButton);


document.querySelector<HTMLDivElement>('#app')!.appendChild(componentTitle);
document.querySelector<HTMLDivElement>('#app')!.appendChild(customDropDownMenu.getMenu());
document.querySelector<HTMLDivElement>('#app')!.appendChild(feedbackWrapper);
document.querySelector<HTMLDivElement>('#app')!.appendChild(repoInfoWrapper);


getRandomRepositoryByLanguage("java");
