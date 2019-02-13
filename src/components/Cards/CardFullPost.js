import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import CardContent from './CardContent';
import CardActions from './CardActions';
import CardUserInfo from './CardUserInfo';
import CardCommentBox from './CardCommentBox';

const styles = (theme) => ({
  card: {
    width: '100%',
    maxWidth: 550,
  },
  cardHeader: {
    paddingBottom: 0,
  },
  title: {
    fontSize: 'large',
    fontWeight: 'bold',
  },
  divider: {
    margin: theme.spacing.unit * 2,
    marginBottom: 0,
  },
});

const CardExpanded = ({ classes, post, profile }) => {
  const { title, description } = post;
  return (
    <div className={classes.card}>
      <CardHeader
        title={title}
        className={classes.cardHeader}
        classes={{ title: classes.title }}
      />
      <Divider className={classes.divider} />
      <CardContent
        content={description}
        children={<CardUserInfo data={post} />}
      />
      <CardActions data={post} />
      <CardCommentBox profile={profile} />
      <Divider className={classes.divider} />
    </div>
  );
};

CardExpanded.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardExpanded);
