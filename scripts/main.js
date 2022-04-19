function mode () {
    let el = document.body;
    let listBg = document.getElementById('window-list');
    let dataBg = document.getElementById('window-data');
    let dataInfoBg = document.getElementById('data-info');

    el.classList.toggle('light-mode');
    listBg.classList.toggle('window-list_light');
    dataBg.classList.toggle('window-data_light');
    dataInfoBg.classList.toggle('data-info_light');
}

function currtime () {
    let date = new Date();
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let currTime = document.querySelector('.data-info_time')

    return currTime.innerHTML = `${hours}:${minutes}`;
}

currtime();

const apiKey = "b98f2d3b7b75f9a4636f70fd1d0ab72c";
const city = "Kyiv";


const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const { main, name, weather} = data;
        console.log(weather[0].icon);
        console.log(main);

        let currTemp = document.querySelector('.data-weather_value')
        currTemp.innerHTML = main.temp.toFixed(0);

        let locationIcon = document.querySelector('.data-weather_icon');
        const icon = weather[0].icon;
        locationIcon.innerHTML = `<img class="weather_icon" src="assets/weather/${icon}.png">`;

        let currCity = document.querySelector('.data-info_city')
        currCity.innerHTML = name;


    })
    .catch(() => {
        alert("Please search for a valid city 😩");
    });




// let geolocationRequest = new XMLHttpRequest();
// geolocationRequest.open('GET', 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=49.6009216&longitude=34.5014272&localityLanguage=en')
// geolocationRequest.responseType = 'text';
//
// console.log(geolocationRequest);






// 49.6009216
// 34.5014272
// const API = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${}&localityLanguage=en`;
