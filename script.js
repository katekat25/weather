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
    return data;
}

async function getGif(term) {
    const gifSlot = document.querySelector("img");

    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=wBRqeRe5x8K9uskZi2lOIXAMt5clY4Sf&s=${term ? term + " weather" : "ghibli"}`, {
        mode: "cors"
    });
    console.log(term + " weather");

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    gifSlot.src = data.data.images.original.url;
}

function writeInfo(data, unitGroup) {
    const infoContainer = document.getElementById("info");
    if (!infoContainer.innerHTML) {
        const info = document.createElement("div");
        info.setAttribute("style", "white-space: pre;");

        let unit;
        if (unitGroup === "us") {
            unit = "F";
        } else if (unitGroup === "metric" || unitGroup === "uk") {
            unit = "C";
        }

        info.textContent = "Current weather: " + data.currentConditions.conditions + "\r\n";
        info.textContent += "Temperature: " + data.currentConditions.temp + " °" + unit + "\r\n";
        info.textContent += "Feels like: " + data.currentConditions.feelslike + " °" + unit + "\r\n";
        info.textContent += data.currentConditions.humidity + ("% humidity\r\n");
        info.textContent += "Chance of rain: " + data.currentConditions.precipprob + "%\r\n";

        infoContainer.appendChild(info);
    }
}

let form = document.getElementById("form");
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const city = formData.get("city");
    const unitGroup = formData.get("unitGroup");

    try {
        let data = await getWeather(city, unitGroup);
        console.log(data);

        writeInfo(data, unitGroup);
        getGif(data.currentConditions.conditions);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
});

getGif();