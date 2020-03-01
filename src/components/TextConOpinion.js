import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },

    input: {
      margin: theme.spacing(1)
    }
  }
}));

export default function Inputs(props) {
  const classes = useStyles();
  const { writeConOpinion, currentConOpinion } = props;
  return (
    <>
      <div className={classes.container}>
        <Input
          value={currentConOpinion.title}
          placeholder="Título"
          className={classes.input}
          inputProps={{
            "aria-label": "description"
          }}
          onChange={e => writeConOpinion(e, "title")}
        />
      </div>
      <div className={classes.container}>
        <TextField
          id="TextProOpinion"
          multiline
          rows="4"
          variant="outlined"
          value={currentConOpinion.text}
          onChange={e => writeConOpinion(e, "text")}
          style={{
            width: "100%",
            margin: " 20px auto",
            background: "white",
            borderRadius: "3px"
          }}
          placeholder="Deja tu opinión"
        />
      </div>
    </>
  );
}
