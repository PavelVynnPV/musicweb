import React, { useRef, useEffect } from "react";
import { useState } from "react";
import "./Slider.css";
import { Link } from "react-router-dom";

export default function Slider({
  setWindowUrl,
  colage,
  setPersonalPageId,
  genre,
}) {
  const sliderRef = useRef(null);
  const [activeTitle, setActiveTitle] = useState("folk");
  const [activeTitleInfo, setActiveTitleInfo] = useState("folk");
  const [activeDescr, setActiveDescr] = useState(
    "Сучасна фолк-музика (Folk music «народна музика») — жанр популярної музики, який розвинувся на основі народної музики в середині XX століття в результаті феномена фолк-рівайвлів, коли народна музика почала поширюватися серед масової аудиторії. Найбільш уживаною назвою для цієї нової форми стилю є також «фолк-музика», проте частіше вживають «сучасна фолк-музика» або «музика фолкового відродження», щоб якісніше можна було розрізняти."
  );

  function handleCheck(activeTitle) {
    genre.find((genre_item) => {
      console.log(genre)
      for (let key in genre_item) {
        if (key === activeTitle) {
          setPersonalPageId(genre_item[key]);
        }
      }
      return genre_item;
    });
  }

  useEffect(() => {
    const slider = sliderRef.current;
    const wrapper = document.querySelector(".wrapper");

    window.addEventListener("load", () => {
      const images = slider.querySelectorAll(".slides > img");
      images.forEach((item) => {
        item.style.setProperty("--img-no", 10.99);
      });
    });

    const loadImages = () => {
      const images = slider.querySelectorAll(".slides > img");
      images.forEach((item) => {
        item.style.setProperty("--img-no", 10.99);
      });
    };

    if (window.location.href === "https://pavelvynnpv.github.io/musicweb") {
      loadImages();
    }

    window.addEventListener("popstate", () => {
      if (window.location.href === "https://pavelvynnpv.github.io/musicweb") {
        loadImages();
      }
    });

    const slides = slider.querySelectorAll(".slides");
    const images = slider.querySelectorAll(".slides > img");

    slides.forEach((slide, i) => {
      slide.addEventListener("click", () => {
        wrapper.style.transform = `rotateZ(-${(360 / 18) * (i + 4)}deg)`;

        images.forEach((img, i) => {
          img.style.setProperty("--img-no", 10.98);
          img.classList.remove("active");
        });

        slide.querySelector("img").classList.add("active");
      });
    });
  }, []);

  function reload() {
    const slider = sliderRef.current;
    const wrapper = document.querySelector(".wrapper");

    const slides = slider.querySelectorAll(".slides");
    const images = slider.querySelectorAll(".slides > img");

    slides.forEach((slide, i) => {
      slide.addEventListener("click", () => {
        wrapper.style.transform = `rotateZ(-${(360 / 18) * (i + 4)}deg)`;

        images.forEach((img, i) => {
          img.style.setProperty("--img-no", 10.98);
          img.classList.remove("active");
        });

        slide.querySelector("img").classList.add("active");
      });
    });
  }

  function handleFindColage(id) {
    try{let titleFinder = colage.find((item) =>
      item.id == id ? item.title : null
    );
    let descrFinder = colage.find((item) =>
      item.id == id ? item.description : null
    );
    setActiveTitle(titleFinder.title_for_singl_page);
    setActiveDescr(descrFinder.description);
    setActiveTitleInfo(titleFinder.title);
    } catch(error) {
      console.error(error)
    }
  }

  const genreTitle =
    activeTitleInfo.charAt(0).toUpperCase() + activeTitleInfo.slice(1);
  return (
    <>
      <div className="flex-center slider_main_box">
        <div className="circular-slider flex-center">
          <ul
            className="wrapper flex-center"
            ref={sliderRef}
            onClick={(e) => {
              handleFindColage(e.target.id);
              reload();
            }}
          >
            {colage.map((colage_item) => {
              return (
                <>
                  <li
                    key={colage_item.id}
                    className="slides"
                    style={{ "--img-no": `${colage_item.id}` }}
                  >
                    <img
                      loading="lazy"
                      id={colage_item.id}
                      src={process.env.PUBLIC_URL + colage_item.colage_img}
                      alt=""
                    />
                  </li>
                </>
              );
            })}
          </ul>
          <div className="colage_info">
            <h1 className="colage_title">{genreTitle}</h1>
            <Link
              className="colage_btn"
              onClick={() => {
                handleCheck(activeTitle);
                setWindowUrl("https://pavelvynnpv.github.io/musicweb/personalgenrepage");
              }}
              to="/personalgenrepage"
            >
              Переглянути композиції
            </Link>
            <p className="colage_descr">{activeDescr}</p>
          </div>
        </div>
      </div>
    </>
  );
}
