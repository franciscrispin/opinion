import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Input from "@material-ui/core/Input";
import red from "@material-ui/core/colors/red";

const styles = theme => ({
  commentBox: {
    background: "#fafafa",
    display: "flex",
    justifyContent: "space-between",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 1.5,
    paddingRight: theme.spacing.unit * 1.5,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e2e2e2",
    borderRadius: 3
  },
  avatar: {
    backgroundColor: red[500],
    width: 36,
    height: 36
  },
  inputContainer: {
    background: "#fff",
    display: "flex",
    alignItems: "center",
    width: "65%",
    minHeight: 24,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e2e2e2",
    borderRadius: 20,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  input: {
    width: "100%",
    marginBottom: theme.spacing.unit / 4,
    paddingBottom: theme.spacing.unit / 2,
    fontSize: "small"
  },
  button: {
    background: "#eaf4ff",
    height: 36,
    padding: theme.spacing.unit,
    color: "#1486f3",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e2e2e2",
    borderRadius: 20,
    fontSize: "0.8em",
    "&:hover": {
      background: "#d6e9ff"
    }
  }
});

const CommentBox = ({ classes }) => {
  return (
    <div className={classes.commentBox}>
      <Avatar className={classes.avatar} aria-label="Opinion Post">
        R
      </Avatar>
      <div className={classes.inputContainer}>
        <Input
          placeholder="Add a comment..."
          multiline={true}
          classes={{ root: classes.input }}
        />
      </div>
      <button className={classes.button}>Comment</button>
    </div>
  );
};

CommentBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentBox);
