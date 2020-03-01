import React from "react";

import TextField from "@material-ui/core/TextField";

export default function Inputs(props) {
  return (
    <>
      <TextField
        id="TextProOpinion"
        multiline
        rows="4"
        variant="outlined"
        value={props.currentProComment.text}
        onChange={e => props.writeProComment(e, "text")}
        style={{
          width: "100%",
          margin: " 20px auto",
          background: "white",
          borderRadius: "3px"
        }}
        placeholder="Deja tu comentario"
      />
    </>
  );
}
