import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardParagraph from './CardParagraph';
import CardActions from './CardActions';
import { truncate } from '../../utils/index';

const styles = (theme) => ({
  card: {
    width: '100%',
    maxWidth: 550,
    marginBottom: theme.spacing.unit * 2,
  },
  cardHeader: {
    paddingBottom: 0,
  },
  title: {
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      fontSize: 'medium',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 'large',
    },
  },
  subheader: {
    marginTop: theme.spacing.unit / 2,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  navLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

const ExpandAction = ({ classExpand, classOpen, onClick, expanded }) => {
  return (
    <IconButton
      className={classnames(classExpand, {
        [classOpen]: expanded,
      })}
      onClick={onClick}
      aria-expanded={expanded}
      aria-label="Show more"
    >
      <ExpandMoreIcon />
    </IconButton>
  );
};

ExpandAction.propTypes = {
  classExpand: PropTypes.string.isRequired,
  classOpen: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
};

class CardMinimizedPost extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState((state) => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, posts } = this.props;
    const {
      id,
      title,
      authorFirstName,
      authorLastName,
      createdAt,
      description,
    } = posts;
    const truncatedTitle = truncate(title);

    return (
      <Card className={classes.card}>
        <CardHeader
          title={
            <NavLink className={classes.navLink} to={`/post/${id}`}>
              {truncatedTitle}
            </NavLink>
          }
          subheader={
            <div>
              {authorFirstName} {authorLastName},{' '}
              {moment(createdAt.toDate()).calendar()}
            </div>
          }
          classes={{ title: classes.title, subheader: classes.subheader }}
          className={classes.cardHeader}
        />
        <CardActions
          data={posts}
          children={
            <ExpandAction
              classExpand={classes.expand}
              classOpen={classes.expandOpen}
              onClick={this.handleExpandClick}
              expanded={this.state.expanded}
            />
          }
        />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <Divider />
          <CardContent>
            <CardParagraph content={description} />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

CardMinimizedPost.propTypes = {
  classes: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardMinimizedPost);
