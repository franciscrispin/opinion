import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import PublishIcon from "@material-ui/icons/Publish";
import CommentIcon from "@material-ui/icons/Comment";

const styles = theme => ({
  actions: {
    padding: 0,
    paddingRight: theme.spacing.unit,
    display: "flex"
  },
  iconButton: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  upvotes: {
    position: "relative",
    top: theme.spacing.unit,
    left: theme.spacing.unit / 2
  },
  comments: {
    position: "relative",
    top: theme.spacing.unit,
    left: theme.spacing.unit
  }
});

class MainCardActions extends React.Component {
  state = { isActive: false };

  handleUpvote = () => {
    this.setState(prevState => ({ isActive: !prevState.isActive }));
  };

  render() {
    const { classes, cardData, showComments = true, children } = this.props;
    const color = this.state.isActive ? { color: "#329bff" } : null;

    return (
      <CardActions className={classes.actions} disableActionSpacing>
        <IconButton
          aria-label="Upvotes"
          classes={{ root: classes.iconButton }}
          style={color}
          onClick={this.handleUpvote}
        >
          <PublishIcon />
          <Typography className={classes.upvotes} paragraph style={color}>
            {cardData.upvotes}
          </Typography>
        </IconButton>
        <IconButton
          aria-label="Comments"
          style={{ display: showComments ? "block" : "none" }}
          classes={{ root: classes.iconButton }}
        >
          <CommentIcon />
          <Typography className={classes.comments} paragraph>
            {cardData.comments}
          </Typography>
        </IconButton>
        {children}
      </CardActions>
    );
  }
}

MainCardActions.propTypes = {
  classes: PropTypes.object.isRequired,
  cardData: PropTypes.object.isRequired
};

export default withStyles(styles)(MainCardActions);
