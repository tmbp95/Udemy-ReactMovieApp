import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE} from '../../config';
import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import Actor from '../elements/Actor/Actor';
import Spinner from '../elements/Spinner/Spinner';
import './Movie.css';

class Movie extends Component {
    state = {
        movie: null, 
        actors: null,
        directors: [],
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true });
        // First fetch the movie...
        const endpoint =  `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
        this.fetchItems(endpoint);
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            console.log(result)
            // in case of error ELSE set state!
            if(result.status_code){
                this.setState({ loading: false });
            }else{
                this.setState({ movie: result }, () => {
                    // ... then fetch actors in the setState callback function
                    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
                    fetch(endpoint)
                    .then(result => result.json())
                    .then(result => {
                        const directors = result.crew.filter((member) => member.job === 'Director');

                        this.setState({
                            actors: result.cast,
                            directors,
                            loading: false
                        });
                    })
                });
            }
        })
        .catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <div className="rmdb-movie">
                <Navigation />
                <MovieInfo 
                    imageBG={this.state.movie ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.movie.backdrop_path}` : './images/no_image.jpg'}
                    image={this.state.movie ? `${IMAGE_BASE_URL}${POSTER_SIZE}${this.state.movie.poster_path}` : './images/no_image.jpg'}
                />
                <MovieInfoBar />
                {/* <FourColGrid /> */}
                {this.state.loading ? <Spinner /> : null}

            </div>
        )
    }
}

export default Movie;