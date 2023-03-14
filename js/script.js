const inputCity = document.querySelector('#searchInput')
const btnSearch = document.querySelector('#btn-search')
const tempElement = document.querySelector('#temp-element span')
const tempMinElement = document.querySelector('#temp-min-element span')
const tempMaxElement = document.querySelector('#temp-max-element span')
const windSpeedElement = document.querySelector('#wind-speed span')
const umidityElement = document.querySelector('#humidity span')
const rainElement = document.querySelector('#rain span')


const apikey = '07187a0404001db9ea0153b19efb1d22'

const getDataGeolocationApi = async(city) => {
    const apiGeolocationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`

    const res = await fetch(apiGeolocationURL)
    const data = await res.json()

    const dataCity = data[0]
    getDataWeather(dataCity)
    console.log(dataCity)
}

const getDataWeather = async(dataCity) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${dataCity.lat}&lon=${dataCity.lon}&units=metric&appid=${apikey}&lang=pt_br`

    const dataApi = await fetch(apiWeatherURL)
    const data = await dataApi.json()

   showWatherDataApi(data)
}

const showWatherDataApi = async(data) => {
    console.log(data)

    tempElement.innerText = parseInt(data.main.temp)
    tempMaxElement.innerText = parseInt(data.main.temp_max)
    tempMinElement.innerText = parseInt(data.main.temp_min)
    windSpeedElement.innerText = data.wind.speed
    umidityElement.innerText = data.main.humidity
}

btnSearch.addEventListener('click', (e) => {
    e.preventDefault();

    const city = inputCity.value

    getDataGeolocationApi(city)
})



   

