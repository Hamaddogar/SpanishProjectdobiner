import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NavBar from "../components/NavBar";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
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
    error: {
      color: "red",
      margin: 0
    },
    check: {
      fontSize: "8px"
    },
    picInput: {
      padding: "40px 40px",
      border: "silver 1px solid",
      borderRadius: "4px",
      margin: " 0px auto 15px ",
      display: "flex"
    }
  };
};

class Signup extends React.Component {
  state = {
    user: {
      avatar: "",
      email: "",
      username: "",
      password: "",
      passwordCheck: ""
    },
    checkBox: {
      checkBox1: false,
      checkBox2: false,
      checkBoxAgreement: false
    },
    currentUsersEmail: [],
    currentUsersUsername: [],
    input: {
      username: false,
      usernameTaken: false,
      email: false,
      emailTaken: false,
      password: false,
      passwordCheck: false
    }
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API}/users`)
      .then(res => {
        this.setState({
          currentUsersEmail: res.data.map(user => user.email),
          currentUsersUsername: res.data.map(user => user.username)
        });
      })
      .catch(err => {});
  }

  handleOnChange = (values, field) => {
    let checkBox = this.state.checkBox;
    checkBox[field] ? (checkBox[field] = false) : (checkBox[field] = true);
    this.setState({ checkBox });
  };

  changeField = (e, field) => {
    let user = this.state.user;

    if (user.username.length < 14) {
      user[field] = e.target.value;
      this.setState({ user });
    }
  };

  getFile = e => {
    let file = e.target.files[0];
    let user = this.state.user;
    user.avatar = file;
    this.setState({
      user: user
    });
  };

  submit = e => {
    e.preventDefault();
    let user = this.state.user;
    let currentUsersEmail = this.state.currentUsersEmail;
    let currentUsersUsername = this.state.currentUsersUsername;
    let checkBox = this.state.checkBox;

    let data = new FormData();

    data.append("image", this.state.user.avatar);
    data.append("email", this.state.user.email);
    data.append("username", this.state.user.username);
    data.append("password", this.state.user.password);

    if (
      !currentUsersEmail.includes(user.email) &&
      user.email &&
      !currentUsersUsername.includes(user.username) &&
      user.username &&
      user.avatar &&
      user.password === user.passwordCheck &&
      checkBox.checkBox1 &&
      checkBox.checkBox2
    ) {
      axios
        .post(`${process.env.REACT_APP_API}/signupAvatar`, data)
        .then(res => {
          localStorage.setItem("token", res.data.token);

          this.props.history.push("/");
        });
    }

    if (
      !currentUsersEmail.includes(user.email) &&
      user.email &&
      !currentUsersUsername.includes(user.username) &&
      user.username &&
      user.password === user.passwordCheck &&
      checkBox.checkBox1 &&
      checkBox.checkBox2
    ) {
      axios.post(`${process.env.REACT_APP_API}/signup`, data).then(res => {
        localStorage.setItem("token", res.data.token);

        this.props.history.push("/");
      });
    } else {
      let input = this.state.input;

      !user.username ? (input.username = true) : (input.username = false);

      currentUsersUsername.includes(user.username)
        ? (input.usernameTaken = true)
        : (input.usernameTaken = false);

      !user.email ? (input.email = true) : (input.email = false);

      currentUsersUsername.includes(user.email)
        ? (input.emailTaken = true)
        : (input.emailTaken = false);

      !user.password ? (input.password = true) : (input.password = false);

      user.password !== user.passwordCheck
        ? (input.passwordCheck = true)
        : (input.passwordCheck = false);

      checkBox.checkBox1 && checkBox.checkBox2
        ? (checkBox.checkBoxAgreement = false)
        : (checkBox.checkBoxAgreement = true);

      this.setState({ input });
    }
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registrar
            </Typography>
            <form onSubmit={this.submit} className={classes.form} noValidate>
              <TextField
                error={
                  this.state.input.username || this.state.input.usernameTaken
                    ? true
                    : false
                }
                variant="outlined"
                margin="normal"
                value={this.state.user.username}
                required
                fullWidth
                id="name"
                label="Nombre de usuario"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => this.changeField(e, "username")}
              />
              {this.state.input.username ? (
                <FormHelperText className={classes.error}>
                  Introducir un nomber de usuario
                </FormHelperText>
              ) : (
                ""
              )}
              {this.state.input.usernameTaken ? (
                <FormHelperText className={classes.error}>
                  Este nombre de usuario ya está registrado
                </FormHelperText>
              ) : (
                ""
              )}
              <TextField
                error={this.state.input.email}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => this.changeField(e, "email")}
              />
              {this.state.input.email ? (
                <FormHelperText className={classes.error}>
                  Introducir un correo electrónico
                </FormHelperText>
              ) : (
                ""
              )}
              {this.state.input.emailTaken ? (
                <FormHelperText className={classes.error}>
                  Este email ya está registrado
                </FormHelperText>
              ) : (
                ""
              )}
              <TextField
                error={this.state.input.password}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => this.changeField(e, "password")}
              />
              {this.state.input.password ? (
                <FormHelperText className={classes.error}>
                  Introducir una contraseña
                </FormHelperText>
              ) : (
                ""
              )}
              <TextField
                error={this.state.input.passwordCheck}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirmar contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => this.changeField(e, "passwordCheck")}
              />
              {this.state.input.passwordCheck ? (
                <FormHelperText className={classes.error}>
                  La contraseña no coincide
                </FormHelperText>
              ) : (
                ""
              )}
              <Typography
                component="div"
                variant="body1"
                style={{ margin: "10px 0 " }}
              >
                Selecciona una fotografía de perfil:
              </Typography>
              <input
                type="file"
                name="myFile"
                onChange={this.getFile}
                className={classes.picInput}
              />
              <FormControl
                required
                component="fieldset"
                className={classes.formControl}
              >
                <FormGroup>
                  <FormControlLabel
                    className={classes.check}
                    control={
                      <Checkbox
                        checked={this.state.checkBox1}
                        onChange={e => this.handleOnChange(e, "checkBox1")}
                      />
                    }
                    label="Soy mayor de 16 años"
                  />
                  <FormControlLabel
                    control={<Checkbox value="jason" />}
                    label="Estoy de acuerdo con la Política de Privacidad de la página"
                    onChange={e => this.handleOnChange(e, "checkBox2")}
                  />
                </FormGroup>
                {this.state.checkBox.checkBoxAgreement ? (
                  <FormHelperText className={classes.error}>
                    Para registrarte debes confirmar ambas opciones
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onChange={this.handleOnChange}
              >
                Registrar
              </Button>
              <Link href="/" underline="none" color="inherit" variant="h6">
                <Button fullWidth variant="contained" color="inherit">
                  Cancelar
                </Button>
              </Link>
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

export default withStyles(styles)(Signup);
