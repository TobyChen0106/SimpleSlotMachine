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
import axios from "axios";

import "./firework.css";

const useStyles = makeStyles({
  gameRoot: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#420433",
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
  const [ws_state, setWs_state] = useState(false);

  useEffect(() => {
    ws.current = new WebSocket("ws://127.0.0.1:5233/");
    // ws.current = new WebSocket("ws://localhost:4000/");
    ws.current.onopen = () => {
      console.log("ws connected");
      setWs_state(true);
    };

    ws.current.onmessage = (event) => {
      const WM_USER = 0x0400;
      const data = JSON.parse(event.data);
      console.log(data);

      switch (data.COMMAND) {
        case 0x0102:
          if (String(data.RETURNED_MESSAGE) === "ERROR_CASH_NOCHANGE") {
            window.alert("庫存現金不足!");
            reset2init();
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
            // break;
            case 0x1121:
              // GOT All Money
              setGameStatus("in-game-ready");
              break;
            case 0x1125:
              // Wait for money Timeout
              // case 0x1123:
              //   // Money PAYOUT SUCCESS
              //   setMoneyCounter((pre) => {
              //     if (pre - 100 === 0) reset2init();
              //     return pre - 100;
              //   });
              // window.alert("請求現金逾時!");
              console.log("請求現金逾時!");
              reset2init();
              break;
            case 0x1123:
              // Money PAYOUT SUCCESS
              reset2init();
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
    document.addEventListener(
      "contextmenu",
      function (e) {
        e.preventDefault();
      },
      false
    );
  }, []);

  const reset2init = () => {
    bgm.pause();
    firework.pause();
    claps.pause();
    fail.pause();
    bgm.currentTime = 0;
    firework.currentTime = 0;
    claps.currentTime = 0;
    fail.currentTime = 0;
    setTarget([0, 0, 0]);
    setReward(0);
    setGameStatus("init");
  };

  const WS_SendData = (objData) => {
    //var objData = document.getElementById("TB_DATA").value;
    if (
      ws.current.OPEN &&
      (ws.current.readyState === 0 || ws.current.readyState === 1)
    ) {
      console.log(objData);
      ws.current.send(objData);
    } else {
      console.log("WebSocket Closed");
    }
  };

  const [turnState, setTurnState] = useState(true);
  const [preTurnState, setPreTurnState] = useState(false);
  const [target, setTarget] = useState([0, 0, 0]);
  const [reward, setReward] = useState(0);
  const [moneyCounter, setMoneyCounter] = useState(0);

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
      if (ws_state) {
        WS_SendData(JSON.stringify(data));
      } else {
        setTimeout(() => {
          setGameStatus("in-game-ready");
        }, 500);
      }
    } else if (gameStatus === "in-game-ready") {
      setTimeout(() => {
        setGameStatus((pre) => {
          if (pre !== "in-game-released") {
            getRewardFromServer();
            console.log("Auto Start!");
          }
          return "in-game-released";
        });
      }, 5000);
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
      getRewardFromServer();
      // console.log(result, reward);
      // setTarget(result);
      // setTarget(reward);
    }
  };

  const getRewardFromServer = () => {
    let result = [2, 2, 2];
    axios
      .get("/api/get-reward")
      .then(function (response) {
        // handle success
        return response.data.reward ? response.data.reward : 0;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        // window.alert("[錯誤] 與伺服器連線錯誤!");
        return 0;
      })
      .then((r) => {
        switch (Number(r)) {
          case 0:
            result = [
              Math.floor(Math.random() * 5) + 2,
              Math.floor(Math.random() * 5) + 2,
              Math.floor(Math.random() * 5) + 2,
            ];
            break;
          case 200:
            result = [
              Math.floor(Math.random() * 2) + 7,
              Math.floor(Math.random() * 5) + 2,
              Math.floor(Math.random() * 5) + 2,
            ];
            break;
          case 300:
            result = [8, 8, Math.floor(Math.random() * 5) + 2];
            break;
          case 500:
            result = [7, 7, Math.floor(Math.random() * 5) + 2];
            break;
          case 1000:
            result = [7, 7, 8];
            break;
          case 2000:
            result = [7, 7, 7];
            break;
        }
        setTarget(result);
        setReward(Number(r));
        setPreTurnState(false);
        setTimeout(() => {
          setGameStatus("in-game-show-result");
          handleResult(result, Number(r));
        }, 7000);
      });
  };
  // Handle Result
  const handleResult = (result, reward) => {
    console.log("result:", result, "reward: ", reward);
    setMoneyCounter(reward);
    const data = {
      COMMAND: 0x0105,
      PARAMS: JSON.stringify([
        {
          NAME: "ITEM_AMOUNT",
          VALUE: reward,
        },
      ]),
    };
    if (reward > 0) {
      firework.play();
      claps.play();
      if (ws_state) {
        WS_SendData(JSON.stringify(data));
      } else {
        setTimeout(() => {
          reset2init();
        }, 5000);
      }
    } else {
      fail.play();
      setTimeout(() => {
        reset2init();
      }, 5000);
    }
  };

  const handleStartGame = () => {
    bgm.play();
    setGameStatus("wait-money");
  };

  return (
    <div className={classes.gameRoot}>
      <Background zIndex={0} fill="#CD13BE" />
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
