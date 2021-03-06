import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Drawer from './ToolbarDrawer';
import Menu from './ToolbarMenu';
import Modal from '../Modal';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    textTransform: 'capitalize',
  },
  logo: {
    color: '#fff',
    textDecoration: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
});

function ButtonAppBar(props) {
  const { classes, profile } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Drawer profile={profile} />
          <NavLink to="/" className={classes.logo}>
            <Typography variant="title" color="inherit">
              Opinion
            </Typography>
          </NavLink>
          <div className={classes.grow} />
          <Modal
            children={
              <Button className={classes.button} color="inherit">
                Share Opinion
              </Button>
            }
          />
          <Menu />
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
