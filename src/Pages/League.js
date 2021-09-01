import React, {useEffect, useState} from "react";
import {fetchUrl,apiKey} from "../FetchElement";
import DatePicker from "react-datepicker";
import MatchTable from "../Components/MatchTable";

function League({match}) {

    const [league, setLeague] = useState({})
    const [error, setError] = useState(null)
    const [matches, setMatches] = useState([])
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const leagueId = match.params.competitionId
    useEffect(() => {
        fetch(`${fetchUrl}/competitions/${leagueId}`, apiKey)
            .then(data => data.json())
            .then(result => {
                if (result.errorCode) {
                    setError(result)
                } else {
                    setLeague(result)
                }
            })
    }, [])

    useEffect( () => {
        fetch( `${fetchUrl}/competitions/${leagueId}/matches`, apiKey)
            .then(data =>data.json())
            .then(result => setMatches(result.matches))
    }, [])
    const applyFilter = () => {
        fetch(`${fetchUrl}/competitions/${leagueId}/matches?dateFrom=${startDate?.toISOString()?.slice(0, 10)}&dateTo=${endDate?.toISOString()?.slice(0, 10)}`, apiKey)
            .then(data => data.json())
            .then(result => {
                setMatches(result.matches)
            })
    }

    return (
        (error) ?
            <div className="d-flex justify-content-center mt-5">
                <h1>Данные по этой лиге отсутствуют</h1>
            </div> :
            <div className="mt-5">
                <div className="d-flex justify-content-center"><h1>{league.name}</h1></div>
                <div><img className= "img-thumbnail w-25"
                    src={league.emblemUrl || 'https://moi-raskraski.ru/images/raskraski/dlja-malenkih/kubok/moi-raskraski-kubok-4.jpg' } alt={'Иконка лиги'}/>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="d-flex"><DatePicker className="text-center form-control" selected={startDate}
                                                        onChange={(date) => setStartDate(date)}/></div>
                    <div className="d-flex mx-4"><DatePicker className="text-center form-control" selected={endDate}
                                                             onChange={(date) => setEndDate(date)}/></div>
                    <button onClick={applyFilter} className="btn btn-success">Применить</button>
                </div>
                <MatchTable matches={matches}/>
            </div>

    )


}

export default League;