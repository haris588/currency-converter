const API_KEY = '0c707e58c90fe6be18d0a972'

const currencyFromInput = document.getElementById('currencyFrom')
const currencyToInput = document.getElementById('currencyTo')
const currencyAmountInput = document.getElementById('currencyAmountInputFrom')
const resultContainer = document.querySelector('.resultContainer')
const inputBox = Array.from(document.querySelectorAll('.inputBox'))
const form = document.querySelector('.form')
const btnConvert = document.getElementById('btnConvert')

let currencyFrom,
    currencyTo,
    currencyAmount

const exchange = async () => {
    const api = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currencyFrom}`
    const promise = await fetch(api)
    const apiData = await promise.json()
    const { conversion_rates } = apiData

    const convert = currencyAmount * conversion_rates[currencyTo]

    const p = document.createElement('p')
    p.classList.add('convertedAmount')
    p.innerHTML = `${currencyAmount} ${currencyFrom} = ${convert.toFixed(2)} ${currencyTo}`

    reset()

    resultContainer.appendChild(p)
}

const error = () => {
    inputBox.forEach(input => {
        if (!input.value) {
            input.classList.add('error')
        } else {
            input.classList.remove('error')
        }
    })
}

const reset = () => {
    currencyFromInput.value = ""
    currencyToInput.value = ""
    currencyAmountInput.value = ""
    currencyFrom = ""
    currencyTo = ""
    currencyAmount = ""
}

currencyFromInput.addEventListener('change', (e) => {
    currencyFrom = e.target.value.toUpperCase()
})

currencyToInput.addEventListener('change', (e) => {
    currencyTo = e.target.value.toUpperCase()
})

currencyAmountInput.addEventListener('change', (e) => {
    currencyAmount = Number(e.target.value).toFixed(2)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    exchange()
})

btnConvert.addEventListener('click', error)