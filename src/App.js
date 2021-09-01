import React from "react";
import Teams from "./Pages/Teams"
import Leagues from "./Pages/Leagues";
import Navbar from "./Components/Navbar";
import Team from "./Pages/Team";
import League from "./Pages/League";
import {BrowserRouter, Switch, Route} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <div className="container">
                <Switch>
                    <Route path="/teams" exact component={Teams}/>
                    <Route path="/leagues" exact component={Leagues}/>
                    <Route path="/teams/:teamId"  component={Team}/>
                    <Route path="/leagues/:competitionId" component={League}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;