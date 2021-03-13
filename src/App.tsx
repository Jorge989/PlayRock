import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import GoogleFontLoader from "react-google-font-loader";
import guitar from "./assets/guitar4.png";
import playIcon from "./play-icon.svg";
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import Rock from "./assets/rok2.png";
import { useSpring, animated } from "react-spring";
import "./App.css";


const API_HOST = "https://rockerback.herokuapp.com/";

interface IMusic {
  artist: string;
  name: string;
  duration: string;
  cover: string;
  url: string;
}

interface ICatalogResponse {
  amount: number;
  musics: IMusic[];
}

function App() {
  const [musics, setMusics] = useState<IMusic[]>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [selectMusic, setSelectedMusic] = useState("");

  useEffect(() => {
    axios
      .get<ICatalogResponse>("https://rockerback.herokuapp.com/", {
        baseURL: API_HOST,
      })
      .then((response) => {
        const { musics } = response.data;

        setMusics(musics);
      });
  }, []);

  const handlePlay = useCallback(
    (music: IMusic) => {
      if (audio) {
        audio.src = music.url;

        setAudio(audio);

        audio.play();
        return;
      }

      const newAudio = new Audio(music.url);

      newAudio.play();

      setAudio(newAudio);
    },
    [audio]
  );
  const handlePlay2 = useCallback(
    (music: IMusic) => {
      setSelectedMusic('')
      if (audio) {
        audio.src = music.url;

        setAudio(audio);

        audio.pause();
        return;
      }

      const newAudio = new Audio(music.url);

      newAudio.pause();

      setAudio(newAudio);
    },
    [audio]
  );
  console.log(audio);
  const Modal = {
    acitve() {
      const modalElements = document?.querySelector(".bar") as HTMLDivElement;

      if (modalElements) {
        modalElements.classList.add("bar");
      }
    },
    unactive() {
      const modalElements = document?.querySelector(
        ".removed"
      ) as HTMLDivElement;

      if (modalElements) {
        modalElements.classList.remove("removed");
      }
    },
  };
  const [isShow, setIsShow] = useState(false);
  const [passwordShown, setPasswordShown] = useState(true);
  const togglePasswordVisiblity = () => {
    setPasswordShown(selectMusic === "" ? false : true);
  }
  return (
    <div className="container">
      {!musics.length ? (
        <h1>Loading</h1>
      ) : (
        <>
          <h1>Choose a music</h1>

          <ul>
            {musics.map((music, index) => (
              <div className="div-border">
                <li key={music.name + index}>
                  <span>
                    {music.artist} -{" "}
                    <span className="branco">{music.name}</span>
                  </span>
                  <button onClick={togglePasswordVisiblity} type="button" className="eye">
        {passwordShown ?  <FaPlay
                    onClick={() => {
                      setIsShow(!isShow);
                      setSelectedMusic(music.name)
                      handlePlay(music);
                    }}
                    cursor="pointer"
                    color="#BD11FA"
                  />:  <FaStop
                  onClick={() => {
                    setIsShow(false);
                    handlePlay2(music);
                  }}
                  cursor="pointer"
                  color="#BD11FA"
                />}
      </button>
                  {/* <FaPlay
                    onClick={() => {
                      setIsShow(!isShow);
                      handlePlay(music);
                    }}
                    cursor="pointer"
                    color="#BD11FA"
                  /> */}
                </li>
              </div>
            ))}
          </ul>
          <div className="rock">
            <img src={Rock} className="rockroll" />
          </div>
        </>
      )}
      {isShow && (
        <div id="bars">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}
    </div>
  );
}

export default App;
