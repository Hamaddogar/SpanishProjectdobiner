import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Forgotpassword from "./../pages/images/Forgotpassword.jpg";
import styles from "./style";

class Forgot extends React.Component {
  state = {
    email: "",
    showPassword: false,
    forgotpasswordmsg: null,
    invalidPasswordMsg: "Please Check Your Email",
    user: {
      password: ""
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

  handleForgot = evt => {
    evt.preventDefault();

    let email = this.email.value;

    var option = {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch("http://localhost:5000/api/forgot", option)
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res) {
          this.setState({
            forgotpasswordmsg: ` Check Your E-mail !${res}`
          });
          {
            Alert.success(`${this.state.forgotpasswordmsg}`, {
              position: "top-right"
            });
          }
        } else {
          {
            Alert.error(`${this.state.invalidPasswordMsg}`, {
              position: "top-right",
              effect: "slide"
            });
          }
        }
      })
      .catch(error => console.log(error));
  };
  render() {
    console.log();
    const { classes } = this.props;
    const { email } = this.state;

    return (
      <div className="container">
        <Card className={classes.card}>
          <CardHeader className={classes.CardHeaders} />
          <center>
            {" "}
            <img src={Forgotpassword} width="350" alt="Forgot password" />
          </center>
          <CardContent className={classes.cardContents}>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleForgot}
              onError={errors => console.log(errors)}
            >
              <div className={classes.root}>
                <TextValidator
                  inputRef={email => (this.email = email)}
                  id="outlined-email-input"
                  label="Email"
                  className={classes.textField}
                  type="email"
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChangee}
                  name="email"
                  value={email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid"
                  ]}
                />
              </div>
              <br />
              <Button
                variant="contained"
                className={classes.moveon}
                type="submit"
                color="primary"
                className={classes.button}
              >
                {" "}
                 Reset Your Password{" "}
              </Button>
            </ValidatorForm>
          </CardContent>
        </Card>
        <div>
          <Alert stack={{ limit: 1 }} />
        </div>
      </div>
    );
  }
}
Forgot.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Forgot);
