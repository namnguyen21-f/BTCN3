import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ClearIcon from '@mui/icons-material/Clear';

import AddClassForm from "./AddClassForm";
import { Button, IconButton } from "@mui/material";

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative",
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    tr: {
        position: "absolute",
        right: 0,
        top: 0,
    }
}));

export default function PopUp({onClose, children}) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    return (
        <div>
            <Modal
                aria-labelledby="classForm"
                aria-describedby="classForm-addnewclass"
                open={true}
            >
                <div style={modalStyle} className={classes.paper}>
                    <div className={classes.tr}>
                        <IconButton onClick={() => {onClose()}}>
                            <ClearIcon></ClearIcon>
                        </IconButton>
                    </div>
                    {children}
                </div>
            </Modal>
        </div>
    );
}