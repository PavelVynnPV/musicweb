import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Album.module.css";

export default function AlbumLine({ albums, setAlbumPageId }) {
  const [active, setActive] = useState(true);
  const musicListRef = useRef(null);

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
  return (
    <>
      <ul className={styles.popular_album__list} ref={musicListRef}>
        {albums.map((item) => {
          const title = item.title
            .split(/\s+/)
            .map((word) => word[0].toUpperCase() + word.substring(1))
            .join(" ");
          return (
            <Link to={"/musicweb/albumpage"} onClick={(e) => setAlbumPageId(item)}>
              <li className={styles.album_list__inner}>
                <img src={item.album_img} alt="album" />
                <p className={styles.album_name}>{title}</p>
                <span className={styles.album_author}>{item.author}</span>
                <span className={styles.album_year}>
                  <span>{item.year}</span>
                  <span>Альбом</span>
                </span>
              </li>
            </Link>
          );
        })}
      </ul>
      <p className={styles.click_more} onClick={() => handleOpenMore()}>
        Переглянути більше
      </p>
    </>
  );
}
