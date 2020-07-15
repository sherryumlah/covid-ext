# Chrome Extension

## What Does this Extension Do?
This extension displays a random U.S. state's covid-19 stats each time a new browser tab is opened. This Covid Chrome Extension utilizes the Covid-19 API from [https://api.covid19api.com](https://api.covid19api.com) to pull data 1 time per day and store that data in the user's localStorage.  Each time a new tab is opened in the Chrome browser, the extension uses the chrome_url_overrides key listed in the manifest.json file to provide a custom replacement for the document and loads the html page noted in the key's value: newtab.html

### newtab.html
Newtab.html executes the js/script.js file, which compares today's date to the last date the user pulled from the API.  This script limits pulling data from the API to one time per day and stores the results in the user's localStorage.  

For the duration of the day, the script will pull covid data from the user's localStorage to randomly display a state's data with accompanying picture each time a new tab is opened.

### popup.html
The contents of popup.html are displayed in the browser when the user clicks on the extension's icon which appears beside the address bar.  The icon for this extension is a green and black bug. The contents of the popup.html page include a list of resources relevant to the creation of this extension.

## Installation
1. Clone the repo or download the files to your local drive. 
2. Open the Chrome browser and visit chrome://extensions
3. Be sure the Developer Mode toggle in the upper-right corner is toggled on.  This makes the Load Unpacked button visible.
3. Click the Load Unpacked button and select the chrome extension folder that you saved locally in step 1.  
4. Click the Select button.
5. This extension should appear in the toolbar alongside your other extensions with a green bug icon.
6. Open a new tab and you should be presented with a random state's covid-19 data and accompanying image.

## Workshop Instructions
Workshop instructions are available in the docs folder of this repo as both .docx and .pdf file formats.
[Google Slide Deck Presentation](https://docs.google.com/presentation/d/1EZHIY13mlcqJ4HqJYLEitRL27y-kqyNJoYr-kTF8S-c/edit?usp=sharing)
