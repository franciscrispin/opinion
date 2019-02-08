import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import Toolbar from '../Toolbar/Toolbar';
import CardMinimizedPost from '../Cards/CardMinimizedPost';
import { getUpvotes } from '../../actions/postButtonActions';
import { sortPosts } from '../../utils';

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

class Profile extends React.Component {
  componentDidMount() {
    this.props.getUpvotes();
  }

  render() {
    const { classes, profile, users, auth, upvotes } = this.props;

    if (isLoaded(profile) && users) {
      const { posts } = users[auth.uid];
      const sortedPosts = sortPosts(posts);

      return (
        <div>
          <Toolbar profile={profile} />
          <div className={classes.profileWrapper}>
            <div className={classes.profileHeader}>
              <Avatar className={classes.avatar} aria-label="Opinion Post">
                F
              </Avatar>
              <Typography variant="h5" className={classes.username}>
                {profile.firstName} {profile.lastName}
              </Typography>
            </div>
            <Divider className={classes.headerDivider} />
            <div>
              <Typography variant="subheading">
                {profile.firstName}'s Posts
              </Typography>
              <Divider className={classes.bodyDivider} light={true} />
              {sortedPosts &&
                sortedPosts.map((post) => (
                  <CardMinimizedPost
                    key={post.id}
                    posts={post}
                    upvotes={upvotes}
                  />
                ))}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    users: state.firestore.data.users,
    upvotes: state.upvotes.upvotes,
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getUpvotes }
  ),
  firestoreConnect([{ collection: 'users' }])
)(Profile);
