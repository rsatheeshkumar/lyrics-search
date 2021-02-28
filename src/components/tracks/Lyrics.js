import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Lyrics = (props) => {
  const [track, setTrack] = useState(null);
  const [lyrics, setLyrics] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${props.match.params.id}&apikey=a1e4cd6a90272c937fa89d2b57a502c3`
      )
      .then((res) => {
        let lyrics = res.data.message.body.lyrics;
        setLyrics({ lyrics });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${props.match.params.id}&apikey=a1e4cd6a90272c937fa89d2b57a502c3`
        );
      })
      .then((res) => {
        let track = res.data.message.body.track;
        setTrack({ track });
      })
      .catch((err) => console.log(err));
  }, [props.match.params.id]);

  if (!track) return <div>Loading...</div>;

  return (
    <React.Fragment>
      <h1>Lyrics</h1>
      <Link to="/" className="btn btn-dark btn-sm mb-4">
        Go Back
      </Link>
      <div className="card">
        <h5 className="card-header">
          {track.track.track_name}
          <span className="text-secondary">{track.track.artist_name}</span>
        </h5>
        <div className="card-body">
          <p className="card-text">{lyrics.lyrics.lyrics_body}</p>
        </div>
      </div>
      <ul className="list-group mt-3">
        <li className="list-group-item">
          <strong>Album ID</strong>: {track.track.album_id}
        </li>
        <li className="list-group-item">
          <strong>Song Genre</strong>:{" "}
          {track.track.primary_genres.music_genre_list.length === 0
            ? "NO GENRE AVAILABLE"
            : track.track.primary_genres.music_genre_list[0].music_genre
                .music_genre_name}
        </li>
        <li className="list-group-item">
          <strong>Explicit Words</strong>:{" "}
          {track.track.explicit === 0 ? "No" : "Yes"}
        </li>
        <li className="list-group-item">
          <strong>Release Date</strong>: {track.track.first_release_date}
        </li>
      </ul>
    </React.Fragment>
  );
};

export default Lyrics;
