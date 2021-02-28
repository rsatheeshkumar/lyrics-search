import React, { useEffect } from "react";

import { connect } from "react-redux";
import { fetchTracks, searchTrack } from "./action";
import Search from "./Search";
import Track from "./Track";

const Tracks = ({ tracks, onfetchTracks, onSearch }) => {
  // const dispatch = useDispatch();

  useEffect(() => {
    onfetchTracks();
  }, [onfetchTracks]);

  const findTrack = ({ searchField }) => {
    onSearch({ searchField });
  };
  // const findTrack = ({ searchField }) => {
  //   dispatch(searchTrack({ searchField }));
  // };

  return (
    <React.Fragment>
      <Search findTrack={findTrack} />
      <div className="row">
        {tracks.map((item) => {
          return <Track key={item.track.track_id} track={item.track} />;
        })}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks.tracks,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onfetchTracks: () => dispatch(fetchTracks()),
  onSearch: ({ searchField }) => dispatch(searchTrack({ searchField })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
