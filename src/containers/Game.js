import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SlotMachine from '../components/SlotMachine'
import SlotMachineBack from '../components/SlotMachineBack'
import Background from '../components/Background'
import Rollers from '../components/Rollers'
import Handle from '../components/Handle'
import { ReactComponent as BackGroundImage } from '../images/sun.svg';

const useStyles = makeStyles((
    {
        gameRoot: {
            width: "100vw",
            height: "100vh",
            backgroundColor: "#227373",
            position: "relative",
            overflow: "hidden",
        },
        shadow: {
            background: "rgb(0,0,0)",
            background: "radial-gradient(circle, rgba(0,0,0,7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 65%)",
            boxShadow: "0 0 2.5vh 5vh rgba(0,0,0,0.1)",
            width: "120vh",
            height: "120vh",
            borderRadius: "50%",
            position: "absolute",
            left: "calc(50vw + -60vh)",
            top: "0vh",
        },
        turnButton: {
            width: "10vh",
            height: "10vh",
            borderRadius: "50%",
            position: "absolute",
            left: "calc(50vw-5vh)",
            top: "80vh",
        }
    })
);

let ok = true;

function Game() {
    const classes = useStyles({ test: "tset" });
    const [turnState, setTurnState] = useState(true);
    const [preTurnState, setPreTurnState] = useState(false);
    const [target, setTarget] = useState([0, 0, 0]);

    const handlePress = () => {
        // console.log("press");
        // if (ok === true) {
        //     setPreTurnState(true);
        // }
    };

    const handleRelease = () => {
        // if (ok === true) {
        //     const result = [Math.floor(Math.random() * (6 - 3)) + 2, Math.floor(Math.random() * (6 - 3)) + 2, Math.floor(Math.random() * (6 - 3)) + 2];
        //     setTarget(result);
        //     setPreTurnState(false);
        //     ok = false;
        //     setTimeout(() => {
        //         ok = true;
        //         handleResult(result);
        //     }, 6000);
        // }
    };

    const handleResult = (result) => {
        console.log("result:", result);
    }

    return (
        <div className={classes.gameRoot}>
            {/* <Background zIndex={0} fill="#D93B3B" /> */}
            <div className={classes.shadow} style={{ zIndex: 1 }} />
            <SlotMachineBack zIndex={10} />
            <Rollers zIndex={50} target={target} turn={turnState} preturn={preTurnState} />
            <Handle zIndex={80} handlePress={handlePress} handleRelease={handleRelease} />
            {/* <SlotMachine zIndex={100} /> */}
            {/* <button className={classes.turnButton} onClick={() => turn()} style={{ zIndex: 1000 }}>Turn</button> */}

        </div>
    );
}

export default Game;