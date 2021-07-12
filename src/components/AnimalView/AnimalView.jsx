import React from 'react';

import './AnimalView.css';

function _calculateAge(birthday) { 
    var diffInMillisecond = new Date().valueOf() - birthday.valueOf();
    var year_age = Math.floor(diffInMillisecond / 31536000000);  
    let day_age = Math.floor((diffInMillisecond % 31536000000) / 86400000);
    var month_age = Math.floor(day_age/30);
    day_age = day_age - month_age*30;
    return `${year_age? (year_age +' Y') : ''} ${month_age? (month_age +' M') : ''} ${day_age? (day_age +' D') : ''}`;
}

const AnimalView = ({pet}) => {
    return <div className='animal-container'>
            <div className='animal-view'>
                <img className='pet-tile' src={pet.avatar + '/' + pet.name} alt={pet.name}></img>
                <div className='animal-detail'>
                    <span className='name'>Name: {pet.name}</span>
                    <span className='age'>Age: {_calculateAge(new Date(pet.bornAt))}</span>
                </div>
            </div>
        </div>
}

export default AnimalView;