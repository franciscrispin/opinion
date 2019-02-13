import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import CardParagraph from './CardParagraph';

const MainCardContent = ({ content, children }) => (
  <CardContent classes={{ root: 'card-content' }}>
    {children}
    <CardParagraph content={content} />
  </CardContent>
);

MainCardContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default MainCardContent;
