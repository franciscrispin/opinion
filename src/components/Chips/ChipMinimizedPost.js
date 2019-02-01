import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import DoneIcon from "@material-ui/icons/Done";

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
  },
  category: {
    textTransform: "capitalize",
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit / 4,
    [theme.breakpoints.down("xs")]: {
      display: "block"
    },
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  divider: {
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dividerBottom: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2
  },
  label: {
    textTransform: "capitalize"
  }
});

let ChipCategory = props => {
  const { classes, category } = props;
  return (
    <div id={`${category}`}>
      <Typography className={classes.category} align="left" variant="h5">
        {category}
      </Typography>
    </div>
  );
};

ChipCategory = withStyles(styles)(ChipCategory);

export { ChipCategory };

class ChipsArray extends React.Component {
  state = {
    chipData: []
  };

  componentDidMount() {
    const chipData = this.props.chipTags.map(tag => ({
      label: tag,
      select: true
    }));
    this.setState({ chipData });
  }

  handleDelete = data => () => {
    const index = this.state.chipData.findIndex(
      chip => chip.label === data.label
    );
    this.setState(prevState => {
      const chipData = [
        ...prevState.chipData.slice(0, index),
        { ...data, select: !data.select },
        ...prevState.chipData.slice(index + 1)
      ];
      return { chipData };
    });
  };

  render() {
    const { classes } = this.props;
    const chipData = this.state.chipData;

    return (
      <div>
        <div className={classes.divider}>
          <Divider />
        </div>
        {this.props.children}
        <div className={classes.root}>
          {chipData.length &&
            chipData.map(data => (
              <Chip
                key={data.label}
                label={data.label}
                onDelete={this.handleDelete(data)}
                className={classes.chip}
                deleteIcon={data.select ? <DoneIcon /> : null}
                color="primary"
                variant="outlined"
                classes={{ label: classes.label }}
              />
            ))}
        </div>
        <div>
          <Divider
            className={classes.divider}
            classes={{ root: classes.dividerBottom }}
          />
        </div>
      </div>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChipsArray);
