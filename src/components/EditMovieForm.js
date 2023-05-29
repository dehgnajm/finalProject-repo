import React, { useState } from 'react';


const EditMovieForm = ({ movie, handleUpdateMovie }) => {
    const [updatedMovie, setUpdatedMovie] = useState(movie);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleUpdateMovie(updatedMovie);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {}
        {}
        <input
          type='text'
          value={updatedMovie.Title}
          onChange={(e) => setUpdatedMovie({ ...updatedMovie, Title: e.target.value })}
        />
        {}
        <button type='submit'>Update</button>
      </form>
    );
  };

  export default EditMovieForm; 