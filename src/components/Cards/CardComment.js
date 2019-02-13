import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import CardContent from './CardContent';
import CardUserInfo from './CardUserInfo';

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
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
});

const CardExpanded = ({ classes, comment }) => {
  return (
    <div className={classes.card}>
      <CardContent
        content={comment.description}
        children={<CardUserInfo data={comment} />}
      />
      <Divider className={classes.divider} />
    </div>
  );
};

CardExpanded.propTypes = {
  classes: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardExpanded);
