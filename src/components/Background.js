import { ReactComponent as BackGroundImage } from '../images/sun.svg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((
    {
        backGroundHolder: {
            position: "relative",
        },
        backGroundImage: {
            position: "absolute",
            left: "calc(-75vh + 50vw)",
            top: "-25vh",
            width: "150vh",
            height: "150vh",
            animation: `$rotate 60s infinite linear`,
            overflow: "hidden",
        },
        "@keyframes rotate": {
            "0%": { transform: "rotate(0deg)" },
            // "50%": { transform: "rotate(180deg)" },
            "100%": { transform: "rotate(360deg)" }
        },
    })
);

function SlotMachine(props) {
    const classes = useStyles();
    return (
        <div className={classes.backGroundHolder} style={{ zIndex: props.zIndex }}>
            <BackGroundImage className={classes.backGroundImage} fill={props.fill}/>
        </div>
    );
}

export default SlotMachine;
