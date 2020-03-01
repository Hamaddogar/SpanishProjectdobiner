import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div aria-label="share" size="small" onClick={handleClick}>
        <MoreHorizIcon />
      </div>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Editar</MenuItem>

        <MenuItem onClick={() => props.deleteTopic(props.topic)}>
          Eliminar
        </MenuItem>
      </Menu>
    </div>
  );
}
