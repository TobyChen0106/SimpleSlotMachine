import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  modal: {
    outline: "none",
    width: "80vw",
    height: "20vw",
    backgroundColor: "#47073b",
    borderRadius: "3vw",
    border: "1vw solid #ffdffd",
    position: "absolute",
    left: "10vw",
    top: "10vw",
    fontSize: "5vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    opacity: 0.8,
    boxShadow: `
            0 0 1.5vw #ffdffd,
            inset 0 0 1.5vw #ffdffd`,
  },
  button: {
    opacity: 1,
    fontFamily: "GenYoGothicTW",
    fontSize: "4vw",
    width: "30vw",
    height: "12vw",
    borderRadius: "3vw",
    background: "#D93B3B",
    color: "white",
    background: "linear-gradient(45deg, #f15c76 30%, #feff67 90%)",
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
      modalContent = "請放入 一百元 開始遊戲!";
      break;
    case "in-game-show-result":
      modalOpen = true;
      modalContent =
        Number(props.reward) === 0 ? `可惜沒中獎，再接再厲!` : `恭喜獲得 ${props.reward} 元!`;
  }

  return (
    <Modal
      // open={false}
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
