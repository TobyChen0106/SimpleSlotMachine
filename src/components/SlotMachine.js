import MachineFrontImageSrc from '../images/base-front.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((
    {
        machineFrontHolder: {
            position: "relative",
        },
        machineFrontImage: {
            width: "100vw",
            height: "100vh",
            position: "absolute",
            left: 0,
            top: 0,
            userDrag: "none",
            userSelect: "none",
        },
        version:{
            fontSize: "1vw",
            position: "absolute",
            right: "15vw",
            bottom: "1vw",
            color: "#962543"
        }
    })
);

function SlotMachine(props) {
    const classes = useStyles();
    return (
        <>
            <div className={classes.machineFrontHolder} >
                <img src={MachineFrontImageSrc} className={classes.machineFrontImage} style={{ zIndex: props.zIndex }} />
            </div>
            <div  className={classes.version} style={{ zIndex: props.zIndex+1 }}>{`Ver. ${props.version}`}</div>
        </>
    );
}

export default SlotMachine;