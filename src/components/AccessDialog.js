import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Typography from "@material-ui/core/Typography";

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
      <Typography variant="body2" onClick={handleClickOpen}>
        {"¿Ya tienes una cuenta? Accede"}
      </Typography>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Iniciar sesión</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rellena los datos para poder iniciar sesión
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
          <DialogContentText>
            ¿No tienes cuenta? <span>Regístrate</span>
          </DialogContentText>
        </DialogContent>
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
