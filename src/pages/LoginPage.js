import React , {useState , useEffect} from 'react'
import { Container ,Box, Grid, Link , TextField , Typography, FormControlLabel,
    Checkbox, Button, Copyright} from '@mui/material';
import axios from 'axios'
import { makeStyles } from '@mui/styles';
import api from '../uri';
import GoogleLogin from 'react-google-login';
import FacebookLogin from "react-facebook-login";

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

function LoginPage() {
  const [email, setEmail] = useState("")
  const [hpem, sethpem] = useState("")
  const [password, setPassword] = useState("")
  const [hppa, sethppa] = useState("")

  const classes = useStyles();
  
  useEffect(() => {
    
  }, [])

  function onSubmitForm(e) {
    e.preventDefault();
    axios.post(api +  'signin' , {email, password})
    .then(response => {
      let message = response.data.message;
      let token = response.data.token;
      localStorage.setItem('Authorization', 'Bearer ' + token);
      window.location.href = "/";
    }).catch(err => {
      
      if (err.response.data.message === "User is not registered"){
        sethpem("Email is invalid");
      }else {
        sethppa(err.response.data.message);
      }
      
    });
  }

  const responseGoogle= response=>{
    console.log(response);
    axios({
      method: "POST",
      url: api + 'googleLogin',
      data: {tokenId: response.tokenId}
    })
    .then(response=>{
      console.log("Google login successful, client side", response);
    })
  }

  const responseFacebook= response=>{
    console.log(response);
    axios({
      method: "POST",
      url: api + 'facebookLogin',
      data: {accessToken: response.accessToken, userID: response.userID}
    })
    .then(response=>{
      console.log("Facebook login successful, client side", response);
    })
  }

  return (
    <Container  component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
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
                error={hpem != ""}
                helperText={hpem}
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
                error={hppa != ""}
                helperText={hppa}
                onChange={(e) => {setPassword(e.target.value)}}
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

            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {onSubmitForm(e)}}
          >
            Sign In
          </Button>
          <Grid mt={2} container justify="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                Do not have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
        <GoogleLogin
          clientId="405769286115-ccpu4vsplvrfttij8im3r7hbhsoupg1h.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <FacebookLogin
          appId="933127567412923"
          autoLoad={false}
          callback={responseFacebook}/>
      </div>
      <Box mt={5}>
    
      </Box>
    </Container>
  );
}

export default LoginPage;