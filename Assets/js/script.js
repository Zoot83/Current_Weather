var submitEl = document.getElementById("formobj");
var cityBtnEl = document.getElementById("list-group");
var timeDisplayEl = document.getElementById('current-date');

var APIKey = "b838f1163cc01a8a4a05353f80c0c55b";
var city;
var currentDT; 

var cities = [];

//Saves the city to the local storage
function saveCity(event){
    event.preventDefault();
    city = document.getElementById("citySearch").value;
    var data = JSON.parse(localStorage.getItem('data')) || {};
    data[city]=city;
    localStorage.setItem("data", JSON.stringify(data));
    
    getApi();
    
}

//Adds a button with the city's Name on the left hand side under the form object
function addCityToList(searchEl){
    
    if(cities.includes(searchEl)){
         return;
     }
        let btn = document.createElement("button");
        btn.innerHTML = searchEl;
        var listEl = document.querySelector(".list-group");
        btn.classList.add("cityBtn");
        listEl.appendChild(btn);
        cities.push(city);

}

//Gets the api and if it is successful it will add it to the list if not it will display an alert
function getApi(){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL, {
        "method": "Get",
        "headers":{
        }
    })

    .then(response => {
    if (!response.ok) {
      throw response; //check the http response code and if isn't ok then throw the response as an error
    }
              
    return response.json(); //parse the result as JSON
  
    }).then(response => {
    //response now contains parsed JSON ready for use
        addCityToList(city);
         displayCityDetails( response.coord.lat, response.coord.lon);
  
    }).catch((errorResponse) => {
        if (errorResponse.text) { //additional error information
            errorResponse.text().then( errorMessage => {
        //errorMessage now returns the response body which includes the full error message
        })
        } else {
        //no additional error information 
        } 
    });
}



function displayCityDetails(lat, lon){
    var oneCallEl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;
    fetch(oneCallEl, {
        "method": "Get",
        "headers":{
        }
    })

    .then(response => {
    if (!response.ok) {
      throw response; //check the http response code and if isn't ok then throw the response as an error
    }
              
    return response.json(); //parse the result as JSON
 
    }).then(response => {
    //response now contains parsed JSON ready for use
        selectorfunc(".city-name", city);
        selectorfunc(".city-temp", "Temp in degrees F:"+response.current.temp);
        selectorfunc(".city-wind", "Wind Speed in mph: "+response.current.wind_speed);
        selectorfunc(".city-hum", "Humidity: "+response.current.humidity);
        selectorfunc(".city-uvi", "UV index: "+response.current.uvi);
        weatherIconLoad(response.current.weather[0].icon, "wicon");
        displayDate();
        cityForcast(response);
        
    }).catch((errorResponse) => {
        if (errorResponse.text) { //additional error information
            errorResponse.text().then( errorMessage => {
        //errorMessage now returns the response body which includes the full error message
        })
        } else {
        //no additional error information 
        } 
    });
}

function selectorfunc(class_name,class_value){
    var divEl = document.querySelector(class_name);
    divEl.innerHTML=class_value;
}

function weatherIconLoad(response, refSrc){
    var iconcode = response;
    var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
    $('#'+refSrc).attr('src', iconurl);
    $('#'+refSrc).attr('hidden', false);
}

function displayDate(){
    var rightNow = moment().format('l');
    timeDisplayEl.innerHTML = rightNow;
}

function findTheDate(number){
    
    var dayForward = new moment().add(number, 'day');
    return dayForward.format('l'); 
}

function cityForcast(response){
    findTheDate(response.daily[0].dt);
        for(var i=0; i<6; i++){
            
            document.getElementById("day"+(i+1)).innerHTML = findTheDate(i);
            document.getElementById("day"+(i+1)+"temp").innerHTML = "Temp:"+response.daily[i].temp.day+"ºF";
            document.getElementById("day"+(i+1)+"hum").innerHTML = "Hum:"+response.daily[i].humidity;
            document.getElementById("day"+(i+1)+"wind").innerHTML = "Wind Speed:"+response.daily[i].wind_speed+"mph";
            weatherIconLoad(response.daily[i].weather[0].icon, "img"+i);
        }
}


cityBtnEl.onclick = function(event){
    let target = event.target;

    
    if(target.className != 'cityBtn'){
        return;
    }

    city=target.innerHTML;
    getApi();

    
};

submitEl.addEventListener("submit", saveCity);
