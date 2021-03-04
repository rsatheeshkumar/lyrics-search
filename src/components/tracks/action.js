import axios from "axios";

import { FETCH_TRACKS } from "./types";

export const getTracks = (tracks) => ({
  type: FETCH_TRACKS,
  payload: tracks,
});

export const searchTrack = ({ searchField }) => {
  return (dispatch) => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search",
        {
          params: {
            q_artist: searchField,
            page_size: 10,
            page: 1,
            s_track_rating: "desc",
            apikey: "a1e4cd6a90272c937fa89d2b57a502c3",
          },
        }
      )
      .then((result) => {
        const tracks = result.data.message.body.track_list;
        dispatch(getTracks(tracks));
      });
  };
};

export const fetchTracks = () => {
  return (dispatch) => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get",
        {
          params: {
            chart_name: "top",
            page: 1,
            page_size: 10,
            apikey: "a1e4cd6a90272c937fa89d2b57a502c3",
          },
        }
      )
      .then((result) => {
        const tracks = result.data.message.body.track_list;

        dispatch(getTracks(tracks));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
