var userinput
var searchButton = document.getElementById('searchbtn');
searchButton.addEventListener("click",submitCity);
var today = new Date();
var date = (today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear();
var latitude;
var longitude;
var tempCall;
var windCall;
var humidityCall;
var uvindexCall;

//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=c422aee9ed9f77364f533d6d1dbe4ba9

let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=c422aee9ed9f77364f533d6d1dbe4ba9`;
fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })

let locationURL = `https://us1.locationiq.com/v1/search.php?key=pk.21d85371f816e7abc29eac9fe2f539f3&q=Chicago&format=json`;
fetch(locationURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // console.log(data);
    })

function submitCity(event){
    event.preventDefault();
    var inputTemp = document.getElementById('inputfield');
    var dayInfo = document.getElementById('citydayinfo');
    dayInfo.innerHTML = "";
    userinput = inputTemp.value;
    console.log(userinput);

    let locationURLpart1 = "https://us1.locationiq.com/v1/search.php?key=pk.21d85371f816e7abc29eac9fe2f539f3&q="
    let locationURLpart2 = "&format=json"
    
    let locationURL = locationURLpart1+userinput+locationURLpart2;
    fetch(locationURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(locationURL);
        latitude = data[0].lat;
        longitude = data[0].lon;
        console.log(latitude+", "+longitude);
        var currentDayWeather = document.getElementById('citydayinfo');
        
        var h1Tag = document.createElement('h1');
        var h1Text = document.createTextNode(userinput);
        h1Tag.appendChild(h1Text);
        currentDayWeather.appendChild(h1Tag);
        
        var dateTag = document.createElement('h2');
        var dateText = document.createTextNode(date);
        dateTag.appendChild(dateText);
        currentDayWeather.appendChild(dateTag);

        let locationURL2part1 = "https://api.openweathermap.org/data/2.5/onecall?lat=";
        let locationURL2part2 = "&lon=";
        let locationURL2part3 = "&exclude=hourly,daily&appid=c422aee9ed9f77364f533d6d1dbe4ba9&units=imperial";

        let queryUrl = locationURL2part1+latitude+locationURL2part2+longitude+locationURL2part3;
            console.log(queryUrl);

            fetch(queryUrl)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    console.log(data);
                    tempCallConv = data.current.temp;
                    windCallConv = data.current.wind_speed;
                    humidityCall = data.current.humidity;
                    uvindexCall = data.current.uvi;
                    var tempConvCall;
                    console.log("Temperature: "+tempCallConv);
                    console.log("Wind Speed: "+windCallConv);
                    console.log("Humidity: "+humidityCall);
                    console.log("UV Index: "+uvindexCall);
                    
                    // tempCallConv = parseFloat(tempCallConv);
                    // tempCallConv = ((tempCallConv-273.15)*1.8)+32;
                    // console.log(tempCallConv);
                    tempCall = tempCallConv.toFixed(0);
                    console.log(tempCall);
                    windCall = windCallConv.toFixed(2);
                
                    var results1Tag = document.createElement('h3');
                     var results1Text = document.createTextNode("Temperature: "+tempCall+"°F");
                        results1Tag.appendChild(results1Text);
                        currentDayWeather.appendChild(results1Tag);

                    var results2Tag = document.createElement('h3');
                    var results2Text = document.createTextNode("Wind Speed: "+windCall+" MPH");
                        results2Tag.appendChild(results2Text);
                        currentDayWeather.appendChild(results2Tag);
                
                    var results3Tag = document.createElement('h3');
                    var results3Text = document.createTextNode("Humidity: "+humidityCall+"%");
                        results3Tag.appendChild(results3Text);
                        currentDayWeather.appendChild(results3Tag);
                    
                    var results4Tag = document.createElement('h3');
                    var results4Text = document.createTextNode("UV Index: "+uvindexCall);
                    results4Tag.appendChild(results4Text);
                    currentDayWeather.appendChild(results4Tag);

                    var searchTrack = localStorage.getItem('searchTrack');

                    if(searchTrack===null){
                        searchTrack = [
                            {
                                cityname: userinput,
                                temp: tempCall,
                                wind: windCall,
                                humidity: humidityCall,
                                uvi: uvindexCall
                            }
                        ]
                        window.localStorage.setItem('searchTrack',JSON.stringify(searchTrack));
                    }else{
                        var newSearch = [
                            {
                                cityname: userinput,
                                temp: tempCall,
                                wind: windCall,
                                humidity: humidityCall,
                                uvi: uvindexCall
                            }
                        ]

                        var searchMem = JSON.parse(localStorage.getItem('searchTrack'));
                        searchTrack = searchMem.concat(newSearch);
                        localStorage.setItem('searchTrack', JSON.stringify(searchTrack));
                        displaySearches();
                    }
                    
                })
    })
}

function displaySearches(){
    var searchHistory = document.getElementById('searcharea');
    var searchTrack = JSON.parse(window.localStorage.getItem('searchTrack'));

    for(var i=0; i<searchTrack.length+1; i++){
        var citysearchName = searchTrack[i].cityname;
        var citysearchTemp = searchTrack[i].temp;
        var citysearchWind = searchTrack[i].wind;
        var citysearchHumid = searchTrack[i].humidity;
        var citysearchUV = searchTrack[i].uvi;

        var nameTag = document.createElement('h3');
        var nameText = document.createTextNode(citysearchName);
        nameTag.appendChild(nameText);
        searchHistory.appendChild(nameTag);



    }
}
