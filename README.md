# Current Weather 

In this project I created a website that allowed you to put any city name in the search bar and it would return the weather forecast for the day and the next 5 days.
This is only true as long as you enter the name of the city correctly. If the name of the city wasn't correct then it wouldn't allow you to search
for it and would make you re-enter the city's name. 

I used multiple API calls in order for this to work. First I had to make a API call to Open Weather API for the city's name to get the latitude and the longitude so that 
I would be able to search for the current weather at those coorinates. I did another search to make sure that there was a valid response and not a  404 or other 
response that indicate a failure to access. 
## Authors

- [@marshallrizzuto](https://github.com/Zoot83)

Website: https://zoot83.github.io/Current_Weather/
## Features

- Javascript
- API's
- Moment
- Heirarchy 
- Understanding Functions
- Function returned values
- Local storage
- Query Selectors
- Arrays
- JSON
- Stringify



## Demo




## Usage/Examples

  In this snippet of code it demonstartes that ability to access and use moment js in the code to have the current time be generated. 
  This is taking the current date and make the correct format of the desired look. 

    In this moment section it converts the time from the passed in vairable to the proper format once again. 

    function displayDate(){
        var rightNow = moment().format('l');
     timeDisplayEl.innerHTML = rightNow;
     }

     function findTheDate(number){
    
    var dayForward = new moment().add(number, 'day');
    return dayForward.format('l'); 
    }



This snipped of code shows how i used the city and inserted it into the url to receive the correct information from the API i used.

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL, {
        "method": "Get",
        "headers":{
        }
    })

    .then(response => {
    if (!response.ok) {
      throw response; //check the http response code and if isn't ok then throw the response as an error
    }
