# Google Search

--

## disable Google Workspace smart features

Google Workspace smart features enable AI features across multiple Google apps, such as Keep, Drive, Gmail, etc.

1. go to [Google Chat](https://chat.google.com/app/home) (this is the easiest page to access the settings from)

2. open `Settings`

3. go to `Data privacy` 

4. press `Manage settings`

5. toggle `Smart features in Google Workspace` to `off`

6. toggle `Smart features in other Google products` to `off`

**note:** an alternative way to access these settings is through `Google Drive settings` > `Privacy` > `Manage Workspace smart feature settings`

--

## disable AI Overview

**note**: these methods may stop working at any time

### method 1

- add `-ai` to your search text

- `how to boil an egg` becomes `how to boil an egg -ai`

### method 2

- add `&udm=14` to the search link

- `google.com/search?q=test` becomes `google.com/search?q=test&udm=14`

to make this step permanent, change your search engine in the browser to point to:

- `https://www.google.com/search?q=%s&udm=14`

or you can use the service [udm14.org](https://udm14.org) to automatically add the `&udm=14` to your Google searches.

### method 3

switch to another search engine that allows you to opt-out of AI. some options are:

- [noai.duckduckgo.com](https://noai.duckduckgo.com/)
- [kagi.com](https://kagi.com/)

--

## see also

- [Android](/article/android)
- [Google Drive](/article/google-drive)
- [Google Keep](/article/google-keep)
- [Google Maps](/article/google-maps)
- [Google Photos](/article/google-photos)
- [Gmail](/article/gmail)
- [YouTube](/article/youtube)

--

## resources

- [Tips & Tricks to Get Search Engines to Return Authentic Results](https://github.com/laylavish/TipsTricksGoogleSearch)

--

## sources

- [Learn about smart features & controls for Google Workspace & other Google products](https://support.google.com/mail/answer/15604322)