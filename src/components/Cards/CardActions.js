import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import UpvotePublishIcon from '@material-ui/icons/Publish';
import CommentIcon from '@material-ui/icons/Comment';
import { upvote, upvoteCache } from '../../actions/postButtonActions';
import { getUpvotes } from '../../actions/postButtonActions';

const styles = (theme) => ({
  actions: {
    padding: 0,
    paddingRight: theme.spacing.unit,
    display: 'flex',
  },
  iconButton: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  navLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  upvotes: {
    position: 'relative',
    top: theme.spacing.unit,
    left: theme.spacing.unit / 2,
  },
  comments: {
    position: 'relative',
    top: theme.spacing.unit,
    left: theme.spacing.unit,
  },
});

class MainCardActions extends React.Component {
  state = { isActive: false };

  handleUpvote = () => {
    this.setState((prevState) => ({ isActive: !prevState.isActive }));
    const postId = this.props.cardData.id;
    if (this.state.isActive) {
      this.props.upvote(postId, true);
      this.props.upvoteCache(postId, true);
    } else {
      this.props.upvote(postId, false);
      this.props.upvoteCache(postId, false);
    }
  };

  render() {
    const { classes, cardData, children, upvotes } = this.props;
    const color = this.state.isActive ? { color: '#329bff' } : null;
    const postId = this.props.cardData.id;

    if (upvotes && upvotes.length) {
      const postUpvotes = upvotes.find((post) => {
        return post.id === cardData.id;
      }).upvotes;

      return (
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            aria-label="Upvotes"
            classes={{ root: classes.iconButton }}
            style={color}
            onClick={this.handleUpvote}
          >
            <UpvotePublishIcon />
            <Typography className={classes.upvotes} paragraph style={color}>
              {postUpvotes}
            </Typography>
          </IconButton>
          <NavLink className={classes.navLink} to={`/post/${postId}`}>
            <IconButton
              aria-label="Comments"
              style={{ display: 'block' }}
              classes={{ root: classes.iconButton }}
            >
              <CommentIcon />
              <Typography className={classes.comments} paragraph>
                {cardData.comments}
              </Typography>
            </IconButton>
          </NavLink>
          {children}
        </CardActions>
      );
    } else {
      return null;
    }
  }
}

MainCardActions.propTypes = {
  classes: PropTypes.object.isRequired,
  cardData: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
    null,
    { upvote, upvoteCache, getUpvotes }
  )
)(MainCardActions);
