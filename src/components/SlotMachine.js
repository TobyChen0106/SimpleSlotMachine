import { ReactComponent as MachineFrontImage } from '../images/machine front2.svg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((
    {
        machineFrontHolder: {
            position: "relative",
        },
        machineFrontImage: {
            width: "100vw",
            height: "100vw",
            position: "absolute",
            left: "0vw",
            top: "calc(50vh + -50vw )",
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