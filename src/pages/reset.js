import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { Link } from "react-router-dom";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import forgotpassword from "./images/forgotpassword.png";
import styles from "./style";

class Reset extends React.Component {
  state = {
    email: "",
    showPassword: false,
    successMsg: " ",
    errorMsg: "Sorry! Your Password Not changed",
    user: {
      password: "",
      confirmPasswaord: ""
    }
  };

  handleChange = event => {
    const { user } = this.state;
    user[event.target.name] = event.target.value;
    this.setState({ user });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleChangee = event => {
    const email = event.target.value;
    this.setState({ email });
  };
  componentDidMount() {
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.user.password) {
        return false;
      }
      return true;
    });
  }

  handleChange = event => {
    const { user } = this.state;
    user[event.target.name] = event.target.value;
    this.setState({ user });
  };

  resetSubmit = evt => {
    evt.preventDefault();

    var option = {
      method: "POST",
      body: JSON.stringify({
        password: this.password.value,
        confirmPasswaord: this.confirmPasswaord.value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(
      "http://localhost:5000/api/resetpassword/" +
        this.props.match.params.token,
      option
    )
      .then(res => {
        return res.json();
      })
      .then(user => {
        if (user) {
          this.setState({
            forgotpasswordmsg: "SUCCESSFULLY ! Your Password  Has Been Change"
          });
          {
            Alert.success(`${this.state.forgotpasswordmsg}`, {
              position: "top-right"
            });
          }
        } else {
          {
            Alert.error(`${this.state.errorMsg}`, {
              position: "top-right",
              effect: "slide"
            });
          }
        }
      })

      .catch(error => console.log(error));
  };

  render() {
    const { classes } = this.props;
    const { user } = this.state;
    return (
      <div className="container">
        <Card className={classes.card}>
          <CardHeader className={classes.CardHeaders} />
          <center>
            <img src={forgotpassword} />
          </center>
          <CardContent className={classes.cardContents}>
            <ValidatorForm
              ref="form"
              onSubmit={this.resetSubmit}
              onError={errors => console.log(errors)}
            >
              <div className={classes.root}>
                <TextValidator
                  inputRef={password => (this.password = password)}
                  id="outlined-adornment-password"
                  className={classNames(classes.margin, classes.textFieldd)}
                  variant="outlined"
                  type={this.state.showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end"></InputAdornment>
                    )
                  }}
                  label="Password"
                  onChange={this.handleChange}
                  name="password"
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  value={user.password}
                  label="Password"
                  onChange={this.handleChange}
                  name="password"
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  value={user.password}
                />
              </div>
              <div className={classes.container}>
                <TextValidator
                  inputRef={confirmPasswaord =>
                    (this.confirmPasswaord = confirmPasswaord)
                  }
                  id="outlined-adornment-password"
                  className={classNames(classes.margin, classes.textFieldd)}
                  variant="outlined"
                  type={this.state.showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  label="confirmPasswaord"
                  onChange={this.handleChange}
                  name="confirmPasswaord"
                  validators={["isPasswordMatch", "required"]}
                  errorMessages={[
                    " Your password  didnot Match",
                    "this field is required"
                  ]}
                  value={user.confirmPasswaord}
                />
              </div>
              <br />

              <div className="movetoRight">
                {" "}
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  className={classes.button}
                >
                  Reset Your Password{" "}
                </Button>{" "}
              </div>
            </ValidatorForm>
            <div className={classes.moveon}>
              {" "}
              Now For Login ? click Here <Link to="/">Login</Link>
            </div>
          </CardContent>
        </Card>
        <div>
          <Alert stack={{ limit: 1 }} />
        </div>
      </div>
    );
  }
}
Reset.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Reset);
