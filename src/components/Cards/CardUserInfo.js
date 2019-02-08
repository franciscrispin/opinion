import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';

const styles = (theme) => ({
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
  avatar: {
    backgroundColor: red[500],
    width: 36,
    height: 36,
    fontSize: 16,
  },
  text: {
    marginLeft: theme.spacing.unit,
  },
});

const CardUserInfo = ({ classes, data }) => {
  const { authorFirstName, authorLastName, initials, createdAt } = data;
  return (
    <div className={classes.userInfo}>
      <Avatar className={classes.avatar} aria-label="Profile Image">
        {initials}
      </Avatar>
      <div className={classes.text}>
        <Typography variant="subtitle2">
          {authorFirstName} {authorLastName}
        </Typography>
        <Typography variant="caption">
          {moment(createdAt.toDate()).calendar()}
        </Typography>
      </div>
    </div>
  );
};

CardUserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardUserInfo);
