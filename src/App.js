import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { tableContext } from './context/tableContext'
import { Table } from './components/Table'
import { RUB, USD, EUR, CUPCAKE } from './types'
import { Loader } from './components/Loader'
 
function App() {
  const [first, setFirst] = useState([])
  const [second, setSecond] = useState([])
  const [third, setThird] = useState([])
  const [cupcake, setCupcake] = useState(78)
  const [loading, setLoading] = useState(true)

  const valveOptions = [
    ['', ''],
    [RUB, CUPCAKE],
    [USD, CUPCAKE],
    [EUR, CUPCAKE],
    [RUB, USD],
    [RUB, EUR],
    [EUR, USD],
  ]

  useEffect(() => {
    setLoading(true)
    primaryLoad()
    subscribe()
  }, [])

  function getRandomNumber(min, max) {
    return new Promise(resolve => resolve(Math.random() * (max - min) + min));
  }

  
  

  function lessCheck() {
    return Math.min(...createTable(RUB, CUPCAKE),
    ...createTable(USD, CUPCAKE),
    ...createTable(EUR, CUPCAKE),
    ...createTable(RUB, USD),
    ...createTable(RUB, EUR),
    ...createTable(EUR, USD),
    )
  }

  async function primaryLoad() {
    try {
      const [getFirst, getSecond, getThird, randCupcake] = await Promise.all([
        axios.get('/first'),
        axios.get('/second'),
        axios.get('/third'),
        getRandomNumber(50, 100)
      ])

      setLoading(false)
      setFirst([Object.keys(getFirst.data.rates), Object.values(getFirst.data.rates)])
      setSecond([Object.keys(getSecond.data.rates), Object.values(getSecond.data.rates)])
      setThird([Object.keys(getThird.data.rates), Object.values(getThird.data.rates)])
      setCupcake(randCupcake)
      
    } catch (error) {
      console.error('Не удалось получить данные с сервера', error)
    }
  }

  async function subscribe() {
    try {
      const [getFirst, getSecond, getThird, randCupcake] = await Promise.all([
        axios.get('/first/poll'),
        axios.get('/second/poll'),
        axios.get('/third/poll'),
        getRandomNumber(50, 100)
      ])

      setLoading(false)
      setFirst([Object.keys(getFirst.data.rates), Object.values(getFirst.data.rates)])
      setSecond([Object.keys(getSecond.data.rates), Object.values(getSecond.data.rates)])
      setThird([Object.keys(getThird.data.rates), Object.values(getThird.data.rates)])
      setCupcake(randCupcake)
      
      await subscribe()
    } catch (error) {
      console.error('Не удалось получить данные с сервера', error)
      setTimeout(() => {
        subscribe()
      }, 500)
    }
  }

  function createTable(val1, val2){
    let firstOne = 0,
      firstTwo = 0
    let secondOne = 0,
      secondTwo = 0
    let thirdOne = 0,
      thirdTwo = 0
    
    for (let i = 0; i < first.length; i++){
      for (let j = 0; j < first[i].length; j++){
        
        if (first[i][j] === val1) {
          firstOne = first[i + 1][j]
        }
        else if (first[i][j] === val2) {
          firstTwo = first[i + 1][j]
        }
      }
    }

    if (firstTwo == 0) {
      firstTwo = cupcake
    }

    for (let i = 0; i < second.length; i++){
      for (let j = 0; j < second[i].length; j++){

        if (second[i][j] === val1) {
          secondOne = second[i + 1][j]
        }
        else if (second[i][j] === val2) {
          secondTwo = second[i + 1][j]
        }
      }
    }

    if (secondTwo == 0) {
      secondTwo = cupcake
    }

    for (let i = 0; i < third.length; i++) {
      for (let j = 0; j < third[i].length; j++) {

        if (third[i][j] === val1) {
          thirdOne = third[i + 1][j]
        }
        else if (third[i][j] === val2) {
          thirdTwo = third[i + 1][j]
        }
      }
    }
    
    if (thirdTwo == 0) {
      thirdTwo = cupcake
    }

    return [
      firstOne / firstTwo,
      secondOne / secondTwo,
      thirdOne / thirdTwo
    ]
  }  
  
  
  return (
    <tableContext.Provider value={{
      createTable, lessCheck
    }}>
        <div className="wrapper">
        { loading
          ? <Loader />
          : <table>
              <tbody>
                {
                  valveOptions.map((row, index) => {
                    return <Table key={index} CurrencyOne={row[0]} CurrencyTwo={row[1]} />
                  })
                }
              </tbody>
            </table>
          }
        </div>
      </tableContext.Provider>
  );
}

export default App;
