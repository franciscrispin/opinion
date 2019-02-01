import React from 'react';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TrendingIcon from '@material-ui/icons/TrendingUp';
import ControversialIcon from '@material-ui/icons/OfflineBolt';
import DeepDiveIcon from '@material-ui/icons/AllOut';

const styles = (theme) => ({
  root: {
    width: 190,
    backgroundColor: theme.palette.background.paper,
  },
  anchorTag: {
    textDecoration: 'none',
    textTransform: 'capitalize',
  },
  listItem: {
    height: '32px',
  },
  listItemText: {
    fontSize: '0.9em',
  },
});

const iconStyles = {
  fontSize: '1.3em',
};

const navigationList = [
  {
    index: 0,
    label: 'trending',
    icon: <TrendingIcon style={iconStyles} />,
  },
  {
    index: 1,
    label: 'controversial',
    icon: <ControversialIcon style={iconStyles} />,
  },
  {
    index: 2,
    label: 'deep dive',
    icon: <DeepDiveIcon style={iconStyles} />,
  },
];

class SelectedListItem extends React.Component {
  state = {
    selectedIndex: 0,
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes } = this.props;
    // console.log(this.props.history);
    return (
      <div className={classes.root}>
        <List component="nav">
          {navigationList.map((item) => (
            <NavLink
              className={classes.anchorTag}
              key={item.index}
              scroll={(el) =>
                el.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }
              to={`/home/#${item.label}`}
            >
              <ListItem
                className={classes.listItem}
                button
                selected={this.state.selectedIndex === item.index}
                onClick={(event) => this.handleListItemClick(event, item.index)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  classes={{ primary: classes.listItemText }}
                />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </div>
    );
  }
}

SelectedListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectedListItem);
