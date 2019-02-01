import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import Toolbar from '../Toolbar/Toolbar';
import CardMinimizedPost from '../Cards/CardMinimizedPost';

import { postList } from '../FakeData';

const styles = (theme) => ({
  profileWrapper: {
    margin: 'auto',
    width: '90%',
    maxWidth: 550,
    [theme.breakpoints.down('xs')]: {
      marginTop: 64 + theme.spacing.unit * 2,
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: 64 + theme.spacing.unit * 4,
    },
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: red[500],
    [theme.breakpoints.down('xs')]: {
      width: 72,
      height: 72,
      fontSize: '2.5em',
    },
    [theme.breakpoints.up('sm')]: {
      width: 96,
      height: 96,
      fontSize: '3em',
    },
    [theme.breakpoints.up('md')]: {
      width: 112,
      height: 112,
      fontSize: '4em',
    },
  },
  username: {
    marginLeft: theme.spacing.unit * 2,
  },
  headerDivider: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    height: 2,
  },
  bodyDivider: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
  },
});

const Profile = ({ classes }) => (
  <div>
    <Toolbar />
    <div className={classes.profileWrapper}>
      <div className={classes.profileHeader}>
        <Avatar className={classes.avatar} aria-label="Opinion Post">
          F
        </Avatar>
        <Typography variant="h5" className={classes.username}>
          Francis Goh
        </Typography>
      </div>
      <Divider className={classes.headerDivider} />
      <div>
        <Typography variant="subheading">Francis's Posts</Typography>
        <Divider className={classes.bodyDivider} light={true} />
        {postList &&
          postList.map((data) => (
            <CardMinimizedPost key={data.id} cardData={data} />
          ))}
      </div>
    </div>
  </div>
);

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
