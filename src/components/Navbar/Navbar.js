import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { gapi } from "gapi-script";
import { Login } from "../SignForm";
import { SignUp } from "../SignForm";
import LogOut from "../SignForm/LogOut";
import profile_img from "../SignForm/client_profile.svg";

const clientId =
  "1027374739884-cm03ejrrnb4an15ol2ldu6c6rk3srl9q.apps.googleusercontent.com";

export default function Navbar({
  setWindowUrl,
  windowUrl,
  allMusic,
  setAlbumPageId,
  setAuthorPageId,
  setActiveLogin,
  setActiveSignUp,
  setActiveClient,
  activeLogin,
  activeSignUp,
  activeClient,
  handleOnClickAddClient,
  clients,
}) {
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeBurgerMenu, setActiveBurgerMenu] = useState(false);
  const [activeSearchMenu, setActiveSearchMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [activeClientMenu, setActiveClientMenu] = useState(false);
  const body = document.querySelector("body");

  const toggleActiveSearch = () => {
    if (activeSearch === true) {
      setActiveSearch(false);
    } else setActiveSearch(true);
  };

  const searchAlbum = [];
  const searchAuthors = [];

  const allAuthors = [];
  const by_genres =
    allMusic.music_by_genres === undefined
      ? null
      : allMusic?.music_by_genres[0];

  if (allMusic !== undefined) {
    const filterAlbums = allMusic.albums?.filter((album) => {
      return album.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    for (let key in by_genres) {
      by_genres[key].map((genre) => {
        allAuthors.push(genre);
      });
    }
    const filterAuthors = allAuthors.filter((author) => {
      return author.author.toLowerCase().includes(searchValue.toLowerCase());
    });

    searchAlbum.push(filterAlbums);
    searchAuthors.push(filterAuthors);
  } else {
    console.log("error");
  }

  if (activeLogin && activeSignUp && windowUrl !== "https://pavelvynnpv.github.io/musicweb") {
    body.style.overflow = "hidden";
  } else if (windowUrl === "https://pavelvynnpv.github.io/musicweb") {
    body.style.overflow = "hidden";
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
    const storedClient = JSON.parse(localStorage.getItem("activeClient"));
    if (storedClient) {
      setActiveClient(storedClient);
    }
  }, [setActiveClient]);

  const activeModalChangerLogin = () => {
    if (activeLogin === false) {
      setActiveSignUp(false);
      setActiveLogin(true);
    }
  };
  const activeModalChangerSignUp = () => {
    if (activeSignUp === false) {
      setActiveLogin(false);
      setActiveSignUp(true);
    }
  };

  const activeMenuChek = () => {
    if (activeClientMenu === false) {
      setActiveClientMenu(true);
    } else setActiveClientMenu(false);
  };

  const burgerMenuActiveChanger = () => {
    if (activeBurgerMenu === false) {
      setActiveBurgerMenu(true);
    } else setActiveBurgerMenu(false);
  };

  const activeClientCheck = Object.keys(activeClient).length === 0;
  const allSearched = searchAlbum.concat(searchAuthors);
  return (
    <nav id={activeBurgerMenu ? styles.nav_burger : styles.simple_nav}>
      <div className={activeBurgerMenu ? styles.nav__inner_burger : styles.nav__inner}>
        <Link
          className={activeBurgerMenu ? styles.nav__logo : styles.nav__logo_unActive}
          onClick={() => setWindowUrl("https://pavelvynnpv.github.io/musicweb")}
          to="/"
        ></Link>
        <ul className={activeBurgerMenu ? styles.nav__list_in_burger : styles.nav__list}>
          <li className={styles.search_li} onClick={() => toggleActiveSearch()}>
            Пошук
          </li>
          <form
            className={
              !activeSearch ? styles.unActiveSearch : styles.search_form
            }
          >
            <span className={styles.zoom_right_icon}></span>
            <input
              className={styles.search_input}
              type="search"
              placeholder="Знайти музику"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
            <ul
              className={
                searchValue?.length <= 0
                  ? styles.unActive
                  : styles.searched_list
              }
            >
              {allSearched[0] ? (
                allSearched[0].length > 0 ||
                allSearched[1].length > 0 ? null : (
                  <li>Нічого не знайдено</li>
                )
              ) : null}
              {allSearched[0] === undefined
                ? null
                : allSearched[0].map((item) => {
                    return (
                      <Link
                        onClick={() => {
                          setAlbumPageId(item);
                          setSearchValue("");
                          setWindowUrl("https://pavelvynnpv.github.io/musicweb/albumpage");
                        }}
                        to="/albumpage"
                      >
                        <span className={styles.zoom_left_icon}></span>
                        <li>
                          {item.title} <span>альбом</span>
                        </li>
                      </Link>
                    );
                  })}
              {allSearched[1].map((item) => {
                return (
                  <Link
                    onClick={() => {
                      setAuthorPageId(item);
                      setSearchValue("");
                      setWindowUrl("https://pavelvynnpv.github.io/musicweb/personalauthorpage");
                    }}
                    to="/personalauthorpage"
                  >
                    <span className={styles.zoom_left_icon}></span>
                    <li>
                      {item.author} <span>артист</span>
                    </li>
                  </Link>
                );
              })}
            </ul>
            <span
              onClick={() => setSearchValue("")}
              className={styles.clear_search}
            ></span>
          </form>
          <div
            className={
              !activeSearch ? styles.nav_links_with_display : styles.unActive
            }
          >
            <Link
              to="/favmusicpage"
              className={
                windowUrl === "https://pavelvynnpv.github.io/musicweb/favmusicpage"
                  ? styles.active_bar
                  : styles.unActive_bar
              }
              onClick={() => setWindowUrl("https://pavelvynnpv.github.io/musicweb/favmusicpage")}
            >
              <li>Моя музика</li>
            </Link>
            <Link
              className={
                windowUrl === "https://pavelvynnpv.github.io/musicweb/navigationpage"
                  ? styles.active_bar
                  : styles.unActive_bar
              }
              to="/navigationpage"
              onClick={() =>
                setWindowUrl("https://pavelvynnpv.github.io/musicweb/navigationpage")
              }
            >
              <li>Навігатор</li>
            </Link>
            <Link to="/">
              <li>ТОП чартів</li>
            </Link>
          </div>

          <div
            className={
              !activeSearch ? styles.nav__premium_btn_box : styles.unActive
            }
          >
            <button className={styles.nav__premium}>Спробувати Premium</button>
          </div>
        </ul>
        <div className={activeBurgerMenu ? styles.nav__inner_top_in_burger : styles.nav__inner_top}>
          <div className={styles.nav__sign_btns}>
            {!activeClientCheck ? (
              <div className={styles.menu__inner}>
                <div
                  className={styles.nav_profile}
                  onClick={() => activeMenuChek()}
                >
                  <span className={styles.client__profile_image}></span>
                  <span>{activeClient.name}</span>
                </div>
                <div
                  className={
                    activeClientMenu
                      ? styles.client__menu_active
                      : styles.unActive
                  }
                >
                  <div className={styles.client__menu_container}>
                    <span className={styles.client__menu_logo}></span>
                    <img
                      className={styles.client__menu_img}
                      src={profile_img}
                      alt=""
                    />
                    <h1 className={styles.client__menu_name}>
                      {activeClient.name}
                    </h1>
                    <ul className={styles.client__menu_list}>
                      <li className={styles.menu__list_item}>
                        <span className={styles.menu__list_item_icon}></span>Мій
                        профіль
                      </li>
                      <li className={styles.menu__list_item}>
                        <span className={styles.menu__list_item_icon}></span>
                        Налаштування
                      </li>
                      <li
                        className={styles.menu__list_item}
                        onClick={() => {
                          setActiveClient({});
                          localStorage.removeItem("activeClient");
                        }}
                      >
                        <LogOut setActiveClientMenu={setActiveClientMenu} />
                      </li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className={activeBurgerMenu ? styles.sign_nav_btns_in_burger : styles.sign_nav_btns}>
                {" "}
                <span
                  className={styles.nav__signIn}
                  onClick={() => activeModalChangerLogin()}
                >
                  Вхід<span className={styles.sign__underline}></span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={styles.burger_menu}
        onClick={() => burgerMenuActiveChanger()}
      >
        <span className={activeBurgerMenu ? styles.burger__line_active : styles.burger__line}></span>
        <span className={activeBurgerMenu ? styles.burger__line_active : styles.burger__line}></span>
        <span className={activeBurgerMenu ? styles.unActive : styles.burger__line}></span>
      </div>
      <section
        className={
          activeLogin === true || activeSignUp === true
            ? styles.sign_form
            : styles.unActive
        }
      >
        <div
          className={styles.background_dark}
          onClick={() => {
            setActiveLogin(false);
            setActiveSignUp(false);
          }}
        ></div>
        <div className={styles.sign_form__inner}>
          <Login
            clients={clients}
            activeLogin={activeLogin}
            setActiveClient={setActiveClient}
            activeModalChangerLogin={activeModalChangerLogin}
            activeModalChangerSignUp={activeModalChangerSignUp}
            activeSignUp={activeSignUp}
          />
          <SignUp
            activeModalChangerLogin={activeModalChangerLogin}
            activeSignUp={activeSignUp}
            activeModalChangerSignUp={activeModalChangerSignUp}
            setActiveSignUp={setActiveSignUp}
            handleOnClickAddClient={handleOnClickAddClient}
            clients={clients}
            activeLogin={activeLogin}
          />
        </div>
      </section>
    </nav>
  );
}
