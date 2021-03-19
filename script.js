const currencyFromInput = document.getElementById('currencyFrom')
const currencyToInput = document.getElementById('currencyTo')
const currencyAmountFromInput = document.getElementById('currencyAmountInputFrom')
const btnConvert = document.getElementById('btnConvert')
const resultContainer = document.querySelector('.resultContainer')

let currencyFrom,
    currencyTo,
    currencyAmountFrom

const exchange = async () => {
    const api = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currencyFrom}` //<---- currency FROM

    const promise = await fetch(api)
    const apiData = await promise.json()
    const { conversion_rates } = apiData
    // currency FROM * coversion_rates.TO

    const convert = currencyAmountFrom * conversion_rates[currencyTo]

    const p = document.createElement('p')
    p.classList.add('convertedAmount')
    p.innerHTML = `${currencyAmountFrom} ${currencyFrom} = ${convert.toFixed(2)} ${currencyTo}`
    return resultContainer.appendChild(p)
}

currencyFromInput.addEventListener('change', (e) => {
    currencyFrom = e.target.value.toUpperCase()
})

currencyToInput.addEventListener('change', (e) => {
    currencyTo = e.target.value.toUpperCase()
})

currencyAmountFromInput.addEventListener('change', (e) => {
    currencyAmountFrom = e.target.value
})

btnConvert.addEventListener('click', exchange)

