# staticReader


Given my simple needs for an RSS reader (not a power user, but like to read a bunch of different stuff), and my preference for having feeds available that I can read from any device (main machine, mobile, etc), I would like to build something simple that others might find useful.

I don't know how to build this offhand, but thought others might have some useful tips, or be interested in helping out. I have created If anyone could offer suggestions on how to build this given my description below, we could perhaps discuss it here, or on [reddit](http://www.reddit.com/r/programming/comments/1f4030/staticreader_idea_for_simple_relatively_static/)

## Parsing

I had breifly considered using `R` for parsing the RSS feeds, but there does not appear to be an RSS parsing library for `R`. The `python` library [`feedparser`](https://code.google.com/p/feedparser/) looks like a good bet for its ability to handle rss and atom.

`Ruby` or `Python` (preferably `Python`) parsing of a list of RSS feeds, the output of which is subsequently stored in a database (`sqlite` maybe??). This step is meant to be done on a personal machine.



## Output

The results of the parsing of the feeds are then written to a single (or set of) web-pages that can be hosted someplace easily, for example on `github` `gh-pages` or any other domain.

### Interactivity

The interactive display of the feeds is enabled by `javascript`, with a level of display for the feeds and individual items, as well as moving between items, marking as **favorites**, marking everything as read, etc. These functions, being `javascript`, actually modify the html pages themselves, changing attributes. These attributes can subsequently be read by functions on the personal machine when updated.

### Ideas for processing

Could I use a gist as a storage location for which posts have been read?? i.e. something that could be modified by javascript on the page I'm using. Is it possible to easily modify a provided **anonymous** gist using `javascript`?? Would be interesting to try, at least for keeping track of stuff that has been read, and starred for later. This would not have to keep track of everything, just be modified in between updates.
