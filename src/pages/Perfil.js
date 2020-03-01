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
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import Hidden from "@material-ui/core/Hidden";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Debatimos © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const styles = theme => {
  return {
    root: {
      "& > *": {
        margin: theme.spacing(1)
      }
    },
    body: {
      backgroundColor: theme.palette.common.white
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
    },
    bigAvatar: {
      margin: 10,
      width: 150,
      height: 150,
      border: "0.5px solid silver",
      display: "flex",
      float: "left"
    }
  };
};

class Signup extends React.Component {
  state = {
    user: { username: "" },
    checkBox: {
      checkBox1: false,
      checkBox2: false,
      checkBoxAgreement: false
    },
    password: {
      password: "",
      checkPassword: "",
      newPassword: ""
    },
    currentUsersEmail: [],
    currentUsersUsername: [],
    currentUser: {},
    input: {
      username: false,
      usernameTaken: false,
      email: false,
      emailTaken: false,
      password: false,
      newPasswordCheck: false,
      newPassword: false,
      wrongPassword: false,
      avatar: false
    },
    edit: {
      username: true,
      email: true,
      file: true
    }
  };
  componentDidMount() {
    let token = localStorage.getItem("token");
    Promise.all([
      axios.get(`${process.env.REACT_APP_API}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      axios.get(`${process.env.REACT_APP_API}/users`)
    ]).then(([userAsigned, users]) => {
      let user = this.state.user;
      let currentUser = this.state.currentUser;
      currentUser = Object.assign({}, userAsigned.data);
      user = userAsigned.data;

      let currentUsersEmail = this.state.currentUsersEmail;
      let currentUsersUsername = this.state.currentUsersUsername;
      currentUsersEmail = users.data.map(user => user.email);
      currentUsersUsername = users.data.map(user => user.username);
      this.setState({
        currentUser,
        currentUsersEmail,
        currentUsersUsername,
        user
      });
    });
  }

  enable = e => {
    let edit = this.state.edit;
    edit[e] = false;
    this.setState({
      edit
    });
  };

  changeField = (e, field) => {
    let currentUser = this.state.currentUser;

    currentUser[field] = e.target.value;

    this.setState({ currentUser });
  };

  changeFieldPassword = (e, field) => {
    let password = this.state.password;

    password[field] = e.target.value;

    this.setState({ password });
  };

  editName = e => {
    e.preventDefault();
    let currentUser = this.state.currentUser;
    let currentUserUsername = {};
    currentUserUsername.username = this.state.currentUser.username;
    let currentUsersUsername = this.state.currentUsersUsername;
    let edit = this.state.edit;

    if (
      currentUser.username &&
      !currentUsersUsername.includes(currentUser.username)
    ) {
      let token = localStorage.getItem("token");

      axios.patch(`${process.env.REACT_APP_API}/user`, currentUserUsername, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      axios
        .patch(`${process.env.REACT_APP_API}/user`, currentUserUsername, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          localStorage.setItem("token", res.data);
          let user = this.state.user;
          user.username = currentUser.username;
          edit.username = true;
          this.setState({ user, edit });
        })
        .then(res => {});
    } else {
      let input = this.state.input;
      !currentUser.username
        ? (input.username = true)
        : (input.username = false);

      currentUsersUsername.includes(currentUser.username)
        ? (input.usernameTaken = true)
        : (input.usernameTaken = false);
      this.setState({ input });
    }
  };
  editEmail = e => {
    e.preventDefault();
    let currentUser = this.state.currentUser;
    let currentUserEmail = {};
    currentUserEmail.email = this.state.currentUser.email;
    let currentUsersEmail = this.state.currentUsersEmail;
    let edit = this.state.edit;

    if (currentUser.email && !currentUsersEmail.includes(currentUser.email)) {
      let token = localStorage.getItem("token");

      axios.patch(`${process.env.REACT_APP_API}/user`, currentUserEmail, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      axios
        .patch(`${process.env.REACT_APP_API}/user`, currentUserEmail, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          localStorage.setItem("token", res.data);
          let user = this.state.user;
          user.username = currentUser.username;
          edit.email = true;
          this.setState({ user, edit });
        });
    } else {
      let input = this.state.input;

      !currentUser.email ? (input.email = true) : (input.email = false);

      currentUsersEmail.includes(currentUser.email)
        ? (input.emailTaken = true)
        : (input.emailTaken = false);
      this.setState({ input });
    }
  };

  editPassword = e => {
    e.preventDefault();
    let input = this.state.input;
    let password = this.state.password;
    input.wrongPassword = false;
    input.password = false;
    input.newPassword = false;
    input.newPasswordCheck = false;

    if (
      password.password &&
      password.newPassword &&
      password.newPassword === password.newPasswordCheck
    ) {
      let token = localStorage.getItem("token");
      axios
        .patch(`${process.env.REACT_APP_API}/password`, password, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          if (res.data) {
            localStorage.setItem("token", res.data);
            password.password = "";
            password.newPassword = "";
            password.newPasswordCheck = "";
          } else {
            input.wrongPassword = true;
            input.password = false;
            input.newPassword = false;
            input.newPasswordCheck = false;
          }

          this.setState({ password });
        });
    } else {
      if (!password.password) {
        input.password = true;
      } else {
        input.password = false;
        if (!password.newPassword) {
          input.newPassword = true;
        } else {
          input.newPassword = false;
          if (password.newPassword === password.newPasswordCheck) {
            input.newPasswordCheck = false;
          } else {
            input.newPasswordCheck = true;
          }
        }
      }

      this.setState({ input });
    }
  };

  editAvatar = e => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    let input = this.state.input;
    input.avatar = false;

    let data = new FormData();
    if (this.state.currentUser.avatar !== this.state.user.avatar) {
      data.append("image", this.state.currentUser.avatar);
      data.append("email", this.state.user.email);
      data.append("username", this.state.user.username);
      data.append("password", this.state.user.password);

      axios.patch(`${process.env.REACT_APP_API}/avatar`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      axios
        .patch(`${process.env.REACT_APP_API}/avatar`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          localStorage.setItem("token", res.data);
          window.location.reload();
        });
    } else {
      input.avatar = true;

      this.setState({ input });
    }
  };

  getFile = e => {
    let file = e.target.files[0];
    let edit = this.state.edit;
    let currentUser = this.state.currentUser;
    currentUser.avatar = file;
    file ? (edit.file = false) : (edit.file = true);
    this.setState({
      currentUser
    });
  };

  render() {
    const { classes } = this.props;
    let input = this.state.input;
    let password = this.state.password;
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
              Perfil
            </Typography>
            <Avatar
              alt={this.state.username}
              src={this.state.user.avatar}
              className={classes.bigAvatar}
            />
            <form className={classes.form} noValidate>
              <div style={{ display: "flex" }}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={this.state.currentUser.username}
                  InputProps={{
                    readOnly: this.state.edit.username
                  }}
                  error={
                    this.state.input.username || this.state.input.usernameTaken
                      ? true
                      : false
                  }
                  variant={this.state.edit.username ? "filled" : "outlined"}
                  id="standard-name"
                  margin="normal"
                  required
                  fullWidth
                  label="Nombre de usuario"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  onChange={e => this.changeField(e, "username")}
                />
                <Hidden xsDown>
                  <Grid
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 0,

                      position: "relative",
                      left: 60
                    }}
                    item
                  >
                    <ButtonGroup
                      variant="contained"
                      size="small"
                      aria-label="small contained button group"
                    >
                      <Button
                        disabled={!this.state.edit.username}
                        onClick={() => this.enable("username")}
                        color="primary"
                      >
                        <EditIcon fontSize="small" />
                      </Button>
                      <Button
                        disabled={this.state.edit.username}
                        onClick={this.editName}
                        color="secondary"
                      >
                        <CheckIcon />
                      </Button>
                    </ButtonGroup>
                  </Grid>
                </Hidden>
              </div>
              <Hidden smUp>
                <Grid
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 0 10px"
                  }}
                  item
                >
                  <ButtonGroup
                    variant="contained"
                    size="small"
                    aria-label="small contained button group"
                  >
                    <Button
                      disabled={!this.state.edit.username}
                      onClick={() => this.enable("username")}
                      color="primary"
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                    <Button
                      disabled={this.state.edit.username}
                      onClick={this.editName}
                      color="secondary"
                    >
                      <CheckIcon />
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Hidden>
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
              <div style={{ display: "flex" }}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: this.state.edit.email
                  }}
                  id="standard-name"
                  value={this.state.currentUser.email}
                  error={this.state.input.email || this.state.input.emailTaken}
                  variant={this.state.edit.email ? "filled" : "outlined"}
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={e => this.changeField(e, "email")}
                />
                <Hidden xsDown>
                  <Grid
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 0,
                      position: "relative",
                      left: 60
                    }}
                    item
                  >
                    <ButtonGroup
                      variant="contained"
                      size="small"
                      aria-label="small contained button group"
                    >
                      <Button
                        disabled={!this.state.edit.email}
                        onClick={() => this.enable("email")}
                        color="primary"
                      >
                        <EditIcon fontSize="small" />
                      </Button>
                      <Button
                        disabled={this.state.edit.email}
                        onClick={this.editEmail}
                        color="secondary"
                      >
                        <CheckIcon />
                      </Button>
                    </ButtonGroup>
                  </Grid>
                </Hidden>
              </div>
              <Hidden smUp>
                <Grid
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  item
                >
                  <ButtonGroup
                    variant="contained"
                    size="small"
                    aria-label="small contained button group"
                  >
                    <Button
                      disabled={!this.state.edit.email}
                      onClick={() => this.enable("email")}
                      color="primary"
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                    <Button
                      disabled={this.state.edit.email}
                      onClick={this.editEmail}
                      color="secondary"
                    >
                      <CheckIcon />
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Hidden>
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
              <Typography
                component="div"
                variant="body1"
                style={{ margin: "40px 0 0" }}
              >
                Cambiar contraseña:
              </Typography>
              <TextField
                error={
                  this.state.input.password || this.state.input.wrongPassword
                }
                value={this.state.password.password}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña actual"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => this.changeFieldPassword(e, "password")}
              />
              {this.state.input.password ? (
                <FormHelperText className={classes.error}>
                  Introducir contraseña actual
                </FormHelperText>
              ) : (
                ""
              )}
              {this.state.input.wrongPassword ? (
                <FormHelperText className={classes.error}>
                  Contraseña actual incorrecta
                </FormHelperText>
              ) : (
                ""
              )}
              <TextField
                error={this.state.input.newPassword}
                value={this.state.password.newPassword}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Nueva contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => this.changeFieldPassword(e, "newPassword")}
              />
              {this.state.input.newPassword ? (
                <FormHelperText className={classes.error}>
                  Introducir nueva contraseña
                </FormHelperText>
              ) : (
                ""
              )}
              <div style={{ display: "flex" }}>
                <TextField
                  error={this.state.input.newPasswordCheck}
                  value={this.state.password.newPasswordCheck}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Confirmar nueva contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={e =>
                    this.changeFieldPassword(e, "newPasswordCheck")
                  }
                />
              </div>
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "10px"
                }}
                item
              >
                <ButtonGroup
                  variant="contained"
                  size="small"
                  aria-label="small contained button group"
                >
                  <Button
                    disabled={
                      password.password &&
                      password.newPassword &&
                      password.newPasswordCheck
                        ? false
                        : true
                    }
                    onClick={this.editPassword}
                    color="secondary"
                  >
                    Modificar contraseña
                  </Button>
                </ButtonGroup>
              </Grid>
              {this.state.input.newPasswordCheck ? (
                <FormHelperText className={classes.error}>
                  La nueva contraseña no coincide
                </FormHelperText>
              ) : (
                ""
              )}
              <Typography
                component="div"
                variant="body1"
                style={{ margin: "40px 0 20px" }}
              >
                Editar fotografía de perfil:
              </Typography>
              <input
                style={{ width: "100%" }}
                type="file"
                name="myFile"
                onChange={this.getFile}
                className={classes.picInput}
              />{" "}
              {this.state.input.avatar ? (
                <FormHelperText className={classes.error}>
                  Adjuntar una nueva imagen
                </FormHelperText>
              ) : (
                ""
              )}
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "10px"
                }}
                item
              >
                <ButtonGroup
                  variant="contained"
                  size="small"
                  aria-label="small contained button group"
                  onClick={this.editAvatar}
                >
                  <Button color="secondary" disabled={this.state.edit.file}>
                    Subir nuevo avatar
                  </Button>
                </ButtonGroup>
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

export default withStyles(styles)(Signup);
