import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SlotMachine from "../components/SlotMachine";
import SlotMachineBack from "../components/SlotMachineBack";
import Background from "../components/Background";
import Rollers from "../components/Rollers";
import Handle from "../components/Handle";
import Modal from "../components/Modal";
import BGMSrc from "../musics/BGM.mp3";
import fireworkSrc from "../musics/firework.mp3";
import clapsSrc from "../musics/claps.mp3";
import failSrc from "../musics/fail.mp3";
import "./firework.css";

const useStyles = makeStyles({
  gameRoot: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#227373",
    position: "relative",
    overflow: "hidden",
  },
  shadow: {
    background: "rgb(0,0,0)",
    background:
      "radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.1) 65%)",
    boxShadow: "0 0 2.5vh 5vh rgba(0,0,0,0.1)",
    width: "140vw",
    height: "140vw",
    borderRadius: "50%",
    position: "absolute",
    left: "-20vw",
    top: "calc(52vh + -70vw)",
  },
  turnButton: {
    width: "10vh",
    height: "10vh",
    borderRadius: "50%",
    position: "absolute",
    left: "calc(50vw-5vh)",
    top: "80vh",
  },
});

const bgm = new Audio(BGMSrc);
bgm.volume = 0.5;
const firework = new Audio(fireworkSrc);
const claps = new Audio(clapsSrc);
const fail = new Audio(failSrc);

function Game() {
  const classes = useStyles({ test: "tset" });
  const ws = useRef(null);

  useEffect(() => {
    // ws.current = new WebSocket("ws://192.168.1.181:5233/");
    ws.current = new WebSocket("ws://localhost:4000/");
    ws.current.onopen = () => {
      console.log("ws connected");
    };

    ws.current.onmessage = (event) => {
      const WM_USER = 0x0400;
      const data = JSON.parse(event.data);
      console.log(data);

      switch (data.COMMAND) {
        case 0x0102:
          if (data.RETURNED_MESSAGE === "ERROR_CASH_NOCHANGE") {
            window.alert("ERROR_CASH_NOCHANGE");
          }
          break;
        case 0x1100:
          switch (parseInt(data.MESSAGE) - WM_USER) {
            //Cash
            case 0x1111:
              // Got Money (Coin)
              break;
            case 0x1101:
              // Got Money (Paper)
              break;
            case 0x1121:
              // GOT All Money
              setGameStatus("in-game-ready");
              break;
            case 0x1205:
            // Wait for money Timeout
            case 0x1123:
              // Money PAYOUT SUCCESS
              bgm.pause();
              firework.pause();
              claps.pause();
              fail.pause();
              bgm.currentTime = 0;
              firework.currentTime = 0;
              claps.currentTime = 0;
              fail.currentTime = 0;
              setGameStatus("init");

              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    };

    ws.current.onclose = () => {
      console.log("ws disconnected");
    };
  }, []);

  const WS_SendData = (objData) => {
    //var objData = document.getElementById("TB_DATA").value;
    if (
      ws.current.OPEN &&
      (ws.current.readyState === 0 || ws.current.readyState === 1)
    ) {
      console.log(objData);
      ws.current.send(objData);
    } else if (ws.current.readyState === 2 || ws.current.readyState === 3) {
      alert("WebSocket Closed");
    }
  };

  const [turnState, setTurnState] = useState(true);
  const [preTurnState, setPreTurnState] = useState(false);
  const [target, setTarget] = useState([0, 0, 0]);
  const [reward, setReward] = useState(0);

  const [gameStatus, setGameStatus] = useState("init");
  useEffect(() => {
    if (gameStatus === "init") {
    } else if (gameStatus === "wait-money") {
      // call get money api
      const data = {
        COMMAND: 0x0101,
        PARAMS: JSON.stringify([
          {
            NAME: "ITEM_AMOUNT",
            VALUE: 100,
          },
        ]),
      };
      WS_SendData(JSON.stringify(data));
    } else if (gameStatus === "in-game-ready") {
    } else if (gameStatus === "in-game-pressed") {
    } else if (gameStatus === "in-game-released") {
    } else if (gameStatus === "in-game-show-result") {
      // setTimeout(() => {
      //   setGameStatus("init");
      // }, 4500);
    }
  }, [gameStatus]);

  const handlePress = () => {
    if (gameStatus === "in-game-ready") {
      setGameStatus("in-game-pressed");
      setPreTurnState(true);
    }
  };

  const handleRelease = () => {
    if (gameStatus === "in-game-pressed") {
      setGameStatus("in-game-released");
      const result = [
        Math.floor(Math.random() * (6 - 1)) + 2,
        Math.floor(Math.random() * (6 - 1)) + 2,
        Math.floor(Math.random() * (6 - 1)) + 2,
      ];
      setTarget(result);
      setPreTurnState(false);
      setTimeout(() => {
        setGameStatus("in-game-show-result");
        handleResult(result);
      }, 6000);
    }
  };

  // Handle Result
  const handleResult = (result) => {
    console.log("result:", result);
    let got_rewrad = 0;
    if (result[0] === result[1] && result[0] === result[2]) {
      if (result[0] === 6) {
        // ***
        got_rewrad = 2000;
      } else {
        // ooo
        got_rewrad = 1000;
      }
    } else if (result[0] === result[1]) {
      if (result[0] === 6) {
        // **o
        got_rewrad = 500;
      } else {
        // oox
        got_rewrad = 300;
      }
    } else if (result[0] === result[2]) {
      if (result[0] === 6) {
        // **o
        got_rewrad = 500;
      } else {
        // oox
        got_rewrad = 300;
      }
    } else if (result[1] === result[2]) {
      if (result[0] === 6) {
        // **o
        got_rewrad = 500;
      } else {
        // oox
        got_rewrad = 300;
      }
    } else if (result[0] === 6 || result[1] === 6 || result[2] === 6) {
      got_rewrad = 200;
    }

    setReward(got_rewrad);

    if (got_rewrad > 0) {
      firework.play();
      claps.play();
    } else {
      fail.play();
    }

    const data = {
      COMMAND: 0x0105,
      PARAMS: JSON.stringify([
        {
          NAME: "ITEM_AMOUNT",
          VALUE: got_rewrad,
        },
      ]),
    };
    if (got_rewrad > 0) {
      WS_SendData(JSON.stringify(data));
    }
  };

  const handleStartGame = () => {
    bgm.play();
    setGameStatus("wait-money");
  };

  return (
    <div className={classes.gameRoot}>
      <Background zIndex={0} fill="#D93B3B" />
      <div className={classes.shadow} style={{ zIndex: 1 }} />
      <SlotMachineBack zIndex={10} />
      <Rollers
        zIndex={50}
        target={target}
        turn={turnState}
        preturn={preTurnState}
      />
      <Handle
        gameStatus={gameStatus}
        zIndex={80}
        handlePress={handlePress}
        handleRelease={handleRelease}
      />
      <SlotMachine zIndex={100} />

      <div
        className="pyro"
        style={
          gameStatus === "in-game-show-result" && reward > 0
            ? null
            : { display: "none" }
        }
      >
        <div className="before"></div>
        <div className="after"></div>
      </div>
      <Modal
        gameStatus={gameStatus}
        handleStartGame={handleStartGame}
        reward={reward}
      />
    </div>
  );
}

export default Game;
