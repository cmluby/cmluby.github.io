const MENULINK = document.getElementById('page-nav');

// Intercept the menu link clicks
MENULINK.addEventListener('click', function (evt) {
    // Get the data values for state and city
    // See https://javascript.info/bubbling-and-capturing for evt.target explanation
    let descriptPage = evt.target.dataset['page'];
    console.log(descriptPage);
    if(descriptPage != null){
        evt.preventDefault();
        // getData(descriptPage);
    }
});
// Get Location from weather.json file
function getData(LOCALE) {
    let URL = "js/detail-info.json";
    console.log(LOCALE);
     fetch(URL)
      .then(response => response.json())
      .then(function (data) {
       console.log('Json object from getData function:');
       console.log(data);
       console.log(data[LOCALE+'']);
       const locData = {}; // Create an object
       locData['name'] = data[LOCALE+''].City;
       locData['postal'] = data[LOCALE+''].zip;
       locData['state'] = data[LOCALE+''].State;
       locData['geoposition'] = data[LOCALE+''].Latitude + ", " + data[LOCALE+''].Longitude;
       locData['elevation'] =data[LOCALE+''].Elevation;
       console.log(locData);
       getWeather(locData, LOCALE);
       })
      .catch(error => console.log('There was a getCode error: ', error))
      
    } // end getCode function