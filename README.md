# staticReader

`StaticReader` is an `R` package that provides a static RSS reader using the `python` RSS reader `rawdog`, some saving functionality using `javascript` and github `gists`, and other github manipulation using the `github` `R` package. This makes it it possible to **easily** save rss item links somewhere else when hosting the feed on static hosting such as **github**. The templates, combined with some `rawdog` plugins, **github** hosting and *gists* and javascript cross-site requests let us do some interesting things.

## Requirements

You will need to download and install [`rawdog`](http://offog.org/code/rawdog/), and its requirement [`feedparser`](https://pypi.python.org/pypi/feedparser). The following steps assume that this has been done.

## Installation & Setup

Clone this repo to a directory where you will keep everything. 

```
git clone https://github.com/rmflight/staticReader.git
```

Assuming you want to save URL's from the `rawdog` output somewhere, you will also need a personal **github** oauth token and a *gist* to save them to. Oauth tokens can be generated from the **github** account settings, under *Applications* -> *Personal Access Tokens* -> **Create new token**. Copy this string and put it in a text file, this will be used to connect the web-page with your gist.

Create a *gist* with at least one file (**savedURL.md** is the assumed file name by `staticReader`) with a line of text, and a return. This is the file where URL's will be saved. You will need the *gist* id, this is the last part of the numeric part of the *gist* url, i.e. `gist.github.com/username/gistid`, `gistid` is that part you want. And the name of the file in the gist you want to store the URL's in. You can use `savedURL.md` to incur the least changes to the javascript code.

With this information in hand, you need to modify the `saveDataGist.js` file. Specifically, you need to modify the variable `gistID` on line **70**, and if you are using a different file name in the *gist*, then also modify lines **144** and **149**.

You also need to define the file where the `rawdog` output should go, line **151** in `.rawdog/config`.

If you were previously using Google Reader, and have your feeds stored in an OPML file, you can also use the `opml_to_text.R` function to extract your feed URLs into a format suitable for `rawdog`. 

## Testing

To verify that everything is working properly, you should now run `rawdog` once. The included `config` file has the *reddit* rss feed for *new* included to allow for testing.

```
rawdog -d pathtodir/.rawdog -uw
```

Now start a simple web server and point it to your `staticReader` directory. 

### Python

```
python -m SimpleHTTPServer
```

### R

```
library(servr)
httd(dir=".", port=8000)
```

And open **localhost:8000/index.html** in your browser. You should see your `rawdog` output, and there should be two buttons, **Submit** and **Fetch Gist Data**. **Submit** should be **red**. Paste in your **token** you generated and saved earlier, and hit **Submit**, it should turn **green**. Your token is now saved as a cookie. Next, hit **Fetch Gist Data**, it should also turn **green**. If it doesn't, open up a console and look at error messages. Finally, hit **save** on one of the items in the feed. The save button should turn **red** while the request is processed, then **green** when it gets the confirmation back. Finally, open the **gist** where you were keeping the data, and you should see a new link. **Congratulations, it works!**.

## Use Cases & Plugins

I am **not** a regular RSS reader, I like to read things in bulk, when I get a chance. Therefore, the `rawdog` configuration and plugins are what are useful to me. My use case is to have continuous updates of the `rawdog` state using `cron` and `rawdog -d staticReaderDir/.rawdog -u` so that I'm not overloading RSS feed servers, and then when I am ready to read, do `rawdog -d staticReaderDir/.rawdog -w` to **write** the output, and then **push** the output to static hosting in GitHub. Therefore, I have the `since-last` plugin installed to just write the entries since the last write. So I assume that I won't write again until I'm done reading a given set of entries. **If this is not what you want**, then you may want to delve deeper into the `rawdog` config and plugins and change things up for yourself.

## Compatibility

Currently only tested on Chrome, have noticed one bug in Firefox that has not been investigated.

## Final Set Up

If you want to host this on GitHub, then you will need to create a `gh-pages` branch of your repo, and make sure to include the html, js, and css files on that branch.

# License

CC0. Play with it, modify it, fork it, issue merge requests if you come up with improvements. Be nice, and tell others where you got it.
