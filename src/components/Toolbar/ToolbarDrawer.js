import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import TrendingIcon from "@material-ui/icons/TrendingUp";
import ControversialIcon from "@material-ui/icons/OfflineBolt";
import DeepDiveIcon from "@material-ui/icons/AllOut";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.down("xs")]: {
      display: "block"
    },
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  anchorTag: {
    textDecoration: "none",
    textTransform: "capitalize"
  }
});

class MobileDrawer extends React.Component {
  state = {
    open: false
  };

  toggleDrawer = open => () => {
    this.setState({
      open
    });
  };

  render() {
    const { classes, userData, isAuthed } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <NavLink className={classes.anchorTag} to={"/profile"}>
            <ListItem button>
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText
                primary={isAuthed ? userData.username : "Login / Signup"}
              />
            </ListItem>
          </NavLink>
        </List>
        <Divider />
        <List>
          {[
            { text: "trending", icon: <TrendingIcon /> },
            {
              text: "controversial",
              icon: <ControversialIcon />
            },
            { text: "deep dive", icon: <DeepDiveIcon /> }
          ].map(item => (
            <NavHashLink
              className={classes.anchorTag}
              key={item.text}
              scroll={el =>
                el.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              to={`/#${item.text}`}
            >
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </NavHashLink>
          ))}
        </List>
      </div>
    );

    return (
      <div>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={this.toggleDrawer(true)}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

MobileDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MobileDrawer);
