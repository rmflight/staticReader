# staticReader


Given my simple needs for an RSS reader (not a power user, but like to read a bunch of different stuff), and my preference for having feeds available that I can read from any device (main machine, mobile, etc), I would like to build something simple that others might find useful.

## rawdog

Feeds are processed using `rawdog`, a river of news style feed reader built in python. The templates include javascript that is used to store cookies (a github personal token for writing to your `gist`), and make cross site requests to store the URL's of things that are found to be interesting. 

Example configurations are stored in the `./rawdog` folder, as well as plugins that may be useful.