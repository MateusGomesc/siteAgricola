//Função que recebe os dados da API
const getWeatherData = async (lat, lon, key) => {
    //URL da api
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=pt_br&units=metric`
    
    //Requisição http
    const resultado = await fetch(apiWeatherURL)
    
    //transforma dados para json
    const data = await resultado.json()

    return data
}

//função de sucesso da geolocalização
function getPositionSucess(position){
    //dados para alimentar api
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const apiKey = '9672b492ac6556c86acdac8248f2dfc0'

    //Função para colocar dados da API no documento
    const showWeatherData = async () => {
        var dados = await getWeatherData(latitude, longitude, apiKey)
        
        //Recebe tags

        //muda conteúdo
        
    }

    showWeatherData()
}

//função de erro da geolocalização
function getPositionError(error){
    
}

//função da geolocalização
navigator.geolocation.getCurrentPosition(getPositionSucess, getPositionError)