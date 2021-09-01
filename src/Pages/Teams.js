import React, {Component} from 'react'
import SearchTeam from "../Components/SearchTeam";
import {Link} from "react-router-dom";
import {fetchUrl,apiKey} from "../FetchElement";


class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            teams: [],
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
        fetch(`${fetchUrl}/areas`, apiKey)
            .then(response => response.json())
            .then(result => result.areas.find(area => area.name === 'Europe').id)
            .then(id => fetch(`${fetchUrl}/teams?areas=${id}`, apiKey))
            .then(response => response.json())
            .then((result) => {
                    this.setState({
                        teams: result.teams
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                })

    };


    handleChange(e) {
        e.preventDefault();
        this.setState({
            value: e.target.value,
        })
    }

    render() {
        const filteredTeams = this.state.teams.filter(team => {
            return team.name.toLowerCase().includes(this.state.value.toLowerCase())
        });
        const {error} = this.state;
        if (error) {
            return <div className="d-flex justify-content-center mt-3"> Произошла ошибка, попробуйте обновить страницу</div>;
        } else {
            return (
                <div>
                    <SearchTeam onChange={this.handleChange} isTeam={true}/>
                    <div className="d-flex flex-wrap">
                        {filteredTeams.map(team => (
                            <div key={team.id} className="my-1 col-lg-3 col-sm-6 col-md-4 col-12 d-flex align-items-center">
                                <img width="80px" height="80px"
                                     src={team.crestUrl || 'http://iconwallstickers.co.uk/media/catalog/product/2-Jpegs/football-badge-wall-art-sticker-29.jpg'}
                                     alt=''/>
                                <Link className="text-success text-decoration-none ms-3" to={`/teams/${team.id}`}>{team.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    }
}

export default Teams;

