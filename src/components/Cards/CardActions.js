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
import {
  updateUpvotes,
  toggleUpvote,
  setUpvoteState,
} from '../../actions/upvoteActions';

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
  state = {};

  componentDidMount() {
    this.setState({ ...this.props.upvotes[this.props.data.id] });
    // window.addEventListener('beforeunload', this.handleUnmount);
  }

  componentWillUnmount() {
    this.handleUnmount();
    // window.removeEventListener('beforeunload', this.handleUnmount);
  }

  handleUnmount = () => {
    if (this.state !== this.props.upvotes[this.props.data.id]) {
      this.props.updateUpvotes(this.props.data.id, this.state.upvotes);
    }
  };

  handleUpvote = () => {
    this.props.toggleUpvote(this.props.data.id);
  };

  render() {
    const { classes, data, upvotes, children } = this.props;
    const id = this.props.data.id;

    if (Object.keys(upvotes).length) {
      const postUpvotes = upvotes[id];
      const color = postUpvotes.isActive ? { color: '#329bff' } : null;

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
              {postUpvotes.upvotes}
            </Typography>
          </IconButton>
          <NavLink className={classes.navLink} to={`/post/${id}`}>
            <IconButton
              aria-label="Comments"
              style={{ display: 'block' }}
              classes={{ root: classes.iconButton }}
            >
              <CommentIcon />
              <Typography className={classes.comments} paragraph>
                {data.comments}
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
  data: PropTypes.object.isRequired,
  upvotes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ upvotes: state.upvote });

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { updateUpvotes, toggleUpvote, setUpvoteState }
  )
)(MainCardActions);
