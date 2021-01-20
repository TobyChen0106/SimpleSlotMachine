import { ReactComponent as MachineBackImage } from '../images/machine back.svg';
import MachineBackImagePng from '../images/machine back-01.svg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((
    {
        machineBackHolder: {
            position: "relative",
        },
        machineBackImage: {
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
        <div className={classes.machineBackHolder} style={{ zIndex: props.zIndex }}>
            {/* <MachineBackImage className={classes.machineBackImage} /> */}
            <img src={MachineBackImagePng} className={classes.machineBackImage}></img>
        </div>
    );
}

export default SlotMachine;
