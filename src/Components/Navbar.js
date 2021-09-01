import React from "react";
import {NavLink} from "react-router-dom";

function Navbar() {
    return (
                <nav className="navbar navbar-dark navbar-expand bg-success">
                    <div className="navbar-brand ms-3">
                        SoccerStat
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/teams" >
                                Команды
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/leagues">
                                Лиги
                            </NavLink>
                        </li>
                    </ul>
                </nav>
    )
}

export default Navbar;