import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import red from "@material-ui/core/colors/red";

const styles = theme => ({
  userInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing.unit * 2
  },
  avatar: {
    backgroundColor: red[500],
    width: 36,
    height: 36
  },
  text: {
    marginLeft: theme.spacing.unit
  }
});

const CardUserInfo = ({ classes, userData }) => {
  const { username, date } = userData;
  return (
    <div className={classes.userInfo}>
      <Avatar className={classes.avatar} aria-label="Profile Image">
        R
      </Avatar>
      <div className={classes.text}>
        <Typography variant="subtitle2">{username}</Typography>
        <Typography variant="caption">{date}</Typography>
      </div>
    </div>
  );
};

CardUserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired
};

export default withStyles(styles)(CardUserInfo);
