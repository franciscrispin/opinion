import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const CardParagraph = ({ content }) => {
  return (
    <div>
      <Typography>{content}</Typography>
    </div>
  );
};

CardParagraph.propTypes = {
  content: PropTypes.string.isRequired,
};

export default CardParagraph;

// <div>
//   <Typography paragraph>
//     Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
//     aside for 10 minutes.
//     </Typography>
// <Typography paragraph>
//   Add rice and stir very gently to distribute. Top with artichokes and
//   peppers, and cook without stirring, until most of the liquid is absorbed,
//   15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
//   mussels, tucking them down into the rice, and cook again without stirring,
//   until mussels have opened and rice is just tender, 5 to 7 minutes more.
//   (Discard any mussels that don’t open.)
//   </Typography>
//   <Typography>
//     Set aside off of the heat to let rest for 10 minutes, and then serve.
//     </Typography>
// </div>
