import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs"
import { BsArrowRightShort } from "react-icons/bs"
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"
import "./player.css";
import apiClient from "../../soundMusic";
import Queue from "../../components/queue"

 export default function Player() {

  const location = useLocation();
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});

  // references
  const audioPlayer = useRef({});   // reference our audio component
  const progressBar = useRef({});   // reference our progress bar
  const animationRef = useRef({});  // reference the animation

  useEffect(() => {
    console.log("location.state");
    if (location.state) {
      apiClient
        .get("/tracks" + location.state?.id)
        .then((res) => {
          setTracks(res.data.data);
          setCurrentTrack(res.data.data[0]);
        });
    }
  }, [location.state]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changeTrack = (track) => {
    setCurrentTrack(track);
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value - 30);
    changeRange();
  }

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 30);
    changeRange();
  }

  const handleMetadata = () => {
    console.log('change Track');

    //
    const prevValue = isPlaying;

    if (prevValue) {

      setIsPlaying(!prevValue);
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }

    //
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;

    if (prevValue) {
      setIsPlaying(prevValue);
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
  }

  if (tracks.length == 0) {
    console.log(1);
    return (<div className="audioPlayer"></div>);
  }else{
    return (
        <div style={{width: "100%"}}>

          <Queue tracks={tracks} changeTrack={changeTrack} />

          <div className="audioPlayer">

            <audio ref={audioPlayer} src={currentTrack.url} preload="metadata" onLoadedMetadata={handleMetadata}></audio>
            <button className="forwardBackward" onClick={backThirty}><BsArrowLeftShort /> 30</button>
            <button onClick={togglePlayPause} className="playPause">
              {isPlaying ? <FaPause /> : <FaPlay className="styles.play" />}
            </button>
            <button className="forwardBackward" onClick={forwardThirty}>30 <BsArrowRightShort /></button>

            {/* current time */}
            <div className="currentTime">{calculateTime(currentTime)}</div>

            {/* progress bar */}
            <div>
              <input type="range" className="progressBar" defaultValue="0" ref={progressBar} onChange={changeRange} />
            </div>

            {/* duration */}
            <div className="duration">{(duration && !isNaN(duration)) && calculateTime(duration)}</div>

            {/* track name */}
            <p>{currentTrack.title}</p>
          </div>
        </div>
    )
  }
}
