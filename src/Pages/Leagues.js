import React, {Component} from 'react'
import SearchTeam from "../Components/SearchTeam";
import {Link} from "react-router-dom";
import {fetchUrl,apiKey} from "../FetchElement";

class Leagues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            competitions: [],
            value: '',
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        fetch(`${fetchUrl}/competitions`, apiKey)
            .then(response => response.json())
            .then((result) => {
                    this.setState({
                        competitions: result.competitions
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                })

    }

    handleChange(e) {
        e.preventDefault();
        this.setState( {
          value: e.target.value
        })
    }

    render() {
        const filteredCompetitions = this.state.competitions.filter(competition => {
            return competition.name.toLowerCase().includes(this.state.value.toLowerCase())
        })
        const {error} = this.state;
        if (error) {
            return <div className="d-flex justify-content-center mt-3"> Произошла ошибка, попробуйте обновить страницу</div>;
        } else {
            return (
                <div>
                    <SearchTeam onChange={this.handleChange} isLeague={true}/>
                    <div className="d-flex flex-wrap">
                        {filteredCompetitions.map(competition => (
                            <div key={competition.id} className="my-1 col-lg-3 col-sm-6 col-md-4 col-12 d-flex align-items-center">
                                <img width="80px" height="80px"
                                     src={competition.emblemUrl || 'https://moi-raskraski.ru/images/raskraski/dlja-malenkih/kubok/moi-raskraski-kubok-4.jpg'}
                                     alt=''/>
                                <Link  className="text-success text-decoration-none" to={`/leagues/${competition.id}`}> {competition.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    }
}
export default Leagues;