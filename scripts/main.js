const KEY = "b98f2d3b7b75f9a4636f70fd1d0ab72c";

const form = document.querySelector(".list-form form");
const input = document.querySelector(".list-form input");
const msg = document.querySelector(".list-form .msg");
const list = document.querySelector(".ajax-section .cities");

function mode () {
    let el = document.body;
    let listBg = document.getElementById('window-list');
    let dataBg = document.getElementById('window-data');
    let dataInfoBg = document.getElementById('data-info');
    let dataInput = document.getElementById('data-input')

    el.classList.toggle('light-mode');
    listBg.classList.toggle('window-list_light');
    dataBg.classList.toggle('window-data_light');
    dataInfoBg.classList.toggle('data-info_light');
    dataInput.classList.toggle('data-input_light')
};

(function currTime () {
    Date.prototype.timeNow = function () {
        return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes();
    }

    let time =  new Date().timeNow();
    let currTime = document.querySelector('.data-info_time')

    return currTime.innerHTML = time;
})();

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = "" ? "kyiv" : input.value;


    const listItems = list.querySelectorAll(".ajax-section .city");
    const listItemsArray = Array.from(listItems);

    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
            let content = "";
            if (inputVal.includes(",")) {
                if (inputVal.split(",")[1].length > 2) {
                    inputVal = inputVal.split(",")[0];
                } else {
                    content = el.querySelector(".city-name").dataset.name.toLowerCase();
                }
            } else {
                //athens
                content = el.querySelector(".city-name span").textContent.toLowerCase();
            }
            return content == inputVal.toLowerCase();
        });

        if (filteredArray.length > 0) {
            msg.textContent = `You already know the weather for ${
                filteredArray[0].querySelector(".city-name span").textContent
            } ...otherwise be more specific by providing the country code as well 😉`;
            form.reset();
            input.focus();
            return;
        }
    }

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${KEY}&units=metric`;

    fetch(URL)
        .then(response => response.json())
        .then(data => {
            const { main, name, sys, weather, wind} = data;

            let currTemp = document.querySelector('.data-weather_value')
            currTemp.innerHTML = `${Math.round(main.temp)}<sup>°C</sup>`;

            let locationIcon = document.querySelector('.data-weather_icon');
            locationIcon.innerHTML = `<img class="weather_icon" src="assets/weather/${weather[0]["icon"]}.png">`;

            let locationCaption = document.querySelector('.data-weather_caption');
            locationCaption.innerHTML = `${weather[0]["description"]}`

            let currCity = document.querySelector('.data-info_city')
            currCity.innerHTML = name;

            let currCountry = document.querySelector('.data-info_country')
            currCountry.innerHTML = sys.country;

            let currWindSpeed = document.querySelector('.wind-speed')
            currWindSpeed.innerHTML = `Wind speed: ${wind.speed}`;

            let currWindDeg = document.querySelector('.wind-deg')
            currWindDeg.innerHTML = `Wind Degree Direction: ${wind.deg}`;

        })
        .catch(() => {
            msg.textContent = "Please search for a valid city 😩";
        });

    msg.textContent = "";
    form.reset();
    input.focus();
});

