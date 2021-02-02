import React, { useState, useEffect, useRef } from "react";
import MachineBackImagePng from "../images/handle.png";
import { makeStyles } from "@material-ui/core/styles";
import { useEventListener } from "./useEventListener";

const useStyles = makeStyles({
  machineBackHolder: {
    position: "relative",
  },
  machineBackImage: {
    width: "13vw",
    height: "26vw",
    position: "absolute",
    top: "calc(50vh + -15vw + -12vw)",
    left: "87vw",
    transitionDuration: "0.3s",
    userDrag: "none",
    userSelect: "none",
  },
});

function Handle({ gameStatus, zIndex, handlePress, handleRelease }) {
  const classes = useStyles();

  const [handleState, setHandleState] = useState(null);
  const gameStatusRef = useRef();
  gameStatusRef.current = gameStatus;

  const mouseDown = (e) => {
    e.preventDefault();
    if (gameStatusRef.current === "in-game-ready") {
      if (e.clientX >= window.innerWidth * 0.5) {
        setHandleState(true);
        handlePress();
      }
    }
  };
  useEventListener("mousedown", mouseDown);

  // const mouseDownt = (e) => {
  //   // e.preventDefault();
  //   if (e.touches[0].clientX >= window.innerWidth * 0.5) {
  //     setHandleState(true);
  //   }
  // };

  const mouseUp = (e) => {
    e.preventDefault();
    if (gameStatusRef.current === "in-game-pressed") {
      setHandleState(false);
      handleRelease();
    }
  };
  useEventListener("mouseup", mouseUp);

  const handleStyle = handleState
    ? {
        transform: "rotate(90deg)",
        transformOrigin: "bottom left",
      }
    : {
        transform: "rotate(0deg)",
        transformOrigin: "bottom left",
      };

  return (
    <div className={classes.machineBackHolder} style={{ zIndex: zIndex }}>
      <img
        src={MachineBackImagePng}
        className={classes.machineBackImage}
        style={handleStyle}
      ></img>
    </div>
  );
}

export default Handle;
