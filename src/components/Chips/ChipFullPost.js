import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: theme.spacing.unit / 2
  },
  chip: {
    marginBottom: theme.spacing.unit * 1.5,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8em"
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.9em"
    }
  },
  label: {
    textTransform: "capitalize"
  }
});

const ChipsArray = ({ classes, tags, tagList }) => {
  const chipTags = tags.map(tag => tagList[tag]);

  return (
    <div className={classes.root}>
      {chipTags.map(tag => {
        return (
          <Chip
            key={tag}
            label={tag}
            className={classes.chip}
            color="primary"
            variant="outlined"
            classes={{ label: classes.label }}
          />
        );
      })}
    </div>
  );
};

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  tagList: PropTypes.object.isRequired
};

export default withStyles(styles)(ChipsArray);
