document.getElementById("getCityName").addEventListener("click", getPrayerTime)

const shubuh = document.getElementById("shubuh");
const dzuhur = document.getElementById("dzuhur");
const ashar = document.getElementById("ashar");
const maghrib = document.getElementById("maghrib");
const isya = document.getElementById("isya");
const city = document.getElementById("city");

function getPrayerTime(e) {
    e.preventDefault();
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