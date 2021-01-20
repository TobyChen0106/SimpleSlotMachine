import { ReactComponent as MachineFrontImage } from '../images/machine front.svg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((
    {
        machineFrontHolder: {
            position: "relative",
        },
        machineFrontImage: {
            width: "110vw",
            height: "110vw",
            position: "absolute",
            left: "-10vw",
            top: "calc(50vh + -55vw )",
            userDrag: "none",
            userSelect: "none",
        }
    })
);

function SlotMachine(props) {
    const classes = useStyles();
    return (
        <div className={classes.machineFrontHolder} >
            <MachineFrontImage className={classes.machineFrontImage} style={{ zIndex: props.zIndex }} />
        </div>
    );
}

export default SlotMachine;