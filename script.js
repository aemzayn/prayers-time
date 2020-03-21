document.getElementById("getCityName").addEventListener("click", getPrayerTime)

const shubuh = document.getElementById("shubuh");
const dzuhur = document.getElementById("dzuhur");
const ashar = document.getElementById("ashar");
const maghrib = document.getElementById("maghrib");
const isya = document.getElementById("isya");
const city = document.getElementById("city");

window.onload = start();

function start() {
    getDate();
    getTime();
}

function getPrayerTime(e) {
    var cityName = document.getElementById("cityName").value;

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = `https://muslimsalat.com/${cityName}/daily.json?key=b9726a045c3c49d533819301b792c9d5`;

    fetch(proxyUrl + targetUrl).then(response => response.json())
        .then(data => {
            const shubuhTime = data.items[0].fajr;
            const dzuhurTime = data.items[0].dhuhr;
            const asharTime = data.items[0].asr;
            const maghribTime = data.items[0].maghrib;
            const isyaTime = data.items[0].isha;
            const date = data.items[0].date_for;

            if (cityName) {
                city.innerHTML = `Prayer Times in ${titleCase(cityName)}`;
                shubuh.innerHTML = shubuhTime;
                dzuhur.innerHTML = dzuhurTime;
                ashar.innerHTML = asharTime;
                maghrib.innerHTML = maghribTime;
                isya.innerHTML = isyaTime;
            } else if (shubuhTime === undefined) {
                city.innerHTML = "Belum masukin kota lu"
            }
        })
        .catch(err => console.log(err))
}


function titleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

function getDate() {
    const today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[today.getDay()];
    const date = `${day}, ${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    document.getElementById("date").textContent = date;
}

function getTime() {
    setInterval(() => {
        const hour = new Date().getHours();
        const minute = String(new Date().getMinutes());
        const second = new Date().getSeconds();
        document.getElementById("time").textContent = `${hour}:${minute}:${second}`
    }, 1000);
}