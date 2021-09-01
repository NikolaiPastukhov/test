import React, {useEffect, useState} from "react";
import {fetchUrl, apiKey} from '../FetchElement'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import MatchTable from "../Components/MatchTable";



function Team({match}) {
    const teamId = match.params.teamId;
    const [team, setTeam] = useState({});
    const [matches, setMatches] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);



    useEffect(() => {
        fetch(`${fetchUrl}/teams/${teamId}`, apiKey)
            .then(data => data.json())
            .then(result => setTeam(result))
    }, []);
    useEffect(() => {
        fetch(`${fetchUrl}/teams/${teamId}/matches`, apiKey)
            .then(data => data.json())
            .then(result => {
                setMatches(result.matches)

            })
    }, []);

    const applyFilter = () => {
        fetch(`${fetchUrl}/teams/${teamId}/matches?dateFrom=${startDate?.toISOString()?.slice(0, 10)}&dateTo=${endDate?.toISOString()?.slice(0, 10)}`, apiKey)
            .then(data => data.json())
            .then(result => {
                setMatches(result.matches)

            })
    }


    return (
        <div className="mt-5">
            <div className="d-flex justify-content-center"><h1>{team.name}</h1></div>
            <div className="d-flex">
                <img style={{width: "250px", height: "250px" }} className="img-thumbnail"
                     src={team.crestUrl || 'http://iconwallstickers.co.uk/media/catalog/product/2-Jpegs/football-badge-wall-art-sticker-29.jpg'}
                     alt={'Иконка команды'}/>
            </div>
            <div className="d-flex justify-content-center">
                <div className="d-flex"><DatePicker  className="text-center form-control" selected={startDate}
                                                    onChange={(date) => setStartDate(date)}/></div>
                <div className="d-flex mx-4"><DatePicker className="text-center form-control" selected={endDate}
                                                         onChange={(date) => setEndDate(date)}/></div>
               <button onClick={applyFilter} className="btn btn-success">Применить</button>
            </div>
           <MatchTable matches={matches}/>
        </div>
    )
}

export default Team;