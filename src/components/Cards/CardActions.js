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
import { upvote } from '../../actions/upvoteActions';

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
  state = { isActive: false, upvotes: 0 };

  componentDidMount() {
    this.setState({ upvotes: this.props.cardData.upvotes });
  }

  componentDidUpdate() {
    if (
      !this.state.isActive &&
      this.props.cardData.upvotes !== this.state.upvotes
    ) {
      this.setState({ upvotes: this.props.cardData.upvotes });
    }
  }

  componentWillUnmount() {
    const { upvotes, id } = this.props.cardData;
    if (upvotes !== this.state.upvotes) {
      this.props.upvote(id, this.state.upvotes);
    }
  }

  handleUpvote = () => {
    this.setState((prevState) => {
      const upvotes = prevState.isActive
        ? prevState.upvotes - 1
        : prevState.upvotes + 1;
      return {
        isActive: !prevState.isActive,
        upvotes,
      };
    });
  };

  render() {
    const { classes, cardData, children } = this.props;
    const color = this.state.isActive ? { color: '#329bff' } : null;
    const postId = this.props.cardData.id;

    // if (upvotes && upvotes.length) {
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
            {this.state.upvotes}
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
    // } else {
    //   return null;
    // }
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
    { upvote }
  )
)(MainCardActions);
