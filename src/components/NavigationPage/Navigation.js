import React from "react";
import styles from "./Navigation.module.css";
import bg from "./navigation_img/navigation_bg.png";
import mini_img from "./navigation_img/navigation_mini_picture.png";
import { Link } from "react-router-dom";

export default function Navigation({ genre, setPersonalPageId, setWindowUrl }) {
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
  const genresName = [];
  genre.map((item) => {
    for (let key in item) {
      genresName.push(key);
    }
    return item;
  });

  return (
    <>
      <section className={styles.navigation_page}>
        <div className={styles.pers_page__title_info}>
          <img className={styles.pers_bg} src={bg} alt="navigation_bg" />
          <div>
            <img
              className={styles.pers_page__genre_img}
              src={mini_img}
              alt="navigation_mini_img"
            />
            <h1 className={styles.pers_page__genre_title}>Навігатор</h1>
          </div>
        </div>
        <div className={styles.popular_album}>
          <div className={styles.popular_album__inner}>
            <h1 className={styles.popular_title}>Жанри</h1>
            <ul className={styles.popular_genre__list}>
              {genresName.map((item) => (
                <Link
                  to="/personalgenrepage"
                  onClick={(e) => {
                    handleCheck(item);
                    setWindowUrl("https://pavelvynnpv.github.io/musicweb/personalgenrepage");
                  }}
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
