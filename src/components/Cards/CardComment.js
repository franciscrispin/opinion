import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import CardContent from "./CardContent";
import CardActions from "./CardActions";
import CardUserInfo from "./CardUserInfo";

const styles = theme => ({
  card: {
    width: "100%",
    maxWidth: 550
  },
  cardHeader: {
    paddingBottom: 0
  },
  title: {
    fontSize: "large",
    fontWeight: "bold"
  },
  divider: {
    marginLeft: 16,
    marginRight: 16
  }
});

const CardExpanded = ({ classes, commentData }) => {
  return (
    <div className={classes.card}>
      <CardContent
        content={commentData.content}
        children={<CardUserInfo userData={commentData} />}
      />
      <CardActions cardData={commentData} showComments={false} />
      <Divider className={classes.divider} />
    </div>
  );
};

CardExpanded.propTypes = {
  classes: PropTypes.object.isRequired,
  commentData: PropTypes.object.isRequired
};

export default withStyles(styles)(CardExpanded);
