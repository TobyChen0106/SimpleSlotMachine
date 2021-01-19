import { makeStyles } from '@material-ui/core/styles';
import SlotMachine from '../components/SlotMachine'
import { ReactComponent as BackGroundImage } from '../images/sun.svg';

const useStyles = makeStyles(theme => (
    {
        gameRoot: {
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "#227373",
        },
        gameBackgroundHolder: {
            position: "relative",
        },
        gameBackgroundImage: {
            position: "absolute",
            left: "-25vw",
            top: "calc(-75vw + 50vh)",

            width: "150vw",
            height: "150vw",
            userDrag: "none",
            userSelect: "none",
            "-webkit-user-drag": "none",
            "-webkit-user-select": "none",
            animation: `$rotate 120s infinite linear`,
            overflow: "hidden",
            zIndex: 1,
        },
        "@keyframes rotate": {
            "0%": { transform: "rotate(0deg)" },
            // "50%": { transform: "rotate(180deg)" },
            "100%": { transform: "rotate(360deg)" }
        },
        slotMachine: {
        }
    })
);

function Game() {
    const classes = useStyles();

    return (
        <div className={classes.gameRoot}>
            <div className={classes.gameBackgroundHolder}>
                <BackGroundImage className={classes.gameBackgroundImage} fill="#D93B3B" />
            </div>
            <SlotMachine className={classes.slotMachine} />
        </div>
    );
}

export default Game;