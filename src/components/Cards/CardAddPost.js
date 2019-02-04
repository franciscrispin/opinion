import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import Modal from '../Modal';

const styles = (theme) => ({
  card: {
    width: '100%',
    maxWidth: 550,
    marginTop: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit * 2,
  },
  userInfo: {
    display: 'flex',
    padding: theme.spacing.unit * 2,
    paddingBottom: 0,
  },
  avatar: {
    backgroundColor: red[500],
    width: 18,
    height: 18,
    fontSize: 'small',
  },
  username: {
    marginLeft: theme.spacing.unit / 1.5,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  cardHeader: {
    paddingTop: theme.spacing.unit / 2,
  },
  title: {
    color: '#949494',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      color: '#2b6dad',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 'medium',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 'large',
    },
  },
  navLink: {
    textDecoration: 'none',
  },
});

const CardNewPost = ({ classes, profile }) => (
  <Card className={classes.card}>
    <NavLink className={classes.navLink} to={'/profile'}>
      <div className={classes.userInfo}>
        <Avatar className={classes.avatar} aria-label="Opinion Post">
          {profile.initials}
        </Avatar>
        <Typography className={classes.username} variant="subtitle2">
          {`${profile.firstName} ${profile.lastName}`}
        </Typography>
      </div>
    </NavLink>
    <Modal
      children={
        <CardHeader
          title={'What are your opinions?'}
          classes={{ title: classes.title }}
          className={classes.cardHeader}
        />
      }
    />
  </Card>
);

CardNewPost.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardNewPost);
