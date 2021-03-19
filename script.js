const currencyFromInput = document.getElementById('currencyFrom')
const currencyToInput = document.getElementById('currencyTo')
const currencyAmountInput = document.getElementById('currencyAmountInputFrom')
const btnConvert = document.getElementById('btnConvert')
const resultContainer = document.querySelector('.resultContainer')

let currencyFrom,
    currencyTo,
    currencyAmount

const exchange = async () => {
    const api = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currencyFrom}` //<---- currency FROM

    const promise = await fetch(api)
    const apiData = await promise.json()
    const { conversion_rates } = apiData
    // currency FROM * coversion_rates.TO

    const convert = currencyAmount * conversion_rates[currencyTo]

    const p = document.createElement('p')
    p.classList.add('convertedAmount')
    p.innerHTML = `${currencyAmount} ${currencyFrom} = ${convert.toFixed(2)} ${currencyTo}`

    reset()

    return resultContainer.appendChild(p)
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
    currencyAmount = e.target.value
})

btnConvert.addEventListener('click', exchange)

