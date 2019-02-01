import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import ChipSelector from './ChipSelector';

const styles = (theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  chipWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 14,
  },
  chip: {
    marginBottom: 16,
    marginRight: 8,
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8em',
      maxWidth: '135px',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.9em',
      maxWidth: '160px',
    },
  },
  button: {
    marginRight: 'auto',
    alignSelf: 'flex-start',
    borderRadius: '50px',
  },
  buttonText: {
    marginLeft: theme.spacing.unit * 1.5,
  },
});

class ChipsArray extends React.Component {
  state = {
    chips: [0],
  };

  handleClick = () => {
    if (this.state.chips.length < 4) {
      return this.setState((prevState) => {
        const newChip = +prevState.chips.slice(-1) + 1;
        return { chips: [...prevState.chips, newChip] };
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { chips } = this.state;

    return (
      <div>
        <div className={classes.chipWrapper}>
          {chips.map((id) => {
            return (
              <Chip
                key={id}
                label={<ChipSelector chipId={id} />}
                className={classes.chip}
                color="primary"
                variant="outlined"
              />
            );
          })}
        </div>
        <IconButton
          className={classes.button}
          aria-label="Add tag"
          onClick={this.handleClick}
        >
          <AddIcon />
          <Typography variant="caption">Add tag</Typography>
        </IconButton>
      </div>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);
