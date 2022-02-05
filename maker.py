import requests
import json

def makeSuggestList():
    wordList = {"Azure": [], "AWS": [], "GCP": [], "Heroku": []}
    google_url = 'https://suggestqueries.google.com/complete/search?client=firefox&hl=en&q='
    googlejp_url = 'https://suggestqueries.google.com/complete/search?client=firefox&hl=jp&q='
    yahoo_url = 'https://search.yahoo.com/sugg/gossip/gossip-us-fp/?nresults=10&output=json&command='
    bing_url = 'https://api.bing.com/osjson.aspx?market=en-US&query='
    bingjp_url = 'https://api.bing.com/osjson.aspx?market=ja-JP&query='
    youtube_url = 'https://www.google.com/complete/search?client=firefox&hl=en&ds=yt&q='
    youtubejp_url = 'https://www.google.com/complete/search?client=firefox&hl=ja&ds=yt&q='
    amazon_url = 'http://completion.amazon.com/search/complete?search-alias=aps&mkt=1&q='
    amazonjp_url = 'http://completion.amazon.co.jp/search/complete?search-alias=aps&mkt=6&q='
    wiki_url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='
    wikijp_url = 'https://ja.wikipedia.org/w/api.php?action=opensearch&format=json&search='

    urls = [google_url, googlejp_url, yahoo_url, bing_url, bingjp_url, youtube_url, youtubejp_url, amazon_url, amazonjp_url, wiki_url, wikijp_url]

    for cloud, words in wordList.items():
        for url in urls:
            r = requests.get(url + cloud)
            if url == yahoo_url:
                for word_dict in r.json()['gossip']['results']:
                    word = word_dict['key']
                    word = word.lower().replace(cloud.lower(), '')
                    if len(word) != 0:
                        if word[0] == " " or word[0] == "　":
                            word = word[1:]
                        words.append(word)
            else:
                for word in eval(str(r.json()))[1]:
                    word = word.lower().replace(cloud.lower(), '')
                    word = word.replace('アズレン', '')
                    word = word.replace('あずれん', '')
                    word = word.replace('アズレ', '')
                    word = word.replace('あずれ', '')
                    word = word.replace('ヘロク', '')
                    word = word.replace('へろく', '')
                    if len(word) != 0:
                        if word[0] == " " or word[0] == "　":
                            word = word[1:]
                        words.append(word)
        words = list(set(words))
    dup = []
    dup.extend(list(set(wordList['Azure']) & set(wordList['AWS'])))
    dup.extend(list(set(wordList['Azure']) & set(wordList['GCP'])))
    dup.extend(list(set(wordList['Azure']) & set(wordList['Heroku'])))
    dup.extend(list(set(wordList['AWS']) & set(wordList['GCP'])))
    dup.extend(list(set(wordList['AWS']) & set(wordList['Heroku'])))
    dup.extend(list(set(wordList['GCP']) & set(wordList['Heroku'])))
    wordList['Azure'] = list(set(wordList['Azure']) - set(dup))
    wordList['AWS'] = list(set(wordList['AWS']) - set(dup))
    wordList['GCP'] = list(set(wordList['GCP']) - set(dup))
    wordList['Heroku'] = list(set(wordList['Heroku']) - set(dup))
    return wordList
        