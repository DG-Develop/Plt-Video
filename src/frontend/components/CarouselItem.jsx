import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { favoriteMovie, dropFavorite } from "../actions";
import '../assets/styles/components/CarouselItem.scss';
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png'
import removeIcon from '../assets/static/remove-icon.png'

const CarouselItem = (props) => {
  const { id, _id, cover, description, title, year, contentRating, source, duration, tags, isList,myList, user, userMovieId } = props;
  const handleSetFavorite = () => {
    const exist = myList.find(item => item.id === id)

    if (!exist) {
      props.favoriteMovie(user.id, {
        id, _id, cover, title, year, contentRating,
        duration, source, tags, description
      });
    }
  }
  const handleDeleteFavorite = (userMovieId) => {
    props.dropFavorite(userMovieId);
  }
  return (
    <div className="carousel-item">
      <img className="carousel-item__img" src={cover} alt={title} />
      <div className="carousel-item__details">
        <div>
          <Link to={`/player/${id}`}>
            <img className="carousel-item__details--img" src={playIcon} alt="Play Icon" />
          </Link>
          {!isList ? (
            <img
              className="carousel-item__details--img"
              src={plusIcon}
              alt="Reproducir"
              onClick={handleSetFavorite}
            />
          ) :
            (
              <img
                className="carousel-item__details--img"
                src={removeIcon}
                alt="Quitar de mi lista"
                onClick={() => handleDeleteFavorite(userMovieId)}
              />
            )
          }
        </div>
        <p className="carousel-item__details--title">{title}</p>
        <p className="carousel-item__details--subtitle">{`${year} ${contentRating} ${duration}`}</p>
      </div>
    </div>
  );
}

CarouselItem.propTypes = {
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
  cover: PropTypes.string,
  dropFavorite: PropTypes.func,
  favoriteMovie: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    user: state.user,
  };
};

const mapDispatchToProps = {
  favoriteMovie,
  dropFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselItem);

