import React, { useState, useEffect, useCallback } from 'react';
import MachineBackImagePng from '../images/handle.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((
    {
        machineBackHolder: {
            position: "relative",
        },
        machineBackImage: {
            width: "20vh",
            height: "40vh",
            position: "absolute",
            left: "calc(50vw + -30vh + 70vh)",
            top: "10vh",
            transitionDuration: "0.3s",
            userDrag: "none",
            userSelect: "none",
        }
    })
);

function Handle(props) {
    const classes = useStyles();
    const [handleState, setHandleState] = useState(false);

    useEffect(() => {
        document.addEventListener('mousedown', mouseDown);
        document.addEventListener('mouseup', mouseUp);
    }, []);

    const mouseDown = (e) => {
        if (e.clientX >= window.innerWidth * 0.5) {
            setHandleState(prevState => {
                if (prevState === false) {
                    props.handlePress();
                }
                return true;
            });
            setTimeout((e) => {
                mouseUp();
            }, 8000);
        }
    }

    const mouseUp = (e) => {
        setHandleState(prevState => {
            if (prevState === true) {
                props.handleRelease();
            }
            return false;
        });
    }

    const handleStyle = handleState ? {
        transform: "rotate(90deg)",
        transformOrigin: "bottom left",
    } : {
            transform: "rotate(0deg)",
            transformOrigin: "bottom left",
        };

    return (
        <div className={classes.machineBackHolder} style={{ zIndex: props.zIndex }}>
            <img src={MachineBackImagePng} className={classes.machineBackImage} style={handleStyle}></img>
        </div>
    );
}

export default Handle;
