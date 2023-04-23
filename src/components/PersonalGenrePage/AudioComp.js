import React, { useEffect, useState } from "react";
import styles from "./PersonalGenrePage.module.css";

export default function AudioComp({
  activeAudioElement,
  playPause,
  activeAudioIndex,
  isPlaying,
  tracks,
  setActiveAudioIndex,
  setIsPlaying,
  setShufledTracks,
  featName,
  authorName,
  authorImg,
  getIdForAudioComp,
  favourites
}) {
  const [currentTime, setCurrentTime] = useState();
  const [isRepeated, setIsRepeated] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [entered, setEntered] = useState(false);
  const [enterVolume, setEnterVolume] = useState(false);
  const [fullSongTime, setFullSongTime] = useState("");

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const handleVolumeChange = (event) => {
    const { value } = event.target;
    if (activeAudioElement) {
      activeAudioElement.volume = value / 100;
      setVolume(value / 100);
    }
    setEnterVolume(true);
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(activeAudioElement.currentTime);
    };

    if (activeAudioElement) {
      activeAudioElement.addEventListener("timeupdate", updateCurrentTime);
      return () =>
        activeAudioElement.removeEventListener("timeupdate", updateCurrentTime);
    }
  }, [activeAudioElement]);

  useEffect(() => {
    if (isRepeated && activeAudioElement) {
      activeAudioElement.loop = true;
    } else if (activeAudioElement) {
      activeAudioElement.loop = false;
    }
  }, [isRepeated, activeAudioElement]);

  useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false);
    };

    if (activeAudioElement) {
      activeAudioElement.addEventListener("ended", handleEnded);
      return () => activeAudioElement.removeEventListener("ended", handleEnded);
    }
  }, [activeAudioElement, setIsPlaying]);

  useEffect(() => {
    const handleMetadataLoaded = () => {
      if (activeAudioElement) {
        const duration = activeAudioElement.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60)
          .toString()
          .padStart(2, "0");
        setFullSongTime(`${minutes}:${seconds}`);
      }
    };

    if (activeAudioElement) {
      activeAudioElement.addEventListener(
        "loadedmetadata",
        handleMetadataLoaded
      );
      return () => {
        activeAudioElement.removeEventListener(
          "loadedmetadata",
          handleMetadataLoaded
        );
      };
    }
  }, [activeAudioElement]);

  const playShuffled = () => {
    const shuffledTracks = shuffle([...tracks]);
    setShufledTracks(shuffledTracks);
    setActiveAudioIndex(0);
    setIsPlaying(true);
  };

  const handleTimeChange = (event) => {
    const { value } = event.target;
    if (activeAudioElement) {
      activeAudioElement.currentTime =
        (value / 100) * activeAudioElement.duration;
      setCurrentTime(activeAudioElement.currentTime);
    }
  };

  const stopPreviousTrack = () => {
    if (activeAudioElement) {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
    }
  };

  const playNextTrack = () => {
    stopPreviousTrack();
    let newActiveAudioIndex = activeAudioIndex + 1;
    if (newActiveAudioIndex >= tracks.length) {
      newActiveAudioIndex = 0;
    }
    setActiveAudioIndex(newActiveAudioIndex);
    playPause(newActiveAudioIndex);
  };

  const playPrevTrack = () => {
    let newActiveAudioIndex = activeAudioIndex - 1;
    if (newActiveAudioIndex < 0) {
      newActiveAudioIndex = tracks.length - 1;
    }
    setActiveAudioIndex(newActiveAudioIndex);
    playPause(newActiveAudioIndex);
  };

  const handleRepeat = () => {
    setIsRepeated(!isRepeated);
  };
  let minutes = Math.floor(activeAudioElement?.duration / 60);
  let seconds = Math.floor(activeAudioElement?.duration % 60)
    .toString()
    .padStart(2, "0");
  let resultFullTime = minutes + ":" + seconds;

  const isFavourite = Boolean(
    favourites.find((favouriteItem) => favouriteItem?.id === getIdForAudioComp)
  );

  return (
    <>
      <div className={styles.audio_comp__box}>
        <div className={styles.audio_comp}>
          <audio controls className={styles.audio_element}></audio>
          <div className={styles.audio_title_box}>
            <div
              className={
                !isFavourite
                  ? styles.popular_music__fav_heart_audio_comp
                  : styles.popular_music__full_fav_heart_audio_comp
              }
            ></div>
            {authorImg === "" ? (
              <div className={styles.image_song}></div>
            ) : (
              <img className={styles.image_song} src={authorImg} alt="author" />
            )}
            <p>
              {featName === "" ? "-" : featName.replace(/%20/g, " ")}
              <br />
              <span>
                {authorName === "" ? "-" : authorName.replace(/%20/g, " ")}
              </span>
            </p>
          </div>
          <div className={styles.main_controls}>
            <div className={styles.top_controls}>
              <div className={styles.midle_controls}>
                <div className={styles.top_controls__inner}>
                  <span
                    className={styles.shufle_btn}
                    onClick={() => playShuffled()}
                  ></span>
                  <span
                    className={styles.prev_track_btn}
                    onClick={() => playPrevTrack()}
                  ></span>
                  <button
                    disabled={activeAudioElement === null ? true : false}
                    className={
                      isPlaying ? styles.pause_btn_comp : styles.play_btn_comp
                    }
                    onClick={() => playPause(activeAudioIndex)}
                  ></button>
                  <span
                    className={styles.nexy_track_btn}
                    onClick={() => playNextTrack()}
                  ></span>
                  <span
                    className={styles.repeat_btn}
                    onClick={() => handleRepeat()}
                  ></span>
                </div>
                <div className={styles.bottom_controls}>
                  <span className={styles.time}>
                    {currentTime === undefined
                      ? "0:00"
                      : new Date(currentTime * 1000)
                          .toISOString()
                          .substr(14, 5)}
                  </span>
                  <div className={styles.input_range_content}>
                    <span
                      id="fill"
                      max="100"
                      style={
                        isPlaying
                          ? {
                              width: `${
                                (currentTime / activeAudioElement?.duration) *
                                100
                              }%`,
                            }
                          : {
                              width: `${
                                (currentTime / activeAudioElement?.duration) *
                                100
                              }%`,
                            } && currentTime === 0
                          ? { width: "0px" }
                          : {
                              width: `${
                                (currentTime / activeAudioElement?.duration) *
                                100
                              }%`,
                            }
                      }
                      className={entered ? styles.hovered_fill : styles.fill}
                    ></span>
                    <input
                      type="range"
                      className={
                        currentTime === undefined
                          ? styles.default_range_audio
                          : styles.range_audio && !entered
                          ? styles.hide_thumb
                          : styles.range_audio
                      }
                      value={(currentTime / activeAudioElement?.duration) * 100}
                      min="0"
                      max="100"
                      onChange={handleTimeChange}
                      onMouseEnter={() => {
                        setEntered(true);
                      }}
                      onMouseLeave={() => {
                        setEntered(false);
                      }}
                    />
                  </div>
                  <span>
                    {activeAudioElement?.duration === undefined
                      ? "0:00"
                      : resultFullTime}
                  </span>
                </div>
              </div>
              <div className={styles.volume_box}>
                <span className={styles.volume_counter}>
                  {(volume * 100).toFixed(0)}%
                </span>
                <span className={styles.play_list_btn}></span>
                <span className={styles.volume_icon}></span>
                <div className={styles.input_range}>
                  <span
                    style={{
                      width: `${(volume * 100).toFixed(0)}%`,
                    }}
                    className={enterVolume ? styles.hovered_fill : styles.fill}
                  ></span>
                  <input
                    id="volume"
                    type="range"
                    className={
                      enterVolume
                        ? styles.volume_range
                        : styles.hidden_thumb_volume
                    }
                    value={volume * 100}
                    min="0"
                    max="100"
                    onChange={handleVolumeChange}
                    onMouseEnter={() => {
                      setEnterVolume(true);
                    }}
                    onMouseLeave={() => {
                      setEnterVolume(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
