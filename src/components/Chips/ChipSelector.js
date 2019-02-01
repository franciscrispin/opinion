import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    minWidth: 120
  },
  selectEmpty: {
    marginRight: -theme.spacing.unit * 0.5,
    marginLeft: -theme.spacing.unit * 0.5,
    borderRadius: 16,
    "&:before": { border: "none" },
    "&:after": { border: "none" },
    "&:hover:not(.MuiInput-disabled-14773):not(.MuiInput-focused-14772):not(.MuiInput-error-14775):before": {
      border: "none"
    }
  },
  select: {
    "&:focus": { background: "none" }
  }
});

class SimpleSelect extends React.Component {
  state = {
    topic: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.topic}
            onChange={this.handleChange}
            displayEmpty
            name="topic"
            className={classes.selectEmpty}
            classes={{
              select: classes.select
            }}
          >
            <MenuItem value="">
              <em style={{ marginLeft: 8 }}>Add Topic</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSelect);
