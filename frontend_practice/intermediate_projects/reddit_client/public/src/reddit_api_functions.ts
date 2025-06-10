export async function getSubRedditInfo(subreddit: string) {
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(res => res.json())
    .then(data => {
      const subredditInfo = data.items;
      return subredditInfo;
    })
    .catch(err => {throw err});
}



