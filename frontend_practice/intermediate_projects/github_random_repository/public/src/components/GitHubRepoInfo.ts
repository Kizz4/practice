import './GitHubRepoInfo.css';
import { createHTMLElement } from 'sharable';
import languageIconUrl from 'src/img/language_icon.png';
import starIconUrl from 'src/img/star_icon.png';
import forkIconUrl from 'src/img/fork_icon.png';
import issueIconUrl from 'src/img/issue_icon.png';




export class GitHubRepoInfo extends EventTarget{
    private _component: HTMLElement;

    constructor(){
        super();
        this._component = createHTMLElement("section", { id: "section-info" });
    }

    public get component(): HTMLElement {return this._component;}
    
    public from(repo?: any) {
        this._component.innerHTML = '';
        const language = repo.language;
        const name = repo.name;
        const description = repo.description;
        const starsCount = repo.stargazers_count;
        const forkCount = repo.forks_count;
        const openIssuesCount = repo.open_issues_count;

        const repoNameTitle = createHTMLElement('p', { id: "repo-name" }, name);
        const repoDescription = createHTMLElement('p', { id: "repo-description" }, description);

        const repoStatsWrapper = createHTMLElement('div', { id: "repo-stats-wrapper" });

        const repoLanguage = GitHubRepoInfo.createStatComponent({ id: "repo-language" }, language,
            { id: "language-icon", src: languageIconUrl, alt: "icon to represent language programming" });

        const repoStarsCount = GitHubRepoInfo.createStatComponent({ id: "repo-stars-count" }, starsCount, 
            { id: "stars-icon", src: starIconUrl, alt: "star icon" });

        const repoForkCount = GitHubRepoInfo.createStatComponent({ id: "repo-fork-count" }, forkCount, 
            { id: "fork-icon", src: forkIconUrl, alt: "fork icon" });

        const repoOpenIssuesCount = GitHubRepoInfo.createStatComponent({ id: "repo-open-issues-count" }, openIssuesCount, 
            { id: "issues-icon", src: issueIconUrl, alt: "issues icon" });

        repoStatsWrapper.append(repoLanguage, repoStarsCount, repoForkCount, repoOpenIssuesCount);

        const repoInfoWrapper = createHTMLElement("div", { id: "repo-info-wrapper" });
        repoInfoWrapper.append(repoNameTitle, repoDescription, repoStatsWrapper);

        const refreshButton = createHTMLElement('button', { id: "refresh-button" }, "Refresh");
        refreshButton.addEventListener("click", () => this.emitRefresh(language));
        this._component.append(repoInfoWrapper, refreshButton);
    }


    private emitRefresh(value: string):void {
        this.dispatchEvent(new CustomEvent("repo:refresh", { detail: { value }, bubbles:true}));
    }

    private static createStatComponent(pAttributes: Record<string, string>, pContent: string, imgAttributes: Record<string, string>,): HTMLParagraphElement {
        const p = createHTMLElement('p', pAttributes, pContent);
        const img = createHTMLElement('img', imgAttributes);
        p.prepend(img);
        return p;
    }

}







