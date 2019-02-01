import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import ChipAddPost from './Chips/ChipAddPost';

const styles = (theme) => ({
  cardHeader: {
    paddingTop: theme.spacing.unit / 2,
  },
  title: {
    color: '#949494',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      color: '#2b6dad',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 'medium',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 'large',
    },
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
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 4,
    },
  },
  input: {
    width: '100%',
    fontSize: 'small',
    [theme.breakpoints.up('sm')]: {
      fontSize: 'medium',
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

class NewPostModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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
              <Input
                placeholder="Some thought-provoking insight..."
                multiline={true}
                classes={{ root: classes.input }}
              />
              <div style={{ marginLeft: -8, marginTop: 12, marginBottom: -16 }}>
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

NewPostModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewPostModal);
