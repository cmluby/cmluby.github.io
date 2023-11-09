const MENULINK = document.getElementById('page-nav');

// Intercept the menu link clicks
MENULINK.addEventListener('click', function (evt) {
    // Get the data values for state and city
    // See https://javascript.info/bubbling-and-capturing for evt.target explanation
    let descriptPage = evt.target.dataset['page'];
    console.log(descriptPage);
    if (descriptPage != null) {
        evt.preventDefault();
        getData(descriptPage);
    }
});
// Get Location from weather.json file
function getData(dayinDec) {
    if (dayinDec == "Home") {
        document.getElementById("home-main").setAttribute("class", "show");
        document.getElementById("detail-main").setAttribute("class", "hide");
        return;
    }
    let URL = "js/detail-info.json";

    console.log(dayinDec);
    fetch(URL)
        .then(response => response.json())
        .then(function (data) {
            console.log('Json object from getData function:');
            console.log(data);
            console.log(data[dayinDec + '']);
            const dayData = {}; // Create an object
            dayData['title'] = data[dayinDec].title;
            dayData['description'] = data[dayinDec].desc;
            dayData['form'] = data[dayinDec].formlink;
            //    dayData['geoposition'] = data[dayinDec+''].Latitude + ", " + data[dayinDec+''].Longitude;
            //    dayData['elevation'] =data[dayinDec+''].Elevation;
            console.log(dayData);
            //    getWeather(dayData, dayinDec);
            buildPage(dayData);
        })
        .catch(error => console.log('There was a getCode error: ', error))

} // end getCode function
function buildPage(dayData) {
    var stateObj = { foo: "bar" };
    document.getElementById("page-title").innerHTML = dayData.title;
    document.getElementById("page-descript").innerHTML = dayData.description;
    var linkEl = document.getElementById("form-link");
   
    linkEl.innerhtml = "Click here to submit what you did!";
    linkEl.href = dayData.form;
    document.getElementById("home-main").setAttribute("class", "hide");
    document.getElementById("detail-main").setAttribute("class", "show");
    history.pushState(stateObj, "", "#" + dayData.title);

}
