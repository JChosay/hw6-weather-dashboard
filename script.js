var userinput
var today = new Date();
var date = (today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear();
var latitude;
var longitude;
var tempCall;
var windCall;
var humidityCall;
var uvindexCall;
var beginswitch = 0;

var main = document.getElementById('main');
var header = document.getElementById('header');
var searcharea = document.getElementById('searcharea');
var citysearch = document.getElementById('citysearch');
var inputfield = document.getElementById('inputfield');
var searchbtn = document.getElementById('searchbtn');
searchbtn.addEventListener("click",submitCity);
var searchhistory = document.getElementById('searchhistory');
var citydayinfo = document.getElementById('citydayinfo');
var cityfivedayinfo = document.getElementById('cityfivedayinfo');

function loadScreen (){
    var searchTrack = JSON.parse(window.localStorage.getItem('searchTrack'));
    if (searchTrack == null){
        console.log("Nothing in the search history.");
        return;
    }else if (searchTrack.length > 0){
        searcharea.style.borderBottom = "solid";
    }

    for(var i=0; i<searchTrack.length+1; i++){
        if (searchTrack == null){
            return;
        }else{
            console.log(searchTrack);
            var historyItem = document.createElement('input');
            historyItem.setAttribute('type','button');
            historyItem.setAttribute('value',searchTrack[i].cityname);
            historyItem.setAttribute('class','historybuttons');
            searchhistory.appendChild(historyItem);
            }
    }
}

loadScreen();

function submitCity(event){
    event.preventDefault();
    citydayinfo.innerHTML = "";
    userinput = inputfield.value;
    inputfield.value = "";
    searcharea.style.borderBottom = "solid";

    let locationURL = `https://us1.locationiq.com/v1/search.php?key=pk.21d85371f816e7abc29eac9fe2f539f3&q=${userinput}&format=json`;
    fetch(locationURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(locationURL);
        latitude = data[0].lat;
        longitude = data[0].lon;
        console.log(latitude+", "+longitude);
        
        var h1Tag = document.createElement('h1');
        var h1Text = document.createTextNode(userinput);
        h1Tag.appendChild(h1Text);
        citydayinfo.appendChild(h1Tag);
        
        var dateTag = document.createElement('h3');
        var dateText = document.createTextNode(date);
        dateTag.appendChild(dateText);
        citydayinfo.appendChild(dateTag);

        let queryUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=c422aee9ed9f77364f533d6d1dbe4ba9&units=imperial`
        
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
                
                tempCall = tempCallConv.toFixed(0);
                windCall = windCallConv.toFixed(2);
            
                var results1Tag = document.createElement('h4');
                var results1Text = document.createTextNode("Temperature: "+tempCall+"°F");
                results1Tag.appendChild(results1Text);citydayinfo.appendChild(results1Tag);

                var results2Tag = document.createElement('h4');
                var results2Text = document.createTextNode("Wind Speed: "+windCall+" MPH");
                results2Tag.appendChild(results2Text);
                citydayinfo.appendChild(results2Tag);
            
                var results3Tag = document.createElement('h4');
                var results3Text = document.createTextNode("Humidity: "+humidityCall+"%");
                results3Tag.appendChild(results3Text);
                citydayinfo.appendChild(results3Tag);
                
                var results4Tag = document.createElement('h4');
                var results4Text = document.createTextNode("UV Index: "+uvindexCall);
                results4Tag.appendChild(results4Text);
                citydayinfo.appendChild(results4Tag);
                citydayinfo.setAttribute('display','flex');
                citydayinfo.style.display = "flex";
                beginswitch++;

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
                    displayFiveDay();
                }
            })
    })
}

function displaySearches(){
    var searchTrack = JSON.parse(window.localStorage.getItem('searchTrack'));
    var searchTrackIndex = searchTrack.length;
    console.log("searchTrackIndex: "+searchTrackIndex);

    searchhistory.innerHTML = "";
    for(var i=0; i<searchTrack.length+1; i++){
        
        if (searchTrack == null){
            return;
        }else{
            console.log(searchTrack);
            var historyItem = document.createElement('input');
            historyItem.setAttribute('type','button');
            historyItem.setAttribute('value',searchTrack[i].cityname);
            historyItem.setAttribute('class','historybuttons');
            searchhistory.appendChild(historyItem);
        }
    }

    for(var i=0; i<searchTrack.length+1; i++){
        var citysearchName = searchTrack[i].cityname;
        var citysearchTemp = searchTrack[i].temp;
        var citysearchWind = searchTrack[i].wind;
        var citysearchHumid = searchTrack[i].humidity;
        var citysearchUV = searchTrack[i].uvi;

        var countButtons = document.getElementsByClassName("historybuttons");
        console.log("countButtons is: "+countButtons.length);
    }
}

function displayFiveDay(){
    console.log("displayFiveDay is working fine.");
}