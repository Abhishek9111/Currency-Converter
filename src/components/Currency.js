import React from 'react'

const currency = (props) => {
    // console.log(props)
    const {onChangeCurrency,currencyOption,selectedCurrency,amount} = props
    // console.log(selectedCurrency)
    return (
        <div>
            <input type='number' onChange={onChangeCurrency} value={amount}/>
            <select value={selectedCurrency}>
                {
                    currencyOption.map(option=>(
                        <option key={option}>{option}</option>
                    ))
                }
                
            </select>
        </div>
    )
}

export default currency
