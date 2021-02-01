import React, { useState, useEffect, useCallback } from "react";
import MachineBackImagePng from "../images/handle.png";
import { makeStyles } from "@material-ui/core/styles";

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

function Handle(props) {
  const classes = useStyles();

  useEffect(() => {
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("touchstart", mouseDownt);
    document.addEventListener("touchend", mouseUp);
  }, []);

  const [handleState, setHandleState] = useState(null);
  useEffect(() => {
    if (handleState === true) {
      props.handlePress();
    } else if (handleState === false) {
      props.handleRelease();
    }
  }, [handleState]);

  const [enable, setEnable] = useState(true);

  //   switch (props.gameStatus) {
  //     case "init":
  //       setEnable(false);
  //       break;
  //     case "in-game-ready":
  //       setEnable(true);
  //       break;
  //   }

  const mouseDown = (e) => {
    // e.preventDefault();
    if (e.clientX >= window.innerWidth * 0.5) {
      setHandleState(true);
    }
  };

  const mouseDownt = (e) => {
    // e.preventDefault();
    if (e.touches[0].clientX >= window.innerWidth * 0.5) {
      setHandleState(true);
    }
  };

  const mouseUp = (e) => {
    // e.preventDefault();
    setHandleState(false);
  };

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
    <div className={classes.machineBackHolder} style={{ zIndex: props.zIndex }}>
      <img
        src={MachineBackImagePng}
        className={classes.machineBackImage}
        style={handleStyle}
      ></img>
    </div>
  );
}

export default Handle;
