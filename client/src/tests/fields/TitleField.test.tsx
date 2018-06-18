import React from 'react';
import TitleField from '../../fields/TitleField';
import renderer from 'react-test-renderer';
import { DragDropContext } from 'react-beautiful-dnd';

test('WorkField renders properly', () => {
    const component = renderer.create(
        <DragDropContext onDragEnd={()=>null}><TitleField index={0}/></DragDropContext>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});