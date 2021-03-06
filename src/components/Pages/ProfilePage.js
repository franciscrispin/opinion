import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import Toolbar from '../Toolbar/Toolbar';
import CardMinimizedPost from '../Cards/CardMinimizedPost';
import { setUpvoteState } from '../../actions/upvoteActions';
import { updatePostUpvotes } from '../../utils/index';
import { sortPosts } from '../../utils/index';

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
      fontSize: '2em',
    },
    [theme.breakpoints.up('sm')]: {
      width: 96,
      height: 96,
      fontSize: '2.5em',
    },
    [theme.breakpoints.up('md')]: {
      width: 112,
      height: 112,
      fontSize: '3em',
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
  componentDidUpdate() {
    const { auth, posts, users } = this.props;
    updatePostUpvotes(auth, posts, users, this.props.setUpvoteState);
  }

  render() {
    const {
      classes,
      profile,
      users,
      auth,
      posts,
      isUpvoteUpdated,
    } = this.props;
    const uid = auth.uid;

    if (posts.length && Object.keys(users).length && isUpvoteUpdated) {
      const { posts } = users[uid];
      const sortedPosts = sortPosts(posts);

      const displayPosts = sortedPosts.length
        ? sortedPosts.map((post) => (
            <CardMinimizedPost key={post.id} posts={post} />
          ))
        : 'No posts yet!';

      return (
        <div>
          <Toolbar profile={profile} />
          <div className={classes.profileWrapper}>
            <div className={classes.profileHeader}>
              <Avatar className={classes.avatar} aria-label="Opinion Post">
                {profile.initials}
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
              {displayPosts}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

Profile.defaultProps = {
  users: {},
  posts: [],
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
  isUpvoteUpdated: PropTypes.bool.isRequired,
  setUpvoteState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    posts: state.firestore.ordered.posts,
    users: state.firestore.data.users,
    isUpvoteUpdated: state.upvote.isUpdated,
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { setUpvoteState }
  ),
  firestoreConnect([{ collection: 'users' }, { collection: 'posts' }])
)(Profile);
