const inputCity = document.querySelector('#searchInput')
const btnSearch = document.querySelector('#form-input-location button')

btnSearch.onclick = () =>{
    console.log(inputCity.value)
}

const baseURL = 'http://dataservice.accuweather.com/locations/v1/cities/search'
const apikey = '07187a0404001db9ea0153b19efb1d22'


class ApiSearchCity{
    static search(nameCity){
        const endpoint = `http://dataservice.accuweather.com/locations/v1/cities/search/locations/v1/cities/search?
        apikey=${apikey}&q=${searchLocation}&language=pt-BR`

        return fetch(endpoint).then(data => data.json())

        
    }
}
