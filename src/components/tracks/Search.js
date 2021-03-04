import React, { useState } from "react";
import { connect } from "react-redux";

const Search = ({ findTrack }) => {
  const [searchField, setSearchField] = useState("");

  const onChange = (e) => {
    setSearchField(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    findTrack({ searchField });
  };

  return (
    <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-music" /> Search For A Song
      </h1>
      <p className="lead text-center">Get the lyrics for any song</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Song title..."
            name="userInput"
            value={searchField}
            onChange={onChange}
          />
        </div>
        <button
          className="btn btn-dark btn-lg btn-block mt-2 mb-5 w-100"
          type="submit"
        >
          Get Track Lyrics
        </button>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  tracks: state.tracks.tracks,
});

export default connect(mapStateToProps)(Search);
