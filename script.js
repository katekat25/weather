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
    console.log("Current weather: " + data.currentConditions.conditions);
}

let form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const city = formData.get("city");
    const unitGroup = formData.get("unitGroup");

    getWeather(city, unitGroup);
});