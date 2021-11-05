import React , {useState , useEffect} from 'react'
import { Container ,Box, Grid, Link , TextField , Typography, FormControlLabel,
    Checkbox, Button, Copyright} from '@mui/material';
import axios from 'axios'
import { makeStyles } from '@mui/styles';
import api from '../uri'

const useStyles = makeStyles(() => ({
    paper: {
      marginTop: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: "1rem",
    },
    submit: {
      display: "block",
      margin: "3rem 0rem",
    },
    ctn:{
      background: "linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)",
    }
  }));

function SignupPage() {
  const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userName, setuserName] = useState("")
  const [phone, setPhone] = useState("")

  const classes = useStyles();
  
  useEffect(() => {
    
  }, [])

  function onSubmitClassForm(e) {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
      userName,
      phone 
    }
    axios.post(api +  'signup' , data)
    .then(response => {
      window.location.href = "/login";
    });
  } 

  return (
    <Container  component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => {setfirstName(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={(e) => {setlastName(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="username"
                label="Username"
                type="text"
                id="username"
                onChange={(e) => {setuserName(e.target.value)}}
                value={userName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
           
                fullWidth
                name="phone"
                label="Phone"
                type="number"
                id="phone"
                onChange={(e) => {setPhone(e.target.value)}}
                value={phone}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Remember Me"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e) => {onSubmitClassForm(e)}}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid mt={2} container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
    
      </Box>
    </Container>
  );
}

export default SignupPage;