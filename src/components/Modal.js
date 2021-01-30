import React, { useState, useEffect, useCallback } from "react";
import MachineBackImagePng from "../images/handle2.svg";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { FormatListBulletedOutlined } from "@material-ui/icons";

const useStyles = makeStyles({
  modal: {
    width: "80vw",
    height: "50vw",
    backgroundColor: "#cac49d",
    borderRadius: "3vw",
    border: "2vw solid #464539",
    position: "absolute",
    left: "10vw",
    top: "calc(50vh + -25vw)",
    fontSize: "5vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#181611",
  },
  button: {
    fontFamily: "GenYoGothicTW",
    fontSize: "8vw",
    width: "50vw",
    height: "30vw",
    borderRadius: "3vw",
    background: "#D93B3B",
    color: "white",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
});

function MyModal(props) {
  const classes = useStyles();
  let modalOpen = false;
  let modalContent = null;

  switch (props.gameStatus) {
    case "init":
      modalOpen = true;
      modalContent = (
        <Button
          className={classes.button}
          variant="contained"
          onClick={props.handleStartGame}
        >
          開始遊戲!
        </Button>
      );
      break;
    case "wait-money":
      modalOpen = true;
      modalContent = "請放入一百元以開始遊戲!";
      break;
    case "in-game-show-result":
      modalOpen = true;
      modalContent =
        props.reward === 0
          ? `再接再厲!`
          : `恭喜獲得 ${props.reward} 元!`;
  }

  return (
    <Modal
      open={modalOpen}
      onClose={props.handleCloseModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.modal}>{modalContent}</div>
    </Modal>
  );
}

export default MyModal;
