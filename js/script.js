const inputCity = document.querySelector('#searchInput')
const btnSearch = document.querySelector('#btn-search')
const tempElement = document.querySelector('#temp-element span')
const tempMinElement = document.querySelector('#temp-min-element span')
const tempMaxElement = document.querySelector('#temp-max-element span')
const windSpeedElement = document.querySelector('#wind-speed span')
const umidityElement = document.querySelector('#humidity span')
const rainElement = document.querySelector('#rain span')
const nameCityElement = document.querySelector('#name-city')
const nameStateElement = document.querySelector('#country-city')


const apikey = '07187a0404001db9ea0153b19efb1d22'


btnSearch.addEventListener('click', (e) => {
    e.preventDefault();

    const city = inputCity.value
    
    validInput(city)
})

function validInput(city){
    if(city == ''){
        alert('Insira nome de alguma cidade')
        return
    }

    getDataGeolocationApi(city)
}

async function getDataGeolocationApi(city) {
    const apiGeolocationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`

    const dataApi = await fetch(apiGeolocationURL)
    .then(data => data.json())
    .catch(e => alert('Perca de conexão com servidor', e))

    if(dataApi == ''){
        alert('Cidade não encontrada')
        return
    }

     const dataCity = dataApi[0]

     getDataWeather(dataCity)

}


const getDataWeather = async(dataCity) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${dataCity.lat}&lon=${dataCity.lon}&units=metric&appid=${apikey}&lang=pt_br`

    const dataApi = await fetch(apiWeatherURL)
    const dataWeatherCity = await dataApi.json()

   showWatherDataApi(dataWeatherCity, dataCity)
}

const showWatherDataApi = async(dataWeatherCity, dataCity) => {
    console.log(dataWeatherCity, dataCity)

    nameCityElement.innerText = dataCity.name
    nameStateElement.innerText = dataCity.country
    tempElement.innerText = parseInt(dataWeatherCity.main.temp)
    tempMaxElement.innerText = parseInt(dataWeatherCity.main.temp_max)
    tempMinElement.innerText = parseInt(dataWeatherCity.main.temp_min)
    windSpeedElement.innerText = dataWeatherCity.wind.speed
    umidityElement.innerText = dataWeatherCity.main.humidity
}

   

