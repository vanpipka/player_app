import React, { useState, useEffect } from "react";
import apiClient from "../../soundMusic";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import "./library.css";
import { useNavigate } from "react-router-dom";

export default function Library() {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    apiClient.get("playlists").then(function (response) {
      setPlaylists(response.data.items);
    });
  }, []);

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate("/player", { state: { id: id } });
  };

  return (
    <div className="screen-container">
      <div className="library-body">
        {playlists?.map((playlist) => (
          <div
            className="playlist-card"
            key={playlist.id}
            onClick={() => playPlaylist(playlist.url)}
          >
            <img
              src={playlist.img}
              className="playlist-image"
              alt="Playlist-Art"
            />
            <p className="playlist-title">{playlist.title}</p>
            <div className="playlist-fade">
              <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
