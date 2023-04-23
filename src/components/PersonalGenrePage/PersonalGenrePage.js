import React, { useState } from "react";
import styles from "./PersonalGenrePage.module.css";
import PersonalGenreComponent from "./PersonalGenreComponent";
import AlbumLine from "../Albums/AlbumLine";
import { Link } from "react-router-dom";

export default function PersonalGenrePage({
  personalPageId,
  genreBg,
  setAuthorPageId,
  albums,
  setAlbumPageId,
  genre,
  setPersonalPageId,
  setWindowUrl,
  handleOnClickAdd,
  handleOnClickRemove,
  favourites
}) {
  const genres = [];
  const audioElements = document.querySelectorAll("audio");
  const [durations, setDurations] = useState(
    Array(audioElements.length).fill(null)
  );

  function handleCheck(activeTitle) {
    genre.find((genre_item) => {
      for (let key in genre_item) {
        if (key === activeTitle) {
          setPersonalPageId(genre_item[key]);
        }
      }
      return genre_item;
    });
  }

  personalPageId.forEach((pageItem) => {
    pageItem.songs.forEach((item) => {
      const songGenre = item.song.split("/")[2];
      genreBg.forEach((genre) => {
        for (let key in genre) {
          if (songGenre === key) {
            genres.push(genre[key]);
          }
        }
      });
    });
  });
  const genresName = [];
  genre.map((item) => {
    for (let key in item) {
      genresName.push(key);
    }
    return item;
  });

  return (
    <>
      <section className={styles.pers_page}>
        <div className={styles.pers_page__title_info}>
          <img className={styles.pers_bg} src={genres[0].bg} alt="" />
          <div>
            <img
              className={styles.pers_page__genre_img}
              src={genres[0].genre_img}
              alt=""
            />
            <h1 className={styles.pers_page__genre_title}>
              {genres[0].genre_name}
            </h1>
          </div>
        </div>
        <PersonalGenreComponent
          setAuthorPageId={setAuthorPageId}
          personalPageId={personalPageId}
          setDurations={setDurations}
          durations={durations}
          handleOnClickAdd={handleOnClickAdd}
          handleOnClickRemove={handleOnClickRemove}
          favourites={favourites}
          setWindowUrl={setWindowUrl}
        />
        <div className={styles.popular_album}>
          <div className={styles.popular_album__inner}>
            <h1 className={styles.popular_title}>Популярні альбоми</h1>
            <AlbumLine albums={albums} setAlbumPageId={setAlbumPageId} />
          </div>
        </div>
        <div className={styles.popular_album}>
          <div className={styles.popular_album__inner}>
            <h1 className={styles.popular_title}>Різновиди жанру</h1>

            <ul className={styles.popular_genre__list}>
              {genresName.map((item) => (
                <Link
                  to="/personalgenrepage"
                  onClick={(e) => {handleCheck(item); setWindowUrl("https://pavelvynnpv.github.io/musicweb/personalgenrepage")}}
                >
                  <li>{item}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
