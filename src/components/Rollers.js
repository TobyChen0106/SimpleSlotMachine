import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slot from 'react-slot-machine';
import SingleSlot from './SingleSlot'

const useStyles = makeStyles((
    {
        rollersHolder: {
            display: "flex",
            position: "absolute",
            height: "12vh",
            width: "36vh",
            left: "calc(50vw + -18vh)",
            top: "43vh",
        },
    })
);

function Rollers(props) {
    const classes = useStyles();
    const preturn = props.preturn;

    return (
        <div className={classes.rollersHolder} style={{ zIndex: props.zIndex }}>
            <SingleSlot
                duration={preturn ? 8000 : 1500}
                times={preturn ? 30 : 5}
                turnState={props.turn}
                target={preturn ? 1 : props.target[0]}
            />
            <SingleSlot
                duration={preturn ? 8000 : 3500}
                times={preturn ? 30 : 10}
                turnState={props.turn}
                target={preturn ? 1 : props.target[1]}
            />
            <SingleSlot
                duration={preturn ? 8000 : 5000}
                times={preturn ? 30 : 15}
                turnState={props.turn}
                target={preturn ? 1 : props.target[2]}
            />
        </div>
    );
}

export default Rollers;
