import React from 'react';
import TextField from '../../fields/TextField';
import renderer from 'react-test-renderer';
import { DragDropContext } from 'react-beautiful-dnd';

test('WorkField renders properly', () => {
    const component = renderer.create(
        <DragDropContext onDragEnd={()=>null}><TextField index={0}/></DragDropContext>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});