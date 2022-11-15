import React from "react";
import "./queue.css";

export default function Queue({ tracks, changeTrack }) {
  return (
    <div className="queue-container flex">
      <div className="queue flex">
        <div className="queue-list">
          {tracks?.map((track, index) => (
            <div
              key={index + "key"}
              className="queue-item flex"
              onClick={() => changeTrack(track)}
            >
              <div class="d-track__start-column">
                <img
                  src={track?.img}
                  className="playlist-image"
                  alt="Playlist-Art"
                />
              </div>
              <p className="track-name">{track?.title}</p>
              <p>{track?.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
