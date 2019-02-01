import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Toolbar from '../Toolbar/Toolbar';
import SideNavigation from '../SideNavigation';
import CardAddPost from '../Cards/CardAddPost';
import ChipMinimizedPost, { ChipCategory } from '../Chips/ChipMinimizedPost';
import CardMinimizedPost from '../Cards/CardMinimizedPost';
import './HomePage.css';

const Category = ({ categoryData, category, tagList }) => {
  const dirtyTagsInCat = categoryData
    .map((post) => post.tagList)
    .reduce((a, b) => [...a, ...b], []);
  const tagsInCat = [...new Set(dirtyTagsInCat)];
  const chipTags = tagsInCat.map((tag) => tagList[tag]);
  // categoryData.map(data => console.log(data))

  return (
    <div>
      <div className="chip-wrapper">
        <ChipMinimizedPost
          children={<ChipCategory category={category} />}
          chipType="category"
          chipTags={chipTags}
        />
      </div>
      <div className="card-wrapper">
        {categoryData.map((data) => (
          <CardMinimizedPost key={data.id} cardData={data} />
        ))}
      </div>
    </div>
  );
};

const HomePage = ({ categoryData, userData, auth, tagList }) => {
  if (!auth.uid) return <Redirect to="/login" />;

  return (
    <div>
      <Toolbar userData={userData} />
      <div className="home-wrapper">
        <div className="spacer">
          <div className="navigation-wrapper">
            <SideNavigation />
          </div>
        </div>
        <div className="layout-wrapper">
          <div className="newpost-wrapper">
            <CardAddPost userData={userData} />
          </div>
          {categoryData.map((category, index) => (
            <Category
              key={index}
              categoryData={category.categoryData}
              category={category.category}
              tagList={tagList}
            />
          ))}
        </div>
        <div className="spacer" />
      </div>
    </div>
  );
};

HomePage.propTypes = {
  categoryData: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps)(HomePage);
