var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://api.covid19api.com/live/country/united-states/status/confirmed/date/2020-05-05T00:00:00Z", requestOptions)
  .then(response => response.text())
  .then(result => {
    result =  JSON.parse(result);
    randomPick = Math.floor(Math.random() * result.length) + 1;
    const stateData = result[randomPick];
    console.log(stateData);
    document.body.style.backgroundImage = "url('images/"+stateData.Province.replace(/ /g,'')+".jpg')";
    document.getElementById("stateName").innerHTML = stateData.Province;
    document.getElementById("activeCases").innerHTML = stateData.Active;
    document.getElementById("deaths").innerHTML = stateData.Deaths;
    document.getElementById("dateReported").innerHTML = (stateData.Date).split("T")[0];
  })
  .catch(error => console.log('error', error));