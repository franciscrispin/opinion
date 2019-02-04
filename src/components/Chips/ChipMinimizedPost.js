import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DoneIcon from '@material-ui/icons/Done';

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8em',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.9em',
    },
  },
  category: {
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit / 4,
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  divider: {
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dividerBottom: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
  },
  label: {
    textTransform: 'capitalize',
  },
});

let ChipCategory = (props) => {
  const { classes, category } = props;
  return (
    <div id={`${category}`}>
      <Typography className={classes.category} align="left" variant="h5">
        {category}
      </Typography>
    </div>
  );
};

ChipCategory.propTypes = {
  classes: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
};

ChipCategory = withStyles(styles)(ChipCategory);

export { ChipCategory };

class ChipsArray extends React.Component {
  state = {
    chips: [],
  };

  setChips = () => {
    const chips = this.props.tags.map((tag) => ({
      label: tag,
      select: true,
    }));
    this.setState({ chips });
  };

  componentDidMount() {
    this.setChips();
  }

  componentDidUpdate() {
    if (this.state.chips.length !== this.props.tags.length) {
      this.setChips();
    }
  }

  handleDelete = (data) => () => {
    const index = this.state.chips.findIndex(
      (chip) => chip.label === data.label
    );
    this.setState((prevState) => {
      const chips = [
        ...prevState.chips.slice(0, index),
        { ...data, select: !data.select },
        ...prevState.chips.slice(index + 1),
      ];
      return { chips };
    });
  };

  render() {
    const { classes } = this.props;
    const chips = this.state.chips;

    return (
      <div>
        <div className={classes.divider}>
          <Divider />
        </div>
        {this.props.children}
        <div className={classes.root}>
          {chips.length &&
            chips.map((data) => (
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
  classes: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
};

export default withStyles(styles)(ChipsArray);
