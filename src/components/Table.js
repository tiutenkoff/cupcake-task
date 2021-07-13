import { useContext, useEffect, useState } from 'react'
import { tableContext } from '../context/tableContext'
import { RUB, USD, EUR, CUPCAKE } from '../types'

export const Table = ({ CurrencyOne, CurrencyTwo }) => {
    const { createTable, lessCheck } = useContext(tableContext)


    if (!(CurrencyOne && CurrencyTwo)) {
        return (
            <tr>
                <th>Pair name/market</th>
                <th>First</th>
                <th>Second</th>
                <th>Third</th>
            </tr>
        )
    }
    return (
        <tr >
            <th>{`${CurrencyOne}/${CurrencyTwo}`}</th>
            {
                createTable(CurrencyOne, CurrencyTwo).map((row, i) => {

                    

                    return (
                    row === lessCheck()
                        ? <td className="least" key={i}>{row.toFixed(3)}</td>
                        : <td key={i}>{row.toFixed(3)}</td>
                    )
                })
            }
        </tr>
    )
}
