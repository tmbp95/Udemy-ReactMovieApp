import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../../config';
import FontAwesome from 'react-fontawesome';
import HeroImage from '../HeroImage/HeroImage';
import MovieThumb from '../MovieThumb/MovieThumb';
import './MovieInfo.css';

const MovieInfo = (props) => {
    return (
        <div className="rmdb-movieinfo"
            style={{
                background: 
                    `linear-gradient(to bottom, rgba(0,0,0,0)
                    39%, rgba(0,0,0,0)
                    41%, rgba(0,0,0,0.65)
                    100%),
                    url('${props.imageBG}'), #1c1c1c`
            }}
        >
            <div className="rmdb-movieinfo-content">
                <img src={props.image} alt="moviethumb" className="rmdb-movieinfo-thumb" />

            </div>
        </div> 
    )
}

export default MovieInfo;