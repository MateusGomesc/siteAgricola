//Função que recebe os dados da API
const getWeatherData = async (lat, lon, key) => {
    //URL da api
    const apiWeatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=pt_br&units=metric`
    
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
        let icon = document.getElementById('iconTempo')
        let temperatura = document.getElementById('temp')
        let cidade = document.getElementById('cidade')
        let sensacaoTermica = document.getElementById('sensacaoTermica')
        let maxMin = document.getElementById('maxMin')
        let msg = document.getElementById('msg')

        //muda conteúdo
        icon.setAttribute('src', `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`)
        temperatura.innerHTML = `${parseInt(dados.main.temp)} °C`
        cidade.innerHTML = dados.name
        sensacaoTermica.innerHTML = `Sensação Térmica: ${parseInt(dados.main.feels_like)} °C`
        maxMin.innerHTML = `${parseInt(dados.main.temp_max)}° / ${parseInt(dados.main.temp_min)}°`

        tempAtual = parseInt(dados.main.temp)
        if(tempAtual <= 20){
            msg.innerHTML = 'Que frio produtor rural!🥶 Projeta sua lavoura com os novos produtos da SjNatur!'
        }
        else if(tempAtual >=21 && tempAtual <=30){
            msg.innerHTML = 'Tá tranquilo, tá favorável!😎 O Clima está ótimo pra comprar os novos produtos SjNatur!'
        }
        else if(tempAtual >=31){
            msg.innerHTML = 'O calor não está de brincadeira!🥵 Proteja sua lavoura com a nova linha SjNatur!'
        }
    }

    showWeatherData()
}

//função de erro da geolocalização
function getPositionError(error){
    //recebe tags
    let cidade = document.getElementById('cidade')
    let sensacaoTermica = document.getElementById('sensacaoTermica')

    //muda conteudo
    cidade.innerHTML = 'Não encontrado...'
    sensacaoTermica = error
}

//função da geolocalização
navigator.geolocation.getCurrentPosition(getPositionSucess, getPositionError)
