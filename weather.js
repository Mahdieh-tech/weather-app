const getLoc = async () => {

    const url = 'http://ip-api.com/json/?fields=status,country,city,lat,lon,timezone';

    const response = await fetch(url);
    const data = await response.json(); // FIXED: added await

    return data;
}

const getWeather = async (lat, lon) => {
    api = 'f0894defae7c5584798f8812232a40c2';

    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;

    const response = await fetch(url);
    const data = await response.json(); // FIXED: added await

    return data;
}

function getIcon(weMain){
    let icon;
    switch (weMain) {
        case 'Thunderstorm':
            icon = 'sun.jpeg';
            break;
        case 'Drizzle':
            icon = 'sun.jpeg';
            break;
        case 'Rain':
            icon = 'sun.jpeg';
            break;
        case 'Snow':
            icon = 'sun.jpeg';
            break;
        case 'Clear':
            const DayOrNight = getDayOrNight();
            icon = 'sun.jpeg';
            break;
        case 'Clouds':
            icon = 'sun.jpeg';
            break;
        case 'Atmosphere':
            icon = 'sun.jpeg';
            break;
        default:
            icon = 'sun.jpeg';
            break;
    }
    return icon;
}

function getDayOrNight() {
    let DayOrNight;
    var d = new Date();

    const hour = d.getHours();

    if (hour >= 6 && hour <= 19) {
        DayOrNight = 'Day';
    } else {
        DayOrNight = 'Night';
    }

    return DayOrNight;
}

function getTemp(weTemp){
    const k = weTemp;
    const f = (k - 273.15) * 9/5 + 32;
    const c = k - 273.15;
    return temp = {kel:Math.floor(k), far:Math.floor(f), can:Math.floor(c)};
}

const loti = document.querySelector('.timezone');
let icon = document.querySelector('.icon');
const dese = document.querySelector('.degree-section');
const deg = document.querySelector('.degree-section h2');
const unit = document.querySelector('.degree-section span');

const tede = document.querySelector('.temperature-description');

window.addEventListener('load', function(){
    getLoc()
        .then(locData => {
            const timeZone = locData.timezone;
            loti.textContent = timeZone;
            getWeather(locData.lat, locData.lon)
                .then(weData => {
                    const weTemp = weData.main.temp;
                    const weMain = weData.weather[0].main;
                    const weDes = weData.weather[0].description;

                    const iconName = getIcon(weMain);
                    icon.innerHTML = `<img src='icons/${iconName}'></img>`;

                    deg.textContent = Math.floor(weTemp);
                    unit.textContent = 'K';
                    dese.addEventListener('click', function(e){
                        if(unit.textContent == 'K'){
                            deg.textContent = getTemp(weTemp).far;
                            unit.textContent = 'F';
                        } 
                        else if(unit.textContent == 'F'){
                            deg.textContent = getTemp(weTemp).can;
                            unit.textContent = 'C';
                        }
                        else{
                            deg.textContent = getTemp(weTemp).kel;
                            unit.textContent = 'K';
                        }
                    })
                    tede.textContent = weDes;
                    console.log(weTemp, weMain, weDes);
                })
        })
})