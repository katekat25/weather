async function getWeather(city, unitGroup) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city ? city : "chicago"}?unitGroup=${unitGroup ? unitGroup : "us"}&key=8QAPDZ3XLKRU4CK8QAH8JRN5J`, {
        mode: "cors"
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data = await response.json();
    console.log(data);
    console.log("Current weather: " + data.currentConditions.conditions);
}

getWeather("manila", "us");