import { useContext } from 'react'
import { tableContext } from '../context/tableContext'

export const Table = ({ CurrencyOne, CurrencyTwo }) => {
    const { createTable } = useContext(tableContext)
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
        <tr>
            <th>{`${CurrencyOne}/${CurrencyTwo}`}</th>
            {
                createTable(CurrencyOne, CurrencyTwo).map((td, i) => {
                    return <td key={i}>{td.toFixed(3)}</td>
                })
            }
        </tr>
    )
}
