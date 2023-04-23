import React, { useState } from "react";
import PersonalGenreComponent from "../PersonalGenrePage/PersonalGenreComponent";
import styles from "./Album.module.css";

export default function Album({
  albumPageId,
  setAuthorPageId,
  handleOnClickAdd,
  handleOnClickRemove,
  favourites,
  handleOnClickAddAlbum,
  handleOnClickRemoveAlbum,
  favouritesAlbum,
  genres,
  setWindowUrl
}) {
  const audioElements = document.querySelectorAll("audio");
  const [durations, setDurations] = useState(
    Array(audioElements.length).fill(null)
  );
  const title = albumPageId?.title
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");
  const filteredArr = durations.filter((el) => el !== null && el !== undefined);

  const totalSeconds = filteredArr.reduce((acc, cur) => {
    const [minutes, seconds] = cur.split(":").map(Number);
    return acc + minutes * 60 + seconds;
  }, 0);

  const totalMinutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  const fTime = `${totalMinutes} хв. ${remainingSeconds
    .toString()
    .padStart(2, "0")} сек.`;
  const isFavourite = Boolean(
    favouritesAlbum.find(
      (favouriteItem) => favouriteItem?.title === albumPageId.title
    )
  );
  
  const allGenresAuthors = [];

  genres.map((item) => {
    for (let key in item) {
      item[key].map((genre) => {
        allGenresAuthors.push(genre);
      });
    }
  })

  return (
    <>
      <section className={styles.album}>
        <div className={styles.pers_page__title_info}>
          <img
            className={styles.pers_bg}
            src={albumPageId.author_bg_image}
            alt=""
          />
          <div className={styles.album_info_box}>
            <img
              className={styles.pers_page__genre_img}
              src={albumPageId.album_img}
              alt=""
            />
            <div className={styles.album_info_box__item}>
              <h1 className={styles.pers_page__genre_title}>{title}</h1>
              <span className={styles.pers_page__author}>
                {albumPageId.author}
              </span>
              <ul className={styles.album__info_list}>
                <li>
                  Рік: <span>{albumPageId.year}</span>
                </li>
                <li>
                  Кількість треків: <span>{albumPageId.songs.length}</span>
                </li>
                <li>
                  Тривалість: <span>{fTime}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className={styles.album__descr}>
          <span>Інформація про альбом: </span>
          <br />
          {albumPageId.description}
        </p>
        <div className={styles.play_all_songs_box}>
          <button className={styles.play_all_songs}>Відтворити</button>
          <div
            className={
              !isFavourite
                ? styles.popular_music__fav_heart
                : styles.popular_music__full_fav_heart
            }
            onClick={() =>
              !isFavourite
                ? handleOnClickAddAlbum(albumPageId)
                : handleOnClickRemoveAlbum(albumPageId)
            }
          ></div>
        </div>

        <PersonalGenreComponent
          setAuthorPageId={setAuthorPageId}
          personalPageId={[albumPageId]}
          setDurations={setDurations}
          durations={durations}
          handleOnClickAdd={handleOnClickAdd}
          handleOnClickRemove={handleOnClickRemove}
          favourites={favourites}
          allGenresAuthors={allGenresAuthors}
          setWindowUrl={setWindowUrl}
        />
      </section>
    </>
  );
}
