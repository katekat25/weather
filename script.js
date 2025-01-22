async function getWeather(city, unitGroup) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city ? city : "chicago"}?unitGroup=${unitGroup ? unitGroup : "us"}&key=8QAPDZ3XLKRU4CK8QAH8JRN5J`, {
        mode: "cors"
    });

    if (!response.ok) {
        if (response.status === 400) {
            throw new Error("Bad Request: Please enter a valid city name.");
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();

    console.log(data);
    let currentWeather = data.currentConditions.conditions;
    console.log("Current weather: " + currentWeather);
    getGif(currentWeather);
}

async function getGif(term) {
    const gifSlot = document.querySelector("img");

    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=wBRqeRe5x8K9uskZi2lOIXAMt5clY4Sf&s=${term ? term + " weather" : "weather"}`, {
        mode: "cors"
    });
    console.log(term + " weather");

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();

    gifSlot.src = data.data.images.original.url;
}

let form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const city = formData.get("city");
    const unitGroup = formData.get("unitGroup");

    getWeather(city, unitGroup);
});