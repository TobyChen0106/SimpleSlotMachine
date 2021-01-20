import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slot from 'react-slot-machine';
import image_0 from '../images/0.png'
import image_1 from '../images/1.png'
import image_2 from '../images/2.png'
import image_3 from '../images/3.png'
import image_4 from '../images/4.png'
import image_5 from '../images/5.png'
import image_6 from '../images/6.png'

const list = [
    { value: 0, image: image_0 },
    { value: 1, image: image_1 },
    { value: 2, image: image_2 },
    { value: 3, image: image_3 },
    { value: 4, image: image_4 },
    { value: 5, image: image_5 },
    { value: 6, image: image_6 },
];

const useStyles = makeStyles((
    {
        rollerSlot: {
            height: "30vw",
            width: "14vw"
        },
        slotItem: {
            height: "30vw",
            width: "14vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        slotItemImage: {
            width: "60%",
            height: "auto",
            opacity: 0.9,
            filter: "brightness(80%)" 
        }
    })
);

function Rollers(props) {
    const classes = useStyles();

    return (
        <Slot
            className={classes.rollerSlot}
            duration={props.duration}
            target={props.target}
            times={props.times}
        >
            {list.map(({ value, image }) => (
                <div key={`image-holder-${value}`} className={classes.slotItem}>
                    <img src={image} className={classes.slotItemImage} />
                </div>
            ))}
        </Slot>
    );
}

export default Rollers;
