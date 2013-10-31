# staticReader

`StaticReader` is essentially a couple of templates for the `rawdog` *rss* reader that make it possible to **easily** save rss item links somewhere else when hosting the feed on static hosting such as **github**. The templates, combined with some `rawdog` plugins, **github** hosting and *gists* and javascript cross-site requests let us do some interesting things.

## Requirements

You will need to download and install [`rawdog`](http://offog.org/code/rawdog/), and its requirement [`feedparser`](https://pypi.python.org/pypi/feedparser). The following steps assume that this has been done.

## Installation & Setup

Clone this repo to a directory where you will keep everything. 

```
git clone https://github.com/rmflight/staticReader.git
```

Assuming you want to save URL's from the `rawdog` output somewhere, you will also need a personal **github** oauth token and a *gist* to save them to. Oauth tokens can be generated from the **github** account settings, under *Applications* -> *Personal Access Tokens* -> **Create new token**. Copy this string and put it in a text file, this will be used to connect the web-page with your gist.

Create a *gist*, and insert at least one file, with a line of text, and a return. This is the file where URL's will be saved. You will need the *gist* id, this is the last part of the numeric part of the *gist* url, i.e. `gist.github.com/username/gistid`, `gistid` is that part you want. And the name of the file in the gist you want to store the URL's in. You can use `savedURL.md` to incur the least changes to the javascript code.

With this information in hand, you need to modify the `saveDataGist.js` file. Specifically, you need to modify the variable `gistID` on line **70**, and if you are using a different file name in the *gist*, then also modify lines **144** and **149**.

If you were previously using Google Reader, and have your feeds stored in an OPML file, you can also use the `opml_to_text.R` function to extract your feed URLs into a format suitable for `rawdog`. 

## Testing

To verify that everything is working properly, you should now run `rawdog` once. The included `config` file has the *reddit* rss feed for *new* included to allow for testing.


Given my simple needs for an RSS reader (not a power user, but like to read a bunch of different stuff), and my preference for having feeds available that I can read from any device (main machine, mobile, etc), I would like to build something simple that others might find useful.

## Requirements

What I 

## rawdog

Feeds are processed using [`rawdog`], a river of news style feed reader built in python. The templates include javascript that is used to store cookies (a github personal token for writing to your `gist`), and make cross site requests to store the URL's of things that are found to be interesting. 

Example configurations are stored in the `./rawdog` folder, as well as plugins that may be useful.
