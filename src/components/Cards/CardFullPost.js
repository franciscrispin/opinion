import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "./CardContent";
import CardActions from "./CardActions";
import CardUserInfo from "./CardUserInfo";
import CardCommentBox from "./CardCommentBox";

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
    margin: theme.spacing.unit * 2,
    marginBottom: 0
  }
});

const CardExpanded = ({ classes, postData }) => {
  return (
    <div className={classes.card}>
      <CardHeader
        title={postData.title}
        classes={{ title: classes.title }}
        className={classes.cardHeader}
      />
      <Divider className={classes.divider} />
      <CardContent
        content={postData.content}
        children={<CardUserInfo userData={postData} />}
      />
      <CardActions cardData={postData} />
      <CardCommentBox />
      <Divider className={classes.divider} />
    </div>
  );
};

CardExpanded.propTypes = {
  classes: PropTypes.object.isRequired,
  postData: PropTypes.object.isRequired
};

export default withStyles(styles)(CardExpanded);
