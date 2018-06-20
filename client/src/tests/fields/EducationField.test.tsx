import React from 'react';
import WorkField from '../../fields/WorkField';
import renderer from 'react-test-renderer';
import { DragDropContext } from 'react-beautiful-dnd';

test('WorkField renders properly', () => {
    const component = renderer.create(
        <DragDropContext onDragEnd={()=>null}><WorkField index={0}/></DragDropContext>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});