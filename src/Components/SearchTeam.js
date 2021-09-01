import React from 'react';

function SearchTeam(props) {
    return (
        <div className="input-group my-3">
         <input type="text" className="form-control" placeholder={(props.isTeam) ? "Введите название команды" : '' || (props.isLeague) ? "Введите название лиги" : '' } onChange={props.onChange}/>
        </div>
    )
}
export default SearchTeam;
