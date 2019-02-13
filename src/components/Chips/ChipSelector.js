import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { addChip } from '../../actions/newPostActions';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '135px',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '140px',
    },
  },
  selectEmpty: {
    borderRadius: 16,
    '&:before': { border: 'none' },
    '&:after': { border: 'none' },
    '&:hover:not(.MuiInput-disabled-14773):not(.MuiInput-focused-14772):not(.MuiInput-error-14775):before': {
      border: 'none',
    },
  },
  select: {
    '&:focus': { background: 'none' },
  },
  selectMenu: {
    [theme.breakpoints.down('xs')]: {
      width: '100px',
      marginLeft: theme.spacing.unit * 2,
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: '120px',
    },
  },
});

class Selector extends React.Component {
  state = {
    tag: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.addChip({
      chipId: this.props.chipId,
      topicId: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl>
          <Select
            value={this.state.tag}
            onChange={this.handleChange}
            displayEmpty
            name="tag"
            className={classes.selectEmpty}
            classes={{
              select: classes.select,
              selectMenu: classes.selectMenu,
            }}
          >
            <MenuItem value="">Add Topic</MenuItem>
            <MenuItem value={0}>Social Media Influencers</MenuItem>
            <MenuItem value={1}>National Service</MenuItem>
            <MenuItem value={2}>Psle</MenuItem>
            <MenuItem value={3}>CPF</MenuItem>
            <MenuItem value={4}>Inequality</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

Selector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
    null,
    { addChip }
  )
)(Selector);
