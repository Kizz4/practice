import { parse } from 'yaml';

export function getRandomRepositoryByLanguage(language: string) {
  fetch(`https://api.github.com/search/repositories?q=language:${language}`)
    .then(res => res.json())
    .then(data => {
      const repos = data.items;
      const randomIndex = Math.floor(Math.random() * repos.length);
      const randomRepo = repos[randomIndex];
      console.log(randomRepo)
      fillInfoContentFromRepo(randomRepo);
    });
}


function fillInfoContentFromRepo(repo:any){
  const language = repo.language;
  const name = repo.name;
  const description = repo.description;
  const starsCount = repo.stargazers_count;
  const forkCount = repo.forks_count;
  const openIssuesCount= repo.open_issues_count;
}


export async function getLanguageNames(): Promise<string[]> {
  const response = await fetch(
    'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml'
  );

  const yamlText = await response.text();
  const languages = parse(yamlText) as Record<string, any>;

  return Object.keys(languages);
}


