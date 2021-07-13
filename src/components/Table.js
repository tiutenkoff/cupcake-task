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
        <tr >
            <th>{`${CurrencyOne}/${CurrencyTwo}`}</th>
            {
                createTable(CurrencyOne, CurrencyTwo).map((row, i) => {
                    const less = Math.min(...createTable(CurrencyOne, CurrencyTwo))

                    return (
                    row === less
                        ? <td className="least bsize" key={i}>{row.toFixed(3)}</td>
                        : <td className="bsize" key={i}>{row.toFixed(3)}</td>
                    )
                })
            }
        </tr>
    )
}
