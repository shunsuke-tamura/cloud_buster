async function getSuggest() {
  const clouds = ["Azure", "AWS", "GCP", "Heroku"];
  let google_url = `https://suggestqueries.google.com/complete/search?output=toolbar&hl=en&q=azure`;
  let googlejp_url = `https://suggestqueries.google.com/complete/search?output=toolbar&hl=jp&q=azure`;
  let yahoo_url = `https://search.yahoo.com/sugg/gossip/gossip-us-fp/?nresults=10&output=yjsonp&command=keyword`;
  let yahoojp_url = `http://asprov.search.yahoo.co.jp/AssistSearchService/V2/webassistSearch?p=keyword`;
  let bing_url = `https://api.bing.com/osjson.aspx?market=en-US&query=keyword`;
  let bingjp_url = `https://api.bing.com/osjson.aspx?market=ja-JP&query=keyword`;
  let youtube_url = `https://www.google.com/complete/search%20%20?client=youtube&hl=en&ds=yt&q=keyword`;
  let youtubejp_url = `https://www.google.com/complete/search%20%20?client=youtube&hl=ja&ds=yt&q=keyword`;
  let amazon_url = `http://completion.amazon.com/search/complete?search-alias=aps&mkt=1&q=keyword`;
  let amazonjp_url = `http://completion.amazon.co.jp/search/complete?search-alias=aps&mkt=6&q=keyword`;
  let wiki_url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=keyword`
  let wikijp_url = `https://ja.wikipedia.org/w/api.php?action=opensearch&format=json&search=keyword`;
}
