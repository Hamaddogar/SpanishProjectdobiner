import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { styled } from "@material-ui/core/styles";
import { MyButton } from "./Button";
import Checkbox from "./Checkbox";

export default function FormDialog() {
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
        Registrar
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Regístrate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rellena los datos para poder formar parte de la comunidad de debate
            más grande del mundo
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Verificar contraseña"
            type="password"
            fullWidth
          />
        </DialogContent>
        <Checkbox />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Hecho
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
