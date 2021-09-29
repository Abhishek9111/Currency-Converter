import React,{useState,useEffect} from 'react'
import './App.css'
import Currency from './components/Currency'

const API_KEY = 'ae9e4c55e883137611d355c7b415d671'
const BASE_URL = `http://data.fixer.io/api/latest?access_key=${API_KEY}`

// fetch(BASE_URL)
//   .then(res=> res.json())
//   .then(res=> console.log(res))

const App = ()=>{
  
  const[toCurrency,setToCurrency] = useState();
  const[fromCurrency,setFromCurrency] = useState();
  const[currencyOption,setCurrencyOption] = useState([]);
  const[amount,setAmount] = useState(1)
  const[amountInfromCurrency,setamountInfromCurrency]= useState(true)
  const[exchangeRate,setExchangeRate] = useState(1)

  let toAmount,fromAmount
  if(amountInfromCurrency){
    fromAmount = amount
    toAmount = amount*exchangeRate
  }else{
    toAmount = amount
    fromAmount = amount/exchangeRate
  }

  useEffect(()=>{
    fetch(BASE_URL)
      .then(res=> res.json())
      .then(data=>{
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOption([...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[Object.keys(data.rates)[0]])
      })
    
  },[])
  // console.log(currencyOption)
  // console.log(toCurrency,fromCurrency)


  useEffect(()=>{
    if(fromCurrency!= null && toCurrency!=null)
      fetch(`${BASE_URL}&from=${fromCurrency}&to=${toCurrency}`)
        .then(res=>res.json())
        .then(data=>setExchangeRate(data.rates[fromCurrency]))
  },[fromCurrency,toCurrency])

  function handleFromAmountChange(e){
    // console.log(e.target.value)
    setAmount(e.target.value);
    setAmountInFromCurrency(true)
  }
  function handleToAmountChange(e){
    // console.log(e.target.value)
    setAmount(e.target.value);
    setAmountInFromCurrency(false)
  }

  return(
    <>
        <h1>Converter</h1>
        <Currency  onChangeAmount={handleFromAmountChange} onChangeCurrency={e=>setFromCurrency(e.target.value)} selectedCurrency={fromCurrency} currencyOption={currencyOption} amount={amount}/>
        <div className="equal">=</div>
        <Currency  onChangeAmount={handleToAmountChange} onChangeCurrency={e=>setToCurrency(e.target.value)} selectedCurrency={toCurrency} currencyOption={currencyOption} amount={amount}/> 
    </>
  )
}

export default App