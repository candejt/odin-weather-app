import './style.css';

async function getWeatherData(location){
    const apiKey = '6430268cfcd046f1b4183458262304';
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`,
            {mode:'cors'}
        );

        if(!response.ok){
        throw new Error('City not found')
        }

        const weatherData = await response.json();
        const cleanData = processData(weatherData);
        console.log(cleanData);

    } catch(error){
        console.error("Error!", error)
    }

}
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const city = input.value;
    getWeatherData(city)
})

function processData(weatherData){
    const myData = {
        city: weatherData.location.name,
        temp: weatherData.current.temp_c,
        condition:weatherData.current.condition.text,
        humidity:weatherData.current.humidity,
        precipitation:weatherData.current.precip_mm
    }
    return myData
}