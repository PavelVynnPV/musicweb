import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { PersonalAuthorPage } from "./components/PersonalAuthorPage";
import { PersonalGenrePage } from "./components/PersonalGenrePage";
import Slider from "./components/Slider/Slider";
import { Album } from "./components/Albums";
import { Navigation } from "./components/NavigationPage";
import FavMusicPage from "./components/FavouriteMusic/FavMusicPage";

const url = " https://pavelvynnpv.github.io/my-music-api/music.json";

export default function App() {
  const [allMusic, setAllMusic] = useState([]);
  const [colage, setColage] = useState([]);
  const [genres, setGenres] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [favouritesAlbum, setFavouritesAlbum] = useState([]);
  const [favouritesAuthor, setFavouritesAuthor] = useState([]);
  const [personalPageId, setPersonalPageId] = useState([]);
  const [authorPageId, setAuthorPageId] = useState({});
  const [albumPageId, setAlbumPageId] = useState({});
  const [windowUrl, setWindowUrl] = useState("https://pavelvynnpv.github.io/musicweb");
  const [clients, setClients] = useState([]);
  const [activeLogin, setActiveLogin] = useState(false);
  const [activeSignUp, setActiveSignUp] = useState(false);
  const [activeClient, setActiveClient] = useState({});
  const body = document.querySelector("body");

  if (windowUrl === "https://pavelvynnpv.github.io/musicweb") {
    body.style.overflow = "hidden";
  } else body.style.overflow = "auto";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((music_info) => {
        setAllMusic(music_info.all_music);
        setColage(music_info.all_music.colage_info);
        setGenres(music_info.all_music.music_by_genres);
        setAlbums(music_info.all_music.albums);
      });
  }, [setAllMusic, setColage]);

  useEffect(() => {
    const itemFavourites = JSON.parse(localStorage.getItem("music")) || [];
    const itemFavouritesAlbum = JSON.parse(localStorage.getItem("album")) || [];
    const itemFavouritesAuthor =
      JSON.parse(localStorage.getItem("author")) || [];
    setFavourites(itemFavourites);
    setFavouritesAlbum(itemFavouritesAlbum);
    setFavouritesAuthor(itemFavouritesAuthor);
  }, []);

  function handleOnClickAdd(item) {
    const newFavouriteListAdd = [...favourites, item];

    const saveToLocalStorage = (item) => {
      localStorage.setItem("music", JSON.stringify(item));
    };

    saveToLocalStorage(newFavouriteListAdd);
    setFavourites(newFavouriteListAdd);
  }

  function handleOnClickAddAuthor(item) {
    const newFavouriteListAddAuthor = [...favouritesAuthor, item];

    const saveToLocalStorage = (item) => {
      localStorage.setItem("author", JSON.stringify(item));
    };

    saveToLocalStorage(newFavouriteListAddAuthor);
    setFavouritesAuthor(newFavouriteListAddAuthor);
  }

  function handleOnClickAddAlbum(item) {
    const newFavouriteListAlbum = [...favouritesAlbum, item];

    const saveToLocalStorageAlbum = (item) => {
      localStorage.setItem("album", JSON.stringify(item));
    };

    saveToLocalStorageAlbum(newFavouriteListAlbum);
    setFavouritesAlbum(newFavouriteListAlbum);
  }

  function handleOnClickAddClient(item) {
    let clientsArray = JSON.parse(localStorage.getItem("client")) || [];
    const isExisting = clientsArray.some(
      (element) => element.email === item.email
    );
    if (isExisting) {
      alert("Елемент уже існує в масиві");
      setActiveSignUp(true)
      return;
    }
    clientsArray.push(item);
    localStorage.setItem("client", JSON.stringify(clientsArray));
    setClients(clientsArray);
    localStorage.setItem("activeClient", JSON.stringify(item));
    setActiveSignUp(false)
  }

  function handleOnClickRemove(item) {
    const newFavouriteList = favourites.filter((favourite) => {
      return favourite?.id !== item.id;
    });
    const saveToLocalStorage = (item) => {
      localStorage.setItem("music", JSON.stringify(item));
    };
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  function handleOnClickRemoveAuthor(item) {
    const newFavouriteListAuthor = favouritesAuthor.filter((favourite) => {
      return favourite.id !== item.id;
    });
    const saveToLocalStorage = (item) => {
      localStorage.setItem("author", JSON.stringify(item));
    };
    setFavouritesAuthor(newFavouriteListAuthor);
    saveToLocalStorage(newFavouriteListAuthor);
  }

  function handleOnClickRemoveAlbum(item) {
    const newFavouriteListAlbum = favouritesAlbum.filter((favourite) => {
      return favourite.id !== item.id;
    });
    const saveToLocalStorage = (item) => {
      localStorage.setItem("album", JSON.stringify(item));
    };
    setFavouritesAlbum(newFavouriteListAlbum);
    saveToLocalStorage(newFavouriteListAlbum);
  }
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar
          setWindowUrl={setWindowUrl}
          windowUrl={windowUrl}
          allMusic={allMusic}
          setAuthorPageId={setAuthorPageId}
          setAlbumPageId={setAlbumPageId}
          setActiveSignUp={setActiveSignUp}
          setActiveClient={setActiveClient}
          setActiveLogin={setActiveLogin}
          activeClient={activeClient}
          activeLogin={activeLogin}
          activeSignUp={activeSignUp}
          handleOnClickAddClient={handleOnClickAddClient}
          clients={clients}
        />
        <Routes>
          <Route
            exact
            path="/musicweb"
            element={
              <Slider
                colage={colage}
                setPersonalPageId={setPersonalPageId}
                personalPageId={personalPageId}
                genre={genres}
                setWindowUrl={setWindowUrl}
              />
            }
          />
          <Route
            exact
            path="/musicweb/personalgenrepage"
            element={
              <PersonalGenrePage
                personalPageId={personalPageId}
                genreBg={allMusic.genres_bg}
                setAuthorPageId={setAuthorPageId}
                albums={albums}
                colage={colage}
                genre={genres}
                setAlbumPageId={setAlbumPageId}
                setPersonalPageId={setPersonalPageId}
                setWindowUrl={setWindowUrl}
                handleOnClickAdd={handleOnClickAdd}
                handleOnClickRemove={handleOnClickRemove}
                favourites={favourites}
              />
            }
          />
          ;
          <Route
            exact
            path="/musicweb/personalauthorpage"
            element={
              <PersonalAuthorPage
                authorPageId={authorPageId}
                setAuthorPageId={setAuthorPageId}
                handleOnClickAdd={handleOnClickAdd}
                handleOnClickRemove={handleOnClickRemove}
                handleOnClickAddAuthor={handleOnClickAddAuthor}
                handleOnClickRemoveAuthor={handleOnClickRemoveAuthor}
                favourites={favourites}
                favouritesAuthor={favouritesAuthor}
                setAlbumPageId={setAlbumPageId}
                albums={albums}
                setWindowUrl={setWindowUrl}
              />
            }
          />
          ;
          <Route
            exact
            path="/musicweb/albumpage"
            element={
              <Album
                albumPageId={albumPageId}
                setAuthorPageId={setAuthorPageId}
                setWindowUrl={setWindowUrl}
                handleOnClickAdd={handleOnClickAdd}
                handleOnClickRemove={handleOnClickRemove}
                favourites={favourites}
                handleOnClickAddAlbum={handleOnClickAddAlbum}
                handleOnClickRemoveAlbum={handleOnClickRemoveAlbum}
                favouritesAlbum={favouritesAlbum}
                genres={genres}
              />
            }
          />
          ;
          <Route
            exact
            path="/musicweb/navigationpage"
            element={
              <Navigation
                genre={genres}
                setPersonalPageId={setPersonalPageId}
                setWindowUrl={setWindowUrl}
              />
            }
          />
          ;
          <Route
            exact
            path="/musicweb/favmusicpage"
            element={
              <FavMusicPage
                favourites={favourites}
                setAuthorPageId={setAuthorPageId}
                personalPageId={favourites}
                handleOnClickAdd={handleOnClickAdd}
                handleOnClickRemove={handleOnClickRemove}
                favouritesAlbum={favouritesAlbum}
                setAlbumPageId={setAlbumPageId}
                persIdForFavAuthors={personalPageId}
                genres={genres}
                setWindowUrl={setWindowUrl}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
