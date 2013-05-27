# staticReader


Given my simple needs for an RSS reader (not a power user, but like to read a bunch of different stuff), and my preference for having feeds available that I can read from any device (main machine, mobile, etc), I would like to build something simple that others might find useful.

I don't know how to build this offhand, but thought others might have some useful tips, or be interested in helping out. I have created a `github` [repo](https://github.com/rmflight/staticReader) if anyone wants to work with me on this.

## Parsing

`Ruby` or `Python` (preferably `Python`) parsing of a list of RSS feeds, the output of which is subsequently stored in a database (`sqlite` maybe??). This step is meant to be done on a personal machine.

## Output

The results of the parsing of the feeds are then written to a single (or set of) web-pages that can be hosted someplace easily, for example on `github` `gh-pages` or any other domain.

### Interactivity

The interactive display of the feeds is enabled by `javascript`, with a level of display for the feeds and individual items, as well as moving between items, marking as **favorites**, marking everything as read, etc. These functions, being `javascript`, actually modify the html pages themselves, changing attributes. These attributes can subsequently be read by functions on the personal machine when updated.
