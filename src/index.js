import './style.css';

async function getWeatherData(location){
    const apiKey = '6430268cfcd046f1b4183458262304';
    const waitStatus= document.getElementById('weather-card');

    try {
        if(waitStatus) {
            waitStatus.classList.add('loading')
        };
        
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`,
            {mode:'cors'}
        );

        if(!response.ok){
            throw new Error('City not found')
        }

        const weatherData = await response.json();
        const cleanData = processData(weatherData);
        console.log(cleanData);
        displayData(cleanData);

    } catch(error){
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = "Ups! City not found. Try again."
        errorDiv.classList.add('active');
        
    } finally {
       if(waitStatus) {
        waitStatus.classList.remove('loading')
        };
    }
}
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const errorDiv = document.getElementById('error-message');
    errorDiv.classList.remove('active');

    const city = input.value;
    if(city){
        getWeatherData(city);
        input.value = '';
    }
})

function processData(weatherData){
    const myData = {
        city: weatherData.location.name,
        condition:weatherData.current.condition.text,
        tempC: weatherData.current.temp_c,
        tempF: weatherData.current.temp_f,
        precipitation:weatherData.current.precip_mm,
        humidity:weatherData.current.humidity,
    }
    return myData
}

function displayData(cleanData){
    const cityDisplay = document.getElementById('city-name');
    const conditionDisplay = document.getElementById('weather-condition');
    const tempDisplay = document.getElementById('temperature');
    const precipDisplay = document.getElementById('precipitation');
    const humidityDisplay = document.getElementById('humidity');

    tempDisplay.dataset.c=cleanData.tempC;
    tempDisplay.dataset.f = cleanData.tempF;

    cityDisplay.textContent = cleanData.city;
    conditionDisplay.textContent = cleanData.condition;
    tempDisplay.textContent = `${cleanData.tempC} ºC`;
    precipDisplay.textContent = `Rain: ${cleanData.precipitation} mm`;
    humidityDisplay.textContent = `Humidity: ${cleanData.humidity} %`;
    
    document.body.className = cleanData.condition.toLowerCase();
}

const unitBtn = document.getElementById('unit-btn');
const tempDisplay = document.getElementById('temperature');

unitBtn.addEventListener('click', ()=>{
    if (!tempDisplay.dataset.c) return;

    const isCelsius = tempDisplay.textContent.includes('ºC');

    tempDisplay.textContent = isCelsius
        ? `${tempDisplay.dataset.f} ºF`
        : `${tempDisplay.dataset.c} ºC`
})

getWeatherData('Madrid');