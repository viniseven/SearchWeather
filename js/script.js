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
const imgWeather = document.getElementById('#image-weather')



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

    const dataApi =  await fetch(apiGeolocationURL)
    .then(data => data.json())
    .catch(e => alert('Connection server error', e))

    if(dataApi == ''){
        alert('City not found')
        return
    }

     const dataCity = dataApi[0]

     getDataWeather(dataCity)

}


 async function getDataWeather (dataCity){
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${dataCity.lat}&lon=${dataCity.lon}&units=metric&appid=${apikey}&lang=pt_br`

    const dataCityWeather = await fetch(apiWeatherURL).then(data => data.json()).catch(e => alert('Connection server error', e))

   showWatherDataApi(dataCityWeather, dataCity)
}

async function showWatherDataApi(dataCityWeather, dataCity){
    console.log(dataCityWeather)

    const { name, country } = dataCity
    const { main: { temp, temp_max, temp_min, humidity }, wind: { speed, deg }, weather: [{ main }] } = dataCityWeather

    switch(main){
        case 'Clouds':
            imgWeather.src = 'assets/cloud.svg'
            break

        case ('Clear'): 
            imgWeather.src = 'assets/sun.svg'
            break

        case ('Snow'):
            imgWeather.src = 'assets/snowflake.svg'
            break

        case('Rain'):
            imgWeather.src = 'assets/rainimg.svg'
            break

        case('Drizzle'):
            imgWeather.src = 'assets/drizzle.svg'
            break
            
        case('Thunderstorm'):
            imgWeather.src = 'assets/thunderstorm.svg'
            break
            
        default:
            imgWeather.src = ''
    }

    nameCityElement.innerText = name
    nameStateElement.innerText = country
    tempElement.innerText = parseInt(temp)
    tempMaxElement.innerText = parseInt(temp_max)
    tempMinElement.innerText = parseInt(temp_min)
    windSpeedElement.innerText = speed
    umidityElement.innerText = humidity
    rainElement.innerText = deg
}

   

