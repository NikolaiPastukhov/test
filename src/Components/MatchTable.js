import React from "react";

function MatchTable(props) {

    return(
        <div className="d-flex mt-4">
        <table className="table">
        <thead>
        <tr>
            <th>Дата</th>
            <th>Дома</th>
            <th>Гости</th>
            <th>Счет</th>
        </tr>
        </thead>
        <tbody>
        {(!props.matches?.length)
            ?
            <tr>
                <td colSpan="4" className="text-center">У команды нет матчей</td>
            </tr>
            :
            props.matches.map(match => (
                <tr key={match.id}>
                    <td>{new Date(`${match.utcDate}`).toLocaleString()} </td>
                    <td>{match.homeTeam.name}</td>
                    <td>{match.awayTeam.name}</td>
                    <td>{(`${match.status}` === 'FINISHED') ? `${match.score.fullTime.homeTeam}/${match.score.fullTime.awayTeam}` : '- / -'}</td>
                </tr>
            ))
        }
        </tbody>
    </table>
        </div>
    )
}
export default MatchTable