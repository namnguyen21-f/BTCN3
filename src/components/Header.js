import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { TextField } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
const useStyles = makeStyles({
    root: {
      padding: ".5rem 2rem",
      borderBottom: "1px solid black"
    },
    input: {
        padding: 0,
        "& input" : {
            padding: "0.5rem",
        }
    }
  });

export default function Header({className , onAddClassHandle}){
    const classes = useStyles();
    return (
        <header className={classes.root}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container justifyContent={"space-between"} spacing={2}>
                    <Grid item>
                        <Box display={"flex"} alignItems="center">
                            <IconButton>
                                <MenuIcon></MenuIcon>
                            </IconButton>
                            
                            <Typography ml={2} variant="h5" component="div">
                                {className}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item >
                        
                    </Grid>
                    <Grid item >
                        <Box display={"flex"} alignItems="center">
                            <TextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <IconButton >
                                                <SearchIcon></SearchIcon>
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                className={classes.input}
                            />
                            
                            <Tooltip title="Add Classroom">
                                <IconButton onClick={() => {onAddClassHandle()}}>
                                    <AddIcon></AddIcon>
                                </IconButton>
                            </Tooltip>
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>H</Avatar>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </header>
    )

}