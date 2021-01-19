import { ReactComponent as MachineBackImage } from '../images/machine back.svg';
import MachineBackImagePng from '../images/machine back.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((
    {
        machineBackHolder: {
            position: "relative",
        },
        machineBackImage: {
            width: "110vh",
            height: "110vh",
            position: "absolute",
            left: "calc(50vw + -55vh)",
            top: "-5vh"
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
