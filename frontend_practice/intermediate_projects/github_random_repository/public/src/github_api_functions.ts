import { parse } from 'yaml';

export async function getRandomRepositoryByLanguage(language: string) {
  return fetch(`https://api.github.com/search/repositories?q=language:${language}`)
    .then(res => res.json())
    .then(data => {
      const repos = data.items;
      const randomIndex = Math.floor(Math.random() * repos.length);
      const randomRepo = repos[randomIndex];
      return randomRepo;
    })
    .catch(err => {
      throw err});
}





export async function getLanguageNames(): Promise<string[]> {
  const response = await fetch(
    'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml'
  );

  const yamlText = await response.text();
  const languages = parse(yamlText) as Record<string, any>;

  return Object.keys(languages);
}


