import React from "react";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
export default ({ className, to, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`button button--text button--icon ${className}`}
    aria-label={to}
  >
    <ArrowBackIcon className="icon" icon={to} />
  </button>
);
