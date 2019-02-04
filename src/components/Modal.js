import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChipAddPost from './Chips/ChipAddPost';
import { addPost, clearTags } from '../actions/postActions';

const styles = (theme) => ({
  cardHeader: {
    paddingTop: theme.spacing.unit / 2,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 40,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 4,
    outline: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 50,
    },
  },
  newPost: {
    padding: theme.spacing.unit * 2,
    paddingBottom: 8,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 4,
      paddingBottom: 8,
    },
  },
  buttonContainer: {
    background: '#fafafa',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing.unit,
    borderRadius: 4,
    borderWidth: 1,
    borderTop: 'solid',
    borderColor: '#e2e2e2',
  },
  button: {
    textTransform: 'capitalize',
  },
  cancelButton: {
    background: 'none',
    paddingRight: theme.spacing.unit * 2,
    color: '#949494',
    fontSize: '0.875rem',
    border: 'none',
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
  },
});

class AddPostModal extends React.Component {
  state = {
    open: false,
    title: '',
    description: '',
  };

  handleClick = () => {
    this.props.addPost({
      title: this.state.title,
      description: this.state.description,
    });
    this.handleClose();
  };

  handleChange = (title) => (event) => {
    this.setState({
      [title]: event.target.value,
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.clearTags({ 0: '', 1: '', 2: '', 3: '' });
  };

  render() {
    const { classes, children } = this.props;

    return (
      <div>
        {React.cloneElement(children, { onClick: this.handleOpen })}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <div className={classes.newPost}>
              <Typography variant="h6" id="modal-title">
                Share your opinion
              </Typography>
              <TextField
                id="title"
                label="Title"
                className={classes.title}
                value={this.state.title}
                onChange={this.handleChange('title')}
                margin="normal"
                variant="outlined"
                fullWidth={true}
              />
              <TextField
                id="description"
                label="Description"
                multiline
                rows="4"
                className={classes.description}
                value={this.state.description}
                onChange={this.handleChange('description')}
                margin="normal"
                variant="outlined"
                fullWidth={true}
              />
              <div>
                <ChipAddPost />
              </div>
            </div>
            <div className={classes.buttonContainer}>
              <button
                className={classes.cancelButton}
                onClick={this.handleClose}
              >
                Cancel
              </button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.handleClick}
              >
                Share
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

AddPostModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
    null,
    { addPost, clearTags }
  )
)(AddPostModal);
