import React from 'react';
import { useDispatch } from 'react-redux';
// import { updateRightPane } from './actions/index';
import RightPane from './RightPane';

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleAddProperty = () => {
    dispatch(updateRightPane('Add new property'));
  };

  const handleViewProperties = () => {
    dispatch(updateRightPane('View properties'));
  };

  return (
    <section id="side-bar">
      <input type="submit" onClick={handleAddProperty} value="Add New Property" />
      <input type="submit" onClick={handleViewProperties} value="View Properties" />
      <RightPane />
    </section>
  );
}

export default Sidebar;
