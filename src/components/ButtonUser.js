import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Link from "@material-ui/core/Link";

import { MyButton } from "./Button";
import DataUsageIcon from "@material-ui/icons/DataUsage";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export default function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MyButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <AccountCircleIcon fontSize="small" style={{ marginRight: "5px" }} />
        Usuario
      </MyButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {" "}
        Usuario: {props.user.username}
        <Link href="/perfil" color="inherit" variant="h6" underline="none">
          <StyledMenuItem>
            <ListItemIcon>
              <DataUsageIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Ajustes" />
          </StyledMenuItem>
        </Link>
        <StyledMenuItem>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Salir" onClick={props.logOut} />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
