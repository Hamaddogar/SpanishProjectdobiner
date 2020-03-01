import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";
import RegisterButton from "../components/RegisterButton";

import "../styles/buttonAccess.css";

import { MyButton } from "./Button";

import Link from "@material-ui/core/Link";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MyButton variant="outlined" color="primary" onClick={handleClickOpen}>
        Acceso
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Iniciar sesión</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Rellena los datos para poder iniciar sesión:
          </DialogContentText>

          <TextField
            error={props.unmatched}
            autoFocus
            margin="dense"
            id="name"
            label="Nombre de usuario"
            type="Nombre de usuario"
            onChange={e => props.changeAccessField(e, "username")}
            fullWidth
          />
          {props.unmatched ? (
            <DialogContentText>
              <Link
                className="buttonaccess-dialogContent bold"
                href="/forgotPassword"
              >
                ¿Has olvidado tu contraseña?
              </Link>
            </DialogContentText>
          ) : (
            ""
          )}
          <TextField
            error={props.unmatched}
            autoFocus
            margin="dense"
            id="name"
            label="Contraseña"
            type="password"
            onChange={e => props.changeAccessField(e, "password")}
            fullWidth
          />

          <DialogContentText style={{ fontSize: "12px" }}>
            ¿No tienes cuenta?{" "}
            <Link className="buttonaccess-dialogContent" href="/registrar">
              Regístrate
            </Link>
            &nbsp; &nbsp; &nbsp;
            <Link className="buttonaccess-dialogContent" href="/forgotpassword">
            forgot Password?
            </Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={props.submitAccess} color="primary">
            Hecho
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
