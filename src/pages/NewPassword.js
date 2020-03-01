import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NavBar from "../components/NavBar";
import CreateIcon from "@material-ui/icons/Create";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = theme => {
  return {
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    error: {
      color: "red",
      margin: 0
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    picInput: {
      width: "100%",
      padding: "40px 40px",
      border: "silver 1px solid",
      borderRadius: "4px",
      margin: " 0 ",
      display: "flex"
    },
    picError: {
      width: "100%",
      padding: "40px 40px",
      border: "red 1px solid",
      borderRadius: "4px",
      margin: " 0 0 10px",
      display: "flex"
    }
  };
};

class ForgotPassword extends React.Component {
  state = {
    user: {},
    options: [],
    topic: { user: "", title: "", category: "", categoryLabel: "" },
    input: {
      category: false,
      title: false,
      picture: false,
      user: false
    }
  };
  //

  changeField = (e, field) => {
    let topic = this.state.topic;
    topic[field] = e.target.value;
    this.setState({ topic });
  };
  //

  handleChange = event => {
    let topic = this.state.topic;
    let option = this.state.options.find(
      option => option.label === event.target.value
    );

    topic.category = option._id;
    topic.categoryLabel = option.label;

    this.setState({ topic });
  };

  changeField = (e, field) => {
    let topic = this.state.topic;
    topic[field] = e.target.value;
    this.setState({ topic });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <NavBar />
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <CreateIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Nueva Contraseña
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.submitTopic}
            >
              <Typography
                component="div"
                variant="body1"
                style={{ margin: "10px 0 " }}
              >
                Cambia tu contraseña:
              </Typography>
              <TextField
                error={this.state.input.title}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                name="title"
                autoComplete="title"
                autoFocus
                onChange={e => this.changeField(e, "title")}
              />{" "}
              <TextField
                error={this.state.input.title}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="Match Password"
                name="title"
                autoComplete="title"
                autoFocus
                onChange={e => this.changeField(e, "title")}
              />{" "}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Enviar
              </Button>
              <Link href="/" underline="none" color="inherit" variant="h6">
                <Button fullWidth variant="contained" color="inherit">
                  Cancelar
                </Button>
              </Link>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item></Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(ForgotPassword);
