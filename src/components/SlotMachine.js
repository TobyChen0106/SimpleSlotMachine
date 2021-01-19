import { ReactComponent as MachineFrontImage } from '../images/machine front.svg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((
    {
        machineFrontHolder: {
            position: "relative",
        },
        machineFrontImage: {
            width: "110vh",
            height: "110vh",
            position: "absolute",
            left: "calc(50vw + -55vh)",
            top: "-5vh",
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