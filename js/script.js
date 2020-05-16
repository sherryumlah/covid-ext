/*  This Covid Chrome Extension utilizes the Covid-19 API
from https://api.covid19api.com to pull data 1 time per day
and store that data in localStorage.  Each time a new
tab is opened in the Chrome browser, the extension
uses the chrome_url_overrides key to provide a custom replacement 
for the document and loads the page listed in the key value: newtab.html

Newtab.html executes this script, which compares today's date
to the last date the user pulled from the API.  This script limits
pulling data from the API to one time per day and stores the results
in the user's localStorage.  

For the duration of the day, the script will pull covid data from 
the user's localStorage to randomly display a state's data with
accompanying picture each time a new tab is opened. */


/******************************************************
// Get today's date, convert to ISO, and strip time
// Example:  Sat May 16 2020 14:27:22 GMT-0500
// becomes 2020-05-16T19:27:54.437Z
// 2020-05-16
******************************************************/
let getDate = () => {
  let today = (new Date()).toISOString().split("T")[0];
  return today;
}

/**********************************************************
// Getters/Setters for last retrieved date in localStorage 
**********************************************************/
let getLastRetrievedDate = () => {
  console.log("Covid API data last retrieved on: " + localStorage.getItem("dateLastRetrieved"));
  return localStorage.getItem("dateLastRetrieved");
}

let setLastRetrievedDate = (today) => {
  console.log("Setting date that data was last retrieved to: " + today);
  localStorage.setItem("dateLastRetrieved", today);
};


/************************************
// Get Covid Data from LocalStorage
************************************/
let getLocalCovidData = () => {
  console.log("Pulling data from localStorage...")
  return localStorage.getItem("covidData");
}

/**************************
// Get Covid Data from API
**************************/
let getCovidData = (today) => {
  console.log("Getting data from API...");
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("https://api.covid19api.com/live/country/united-states/status/confirmed/date/2020-05-05T00:00:00Z", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log("Saving API response to localStorage...");
      localStorage.setItem("covidData", result);
    })
    .then(() => {
      setLastRetrievedDate(today);
    })
    .then(() => {
      displayData(getLocalCovidData());
    })
    .catch(error => {
      console.log('error', error);
      localStorage.setItem("covidData", "");
      localStorage.setItem("lastRetrievedDate", "");
    });
};

/*****************************************
// Display Random State's Data and Photo
*****************************************/
let displayData = (covidData) =>{
  covidData = JSON.parse(covidData);
  console.log("Pulling random state data...");
  randomPick = Math.floor(Math.random() * (covidData.length + 1));
  let stateData = covidData[randomPick];
  // console.log(stateData);
  console.log("Displaying data for: " + stateData.Province);
  document.body.style.backgroundImage = "url('images/"+stateData.Province.replace(/ /g,'')+".jpg')";
  document.getElementById("stateName").innerHTML = stateData.Province;
  document.getElementById("activeCases").innerHTML = stateData.Active;
  document.getElementById("deaths").innerHTML = stateData.Deaths;
  document.getElementById("dateReported").innerHTML = (stateData.Date).split("T")[0];
}
  

// Check to see if we already retrieved and stored API data for today
let today = getDate();
let lastRetrievedDate = getLastRetrievedDate();

if (today !== lastRetrievedDate){
  getCovidData(today);
} else {
  console.log("Data was already retrieved for today (" + today + ")");
  displayData(getLocalCovidData());
}