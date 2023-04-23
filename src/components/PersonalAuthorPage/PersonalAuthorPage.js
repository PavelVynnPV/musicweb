import React, { useState } from "react";
import PersonalGenreComponent from "../PersonalGenrePage/PersonalGenreComponent";
import styles from "./PersonalAuthorPage.module.css";
import AlbumLine from "../Albums/AlbumLine"
import persStyles from "../PersonalGenrePage/PersonalGenrePage.module.css"

export default function PersonalAuthorPage({
  authorPageId,
  setAuthorPageId,
  handleOnClickAdd,
  handleOnClickRemove,
  favourites,
  handleOnClickRemoveAuthor,
  handleOnClickAddAuthor,
  favouritesAuthor,
  setAlbumPageId,
  albums,
  setWindowUrl
}) {
  const audioElements = document.querySelectorAll("audio");
  const [durations, setDurations] = useState(
    Array(audioElements.length).fill(null)
  );
  const isFavourite = Boolean(
    favouritesAuthor.find(
      (favouriteItem) => favouriteItem.id === authorPageId.id
    )
  );

  return (
    <>
      <section className={styles.pers_author_page}>
        <img
          className={styles.author__bg}
          src={authorPageId.author_bg_image}
          alt=""
        />
        <div className={styles.author_info_box}>
          <div className={styles.author__top_info}>
            <h1 className={styles.author__name}>{authorPageId.author}</h1>

            <div className={styles.author__info}>
              <p className={styles.author__country}>
                Країна:{" "}
                <img
                  src={process.env.PUBLIC_URL + authorPageId.country}
                  alt=""
                />
              </p>
              <p className={styles.author__age}>
                Вік:{" "}
                <span
                  className={
                    authorPageId.year === ""
                      ? styles.author__birthday_without_dot
                      : styles.author__birthday
                  }
                >
                  {authorPageId.birthday}
                </span>
                <span>{authorPageId.year}</span>
              </p>
              <p className={styles.author_genre}>
                Жанр:{" "}
                {authorPageId.songs_genre?.map((genre) => (
                  <span className={styles.author__genre_dott}>{genre}</span>
                ))}
              </p>
              <p className={styles.author_listeners}>
                Слухачів за місяць: <span>{authorPageId.listeners_month}</span>
              </p>
            </div>
            <div>
              <p className={styles.author__description}>
                Інформація про артиста:
                <br />
                <span>{authorPageId.description}</span>{" "}
              </p>
              <div className={styles.author__contact_btns}>
                <div className={styles.author_subscr}>
                  <button
                    onClick={() =>
                      !isFavourite
                        ? handleOnClickAddAuthor(authorPageId)
                        : handleOnClickRemoveAuthor(authorPageId)
                    }
                    className={styles.subscribe}
                  >
                    {!isFavourite ? "Слідкувати" : "Слідкую"}
                  </button>
                  <span className={styles.subscribe_numbers}>
                    Уже слідкують:{" "}
                    <span className={styles.sbscr_numbers}>
                      {authorPageId.subscribed_number}
                    </span>
                    <span className={styles.people}>людей</span>
                  </span>
                </div>
                <ul className={styles.contact_links}>
                  <li className={styles.icon_instagram}></li>
                  <li className={styles.icon_twitter}></li>
                  <li className={styles.icon_youtube}></li>
                  <li className={styles.icon_wiki}></li>
                  <li className={styles.icon_twitch}></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <PersonalGenreComponent
          personalPageId={[authorPageId]}
          setAuthorPageId={setAuthorPageId}
          setDurations={setDurations}
          durations={durations}
          handleOnClickAdd={handleOnClickAdd}
          handleOnClickRemove={handleOnClickRemove}
          favourites={favourites}
          setWindowUrl={setWindowUrl}
        />
         <div className={persStyles.popular_album}>
          <div className={persStyles.popular_album__inner}>
            <h1 className={persStyles.popular_title}>Популярні альбоми</h1>
            <AlbumLine albums={albums} setAlbumPageId={setAlbumPageId} />
          </div>
        </div>
      </section>
    </>
  );
}
