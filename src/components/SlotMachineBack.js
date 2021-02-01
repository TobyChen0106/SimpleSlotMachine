import MachineBackImagePng from '../images/base-back.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((
    {
        machineBackHolder: {
            position: "relative",
        },
        machineBackImage: {
            width: "100vw",
            height: "100vh",
            position: "absolute",
            left: 0,
            top: 0,
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
