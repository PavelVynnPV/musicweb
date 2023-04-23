import React, { useEffect, useState, useRef, createRef } from "react";
import AudioComp from "./AudioComp";
import styles from "./PersonalGenrePage.module.css";
import { Link } from "react-router-dom";

export default function PersonalGenreComponent({
  setAuthorPageId,
  personalPageId,
  durations,
  setDurations,
  handleOnClickAdd,
  handleOnClickRemove,
  favourites,
  persIdForFavAuthors,
  allGenresAuthors,
  allGenresAuthorsOnFav,
  setWindowUrl
}) {
  const [active, setActive] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAudioIndex, setActiveAudioIndex] = useState(null);
  const [activeAudioElement, setActiveAudioElement] = useState(null);
  const [audioRefs, setAudioRefs] = useState([]);
  const [shufledTracks, setShufledTracks] = useState([]);
  const audioElements = document.querySelectorAll("audio");
  const musicListRef = useRef(null);
  const [authorName, setAuthorName] = useState("");
  const [featName, setFeatName] = useState("");
  const [duration, setDuration] = useState(0);
  const [authorImg, setAuthorImg] = useState("");
  const [getIdForAudioComp, setGetIdForAudioComp] = useState()

  useEffect(() => {
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((audioElement, index) => {
      audioElement.addEventListener("loadedmetadata", (event) => {
        const time = event.target.duration;
        if (!isNaN(time)) {
          const formattedTime = formatTime(time);
          setDurations((prevDurations) => {
            const newDurations = [...prevDurations];
            newDurations[index] = formattedTime;
            return newDurations;
          });
        }
      });
    });

    return () => {
      audioElements.forEach((audioElement) => {
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      });
    };
  }, []);
  
  useEffect(() => {
    setAudioRefs((prevRefs) =>
      Array(audioElements.length)
        .fill()
        .map((_, i) => prevRefs[i] || createRef())
    );
  }, [audioElements.length, setAudioRefs]);

  const handleOpenMore = () => {
    if (active) {
      musicListRef.current.style.overflow = "auto";
      musicListRef.current.style.height = "100%";
      setActive(false);
    } else {
      setActive(true);
      musicListRef.current.style.overflow = "hidden";
      musicListRef.current.style.height = "330px";
    }
  };

  const playPause = (index, song) => {
    const audioElement = audioRefs[index].current;
    const songUderTitle = audioElement.currentSrc
      .split("/")
      .pop()
      .replace(".mp3", "");
    const artist = audioElement.currentSrc.split("/")[5].replace("_", " ");
    const formattedArtist = artist.charAt(0).toUpperCase() + artist.slice(1);
    setAuthorName(formattedArtist);
    setFeatName(songUderTitle);
    if (activeAudioIndex !== index) {
      if (activeAudioElement) {
        activeAudioElement.pause();
      }
      setActiveAudioIndex(index);
      setActiveAudioElement(audioElement);
      setIsPlaying(true);
      audioElement.play();
    } else {
      setIsPlaying(!isPlaying);
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
    }
  };
  useEffect(() => {
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((audioElement) => {
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    });
    return () => {
      audioElements.forEach((audioElement) => {
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      });
    };
  }, []);

  const allSongs = [];
  let newAllSongs = [];
  personalPageId.forEach((item) => {
    if (item.songs !== undefined) {
      allSongs.push(...item.songs);
    } else {
      newAllSongs.push(personalPageId);
    }
  });

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const handleLoadedMetadata = (event) => {
    const time = event.target.duration;
    setDuration(formatTime(time));
  };

  const tracksChanger = allSongs.length === 0 ? newAllSongs[0] : allSongs;

  const authorFinder = (author) => {
    personalPageId.filter((item) => {
      if (item.year === undefined || item.year === null) {
        persIdForFavAuthors.filter((item) => {
          return item.author === author ? setAuthorPageId(item) : null;
        });
      }
      return item.author === author ? setAuthorPageId(item) : null;
    });
  };

  const authorChanger = (song) => {
    if (allGenresAuthors) {
      allGenresAuthors.filter((item) =>
        item.author === song ? setAuthorPageId(item) : null
      );
    }else if(allGenresAuthorsOnFav) {
      allGenresAuthorsOnFav.filter((item) =>
      item.author === song ? setAuthorPageId(item) : null
    );
    }
     else {
      authorFinder(song);
    }
  };

  return (
    <>
      <div className={styles.pers_page__inner}>
        <div className={styles.popular_music}>
          <h1 className={styles.popular_title}>
            {window.location.href === "https://pavelvynnpv.github.io/musicweb/favmusicpage"
              ? "Мої треки"
              : "Популярні треки"}
          </h1>
          <ol className={styles.popular_music__list} ref={musicListRef}>
            {tracksChanger.map((song, index) => {
              const songUnderTitle = song.song
                .split("/")
                .pop()
                .replace(".mp3", "");
              const filteredArr = durations.filter(
                (el) => el !== null && el !== undefined
              );
              const isFavourite = Boolean(
                favourites.find((favouriteItem) => favouriteItem?.id === song.id)
              );
              return (
                <>
                  <li key={index} className="list_item">
                    <audio
                      className={
                        activeAudioIndex === index ? styles.active : null
                      }
                      controls
                      ref={audioRefs[index]}
                      onClick={() => {
                        playPause(index, song);
                      }}
                      onLoadedMetadata={handleLoadedMetadata}
                    >
                      <source src={process.env.PUBLIC_URL + song.song} />
                    </audio>
                    <div className={styles.play_btn_box}>
                      <img src={song.author_image} alt="" />
                      <span
                        onClick={(e) => {
                          playPause(index);
                          setAuthorImg(song.author_image);
                          setGetIdForAudioComp(song.id)
                        }}
                        className={styles.active_player}
                      ></span>
                    </div>
                    <div className={styles.author_feat}>
                      <Link
                        to="/personalauthorpage"
                        className={styles.popular_music__name}
                        onClick={(e) => {
                          authorChanger(song.author);
                          setWindowUrl("https://pavelvynnpv.github.io/musicweb/personalauthorpage")
                        }}
                      >
                        {song.author}
                      </Link>
                      <span>{songUnderTitle}</span>
                    </div>
                    <p className={styles.popular_music__album}>album</p>
                    <span className={styles.popular_music__numbers}>
                      {song.listeners_month}
                    </span>
                    <div
                      className={
                        !isFavourite
                          ? styles.popular_music__fav_heart
                          : styles.popular_music__full_fav_heart
                      }
                      onClick={() =>
                        !isFavourite
                          ? handleOnClickAdd(song)
                          : handleOnClickRemove(song)
                      }
                    ></div>
                    <span className={styles.song_full_time}>
                      {filteredArr[index]}
                    </span>
                  </li>
                  <AudioComp
                    activeAudioElement={activeAudioElement}
                    playPause={playPause}
                    activeAudioIndex={activeAudioIndex}
                    setActiveAudioIndex={setActiveAudioIndex}
                    isPlaying={isPlaying}
                    tracks={tracksChanger}
                    setIsPlaying={setIsPlaying}
                    setShufledTracks={setShufledTracks}
                    authorName={authorName}
                    featName={featName}
                    authorImg={authorImg}
                    songUnderTitle={songUnderTitle}
                    getIdForAudioComp={getIdForAudioComp}
                    favourites={favourites}
                  />
                </>
              );
            })}
          </ol>
          <p className={styles.click_more} onClick={() => handleOpenMore()}>
            Переглянути більше
          </p>
        </div>
      </div>
    </>
  );
}
