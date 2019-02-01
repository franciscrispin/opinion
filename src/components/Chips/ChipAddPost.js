import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import ChipSelector from "./ChipSelector";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: theme.spacing.unit / 2
  },
  chip: {
    margin: theme.spacing.unit / 2,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8em"
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.9em"
    }
  }
});

class ChipsArray extends React.Component {
  state = {
    chipData: [0]
  };

  render() {
    const { classes } = this.props;
    const { chipData } = this.state;

    return (
      <div>
        <div className={classes.root}>
          {chipData.map(data => {
            return (
              <Chip
                key={data.key}
                label={<ChipSelector />}
                className={classes.chip}
                color="primary"
                variant="outlined"
              />
            );
          })}
        </div>
      </div>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChipsArray);
