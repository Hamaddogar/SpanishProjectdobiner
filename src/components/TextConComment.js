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
        value={props.currentConComment.text}
        onChange={e => props.writeConComment(e, "text")}
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
