import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { logout } from '../../actions/authActions';

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginTop: theme.spacing.unit / 4,
  },
  accountButton: {
    marginRight: -theme.spacing.unit * 1.5,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  navLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

class MenuListComposition extends React.Component {
  state = {
    open: false,
  };

  handleLogout = () => {
    this.props.logout(this.props.firebase);
  };

  handleToggle = () => {
    this.setState((state) => ({ open: !state.open }));
  };

  handleClose = (event) => {
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
          buttonRef={(node) => {
            this.anchorEl = node;
          }}
          color="inherit"
          aria-label="Account"
          aria-owns={open ? 'menu-list-grow' : undefined}
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
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <NavLink className={classes.navLink} to="/profile">
                      <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    </NavLink>
                    <NavLink
                      className={classes.navLink}
                      onClick={this.handleLogout}
                      to="/login"
                    >
                      <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                    </NavLink>
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
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  firebaseConnect(),
  connect(
    null,
    { logout }
  )
)(MenuListComposition);
