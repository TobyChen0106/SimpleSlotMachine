import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SlotMachine from '../components/SlotMachine'
import SlotMachineBack from '../components/SlotMachineBack'
import Background from '../components/Background'
import Rollers from '../components/Rollers'
import Handle from '../components/Handle'
import './firework.css'

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
            background: "radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.1) 65%)",
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
        }
    })
);

function Game() {
    const classes = useStyles({ test: "tset" });
    const [turnState, setTurnState] = useState(true);
    const [preTurnState, setPreTurnState] = useState(false);
    const [target, setTarget] = useState([0, 0, 0]);

    const [gameStatus, setGameStatus] = useState('init');
    useEffect(() => {
        if (gameStatus === 'done') {
            setTimeout(() => {
                setGameStatus('ready');
            }, 4500);
        }
    }, [gameStatus]);

    useEffect(() => {
        setTarget([6, 6, 6]);
        setGameStatus('init');
        setTimeout(() => {
            setGameStatus('ready');
        }, 5000);
    }, []);

    const handlePress = () => {
        if (gameStatus === 'ready') {
            // console.log("pressed");
            setGameStatus('pressed');
            setPreTurnState(true);
        }
    };

    const handleRelease = () => {
        if (gameStatus === 'pressed') {
            // console.log('released');
            setGameStatus('released');
            const result = [Math.floor(Math.random() * (6 - 1)) + 2, Math.floor(Math.random() * (6 - 1)) + 2, Math.floor(Math.random() * (6 - 1)) + 2];
            setTarget(result);
            setPreTurnState(false);
            setTimeout(() => {
                setGameStatus('done');
                handleResult(result);
            }, 5000);
        }
    };

    const handleResult = (result) => {
        console.log("result:", result);
    }

    return (
        <div className={classes.gameRoot}>
            <Background zIndex={0} fill="#D93B3B" />
            <div className={classes.shadow} style={{ zIndex: 1 }} />
            <SlotMachineBack zIndex={10} />
            <Rollers zIndex={50} target={target} turn={turnState} preturn={preTurnState} />
            <Handle zIndex={80} handlePress={handlePress} handleRelease={handleRelease} />
            <SlotMachine zIndex={100} />

            <div className="pyro" style={gameStatus === 'done' ? null : { display: 'none' }}>
                <div className="before"></div>
                <div className="after"></div>
            </div>
        </div>
    );
}

export default Game;