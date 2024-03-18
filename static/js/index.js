let submitButton = document.querySelector('.form__submit');
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    let icon = document.querySelector('.form__submit i');
    let formInput = document.querySelector('.form__input');

    toggleClassList(icon)

    let city = formInput.value;
    body = new FormData();
    body.append("city", city);

    let response = fetch("/weather/", {
        method: "POST",
        body: body
    })
    .then(response => response.json())
    .then(json => {
        let wrapper = document.querySelector('.background');
        let location = document.querySelector('.weather__location');
        let temperature = document.querySelector('.weather__temp');

        let locationName = json.location.name;
        let weather = json.weather;
        
        if (weather.status == 'Clear') {
            wrapper.style.backgroundImage = "url('static/img/clear.jpg')";
        } else if (weather.status == 'Clouds') {
            wrapper.style.backgroundImage = "url('static/img/clouds.jpg')";
        } else if (weather.status == 'Rain') {
            wrapper.style.backgroundImage = "url('static/img/rain.jpg')";
        } else if (weather.status == 'Snow') {
            wrapper.style.backgroundImage = "url('static/img/snow.jpg')";
        }

        location.innerHTML = json.location.name;
        let gradus = json.weather.temperature.temp - 273.15;
        temperature.innerHTML = `${gradus.toFixed(2)}°C`;

    }).finally(() => {
        toggleClassList(icon)
    });

});

function toggleClassList(icon) {
    let classList = ['bx-search', 'bx-loader-alt', 'bx-spin'];
    for (let cls of classList) {
        icon.classList.toggle(cls);
    }
}