import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardParagraph from "./CardParagraph";
import CardActions from "./CardActions";

const styles = theme => ({
  card: {
    width: "100%",
    maxWidth: 550,
    marginBottom: theme.spacing.unit * 2
  },
  cardHeader: {
    paddingBottom: 0
  },
  title: {
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: "medium"
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "large"
    }
  },
  subheader: {
    marginTop: theme.spacing.unit / 2
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  navLink: {
    textDecoration: "none",
    color: "inherit"
  }
});

const ExpandAction = ({ classExpand, classOpen, onClick, expanded }) => {
  return (
    <IconButton
      className={classnames(classExpand, {
        [classOpen]: expanded
      })}
      onClick={onClick}
      aria-expanded={expanded}
      aria-label="Show more"
    >
      <ExpandMoreIcon />
    </IconButton>
  );
};

class CardHome extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, cardData } = this.props;
    const { id, title, username, date, content } = cardData;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={
            <NavLink className={classes.navLink} to={`/post/${id}`}>
              {title}
            </NavLink>
          }
          subheader={
            <NavLink className={classes.navLink} to={"/profile"}>
              {username}, {date}
            </NavLink>
          }
          classes={{ title: classes.title, subheader: classes.subheader }}
          className={classes.cardHeader}
        />
        <CardActions
          cardData={cardData}
          children={
            <ExpandAction
              classExpand={classes.expand}
              classExpandOpen={classes.expandOpen}
              onClick={this.handleExpandClick}
              expanded={this.state.expanded}
            />
          }
        />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <Divider />
          <CardContent>
            <CardParagraph content={content} />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

CardHome.propTypes = {
  classes: PropTypes.object.isRequired,
  cardData: PropTypes.object.isRequired
};

export default withStyles(styles)(CardHome);
