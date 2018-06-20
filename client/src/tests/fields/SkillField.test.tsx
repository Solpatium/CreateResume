import React from 'react';
import SkillField from '../../fields/SkillField';
import renderer from 'react-test-renderer';
import { DragDropContext } from 'react-beautiful-dnd';

test('SkillField renders properly', () => {
  const component = renderer.create(
    <DragDropContext onDragEnd={()=>null}><SkillField index={0}/></DragDropContext>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});