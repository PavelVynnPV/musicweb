import React, { useState } from "react";
import styles from "./FavMusic.module.css";
import bg from "./fav_img/fav_bg.png";
import mini_img from "./fav_img/fav_mini_img.png";
import PersonalGenreComponent from "../PersonalGenrePage/PersonalGenreComponent";
import AlbumLine from "../Albums/AlbumLine";
import persGenreStyles from "../PersonalGenrePage/PersonalGenrePage.module.css"

export default function FavMusicPage({
  setAuthorPageId,
  personalPageId,
  handleOnClickAdd,
  handleOnClickRemove,
  favourites,
  favouritesAlbum,
  setAlbumPageId,
  persIdForFavAuthors,
  genres,
  setWindowUrl
}) {
  const audioElements = document.querySelectorAll("audio");
  const [durations, setDurations] = useState(
    Array(audioElements.length).fill(null)
  );

  const allGenresAuthorsOnFav = [];

  genres.map((item) => {
    for (let key in item) {
      item[key].map((genre) => {
        allGenresAuthorsOnFav.push(genre);
      });
    }
  })

  return (
    <>
      <section className={styles.fav_music}>
        <div className={styles.pers_page__title_info}>
          <img className={styles.pers_bg} src={bg} alt="" />
          <div className={styles.album_info_box}>
            <img
              className={styles.pers_page__genre_img}
              src={mini_img}
              alt=""
            />
            <div className={styles.album_info_box__item}>
              <h1 className={styles.pers_page__genre_title}>Моя музика</h1>
              <ul className={styles.album__info_list}>
                <li>
                  Кількість треків: <span>{audioElements.length/2}</span>
                </li>
                <li>
                  Кількість альбомів: <span>{favouritesAlbum.length}</span>
                </li>
                <li>
                  Кількість плейлистів: <span></span>
                </li>
                <li>
                  Улюблені артисти: <span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.fav_music__inner}>
          <PersonalGenreComponent
            setAuthorPageId={setAuthorPageId}
            personalPageId={personalPageId}
            setDurations={setDurations}
            durations={durations}
            handleOnClickAdd={handleOnClickAdd}
            handleOnClickRemove={handleOnClickRemove}
            favourites={favourites}
            persIdForFavAuthors={persIdForFavAuthors}
            allGenresAuthorsOnFav={allGenresAuthorsOnFav}
            setWindowUrl={setWindowUrl}
          />
        </div>
        <div className={persGenreStyles.popular_album}>
          <div className={persGenreStyles.popular_album__inner}>
            <h1 className={persGenreStyles.popular_title}>Мої альбоми</h1>
            <AlbumLine albums={favouritesAlbum} setAlbumPageId={setAlbumPageId} />
          </div>
        </div>
      </section>
    </>
  );
}
