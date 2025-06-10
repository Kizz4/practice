import './style.css'
import 'sharable/dist/sharable.css'; 
import { CustomDropDownMenu, PromiseFeedback, createHTMLElement } from 'sharable';
import { getRandomRepositoryByLanguage, getLanguageNames } from './github_api_functions.ts'
import { GitHubRepoInfo } from './components/GitHubRepoInfo.ts'
import gitHubIconUrl from './img/GitHub_icon.png';


let GitHubRepoInfoComponent:GitHubRepoInfo = new GitHubRepoInfo();

const app = document.querySelector<HTMLDivElement>('#app')!;
const feedbackComponent = new PromiseFeedback<any>("Please select a language");
const customDropDownMenu = new CustomDropDownMenu([], "Select a Language", 5, true, "Write the desired language here");
getLanguageNames().then(names => { customDropDownMenu.setMenuContents(names) });

const componentTitle = createHTMLElement('h2', {}, "GitHub Repository Finder");
const iconGitHub = createHTMLElement("img", { id: "github-icon", src: gitHubIconUrl, alt: "GitHub icon" })
componentTitle.prepend(iconGitHub);


const promiseResultListener = (repo:any) => {
  GitHubRepoInfoComponent.from(repo);
  feedbackComponent.component.classList.add("hidden");
  GitHubRepoInfoComponent.component.classList.remove("hidden");

}

const fetchHandler = (e: Event) => {
  feedbackComponent.component.classList.remove("hidden");
  GitHubRepoInfoComponent.component.classList.add("hidden");
  const selectedLanguage = (e as CustomEvent).detail.value;
  feedbackComponent.from(() => getRandomRepositoryByLanguage(selectedLanguage), promiseResultListener);
}

customDropDownMenu.addEventListener("menu:selected", fetchHandler);
GitHubRepoInfoComponent.addEventListener("repo:refresh", fetchHandler);


app.append(componentTitle, customDropDownMenu.menu, feedbackComponent.component, GitHubRepoInfoComponent.component)


