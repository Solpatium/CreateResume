import { Droppable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import {Row, Col, Button, Select} from 'antd';
import TitleField from './TitleField'
import TextField from './TextField'
import EducationField from './EducationField'
import * as React from 'react';

interface IFieldListState {
    fieldToAdd: string,
    fields: JSX.Element[]
}
interface IFieldListProps {
    children: JSX.Element[]
}
export default class FieldList extends React.Component<IFieldListProps, IFieldListState> {

    public constructor(props: IFieldListProps) {
        super(props)
        this.state = { fields: props.children, fieldToAdd: 'title' }
    }

    public onDragStart = () => {
        console.log('start')
        /*...*/
    };
    public onDragUpdate = () => {
        /*...*/
    }
    public onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        console.log(this.state.fields)
        const fields = this.reorder(
            this.state.fields,
            result.source.index,
            result.destination.index
        );
        console.log(fields)
        console.log(result.source.index, result.destination.index)
        this.setState({ fields });
    };

    public render() {
        return (
            <div>
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}
            >
                <Droppable droppableId="droppable-1" type="PERSON">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {this.state.fields.map((e, index) => React.cloneElement(e, { index }))}
                        </div>
                    )}
                </Droppable>;
            </DragDropContext>
            <Row><Col span={24}>
            <Select onSelect={this.changeSelectedField} value={this.state.fieldToAdd}>
                    <Select.Option value="title">Section title</Select.Option>
                    <Select.Option value="text">Custom text</Select.Option>
                    <Select.Option value="education">Education</Select.Option>
            </Select>
            <Button  type="primary" onClick={this.addField}>Add a new field</Button>
            </Col></Row>
            </div>
        );
    }

    public changeSelectedField = (value: string) => this.setState({fieldToAdd: value}) 

    public removeField = (index: number) => {
        this.setState({fields: this.state.fields.splice(index, 1)})
    }

    public addField = () => {
        const key = this.state.fields.length;
        let field = null;
        switch(this.state.fieldToAdd) {
            case 'title':
            field = <TitleField index={key}/>;
            break;
            case 'text':
            field = <TextField index={key}/>
            break;
            case 'education':
            field = <EducationField index={key}/>
            break;
        }
        if( field ) {
            const fields = [...this.state.fields, field];
            this.setState({fields})
        }
    }

    private reorder = (list: any[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
}