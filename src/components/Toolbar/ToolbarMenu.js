import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const loggedIn = true;

const styles = theme => ({
  root: {
    display: "flex"
  },
  paper: {
    marginTop: theme.spacing.unit / 4
  },
  accountButton: {
    marginRight: -theme.spacing.unit * 1.5,
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  navLink: {
    textDecoration: "none",
    color: "inherit"
  }
});

class MenuListComposition extends React.Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <IconButton
          className={classes.accountButton}
          buttonRef={node => {
            this.anchorEl = node;
          }}
          color="inherit"
          aria-label="Account"
          aria-owns={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem onClick={this.handleClose}>
                      {loggedIn ? (
                        <NavLink className={classes.navLink} to={"/profile"}>
                          Profile
                        </NavLink>
                      ) : (
                        <NavLink className={classes.navLink} to={"/login"}>
                          Login
                        </NavLink>
                      )}
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                      {loggedIn ? (
                        <NavLink className={classes.navLink} to={"/logout"}>
                          Logout
                        </NavLink>
                      ) : (
                        <NavLink className={classes.navLink} to={"/signup"}>
                          Signup
                        </NavLink>
                      )}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuListComposition);
