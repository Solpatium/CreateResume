import { Droppable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import {Row, Col, Button, Select} from 'antd';
import TitleField from './TitleField'
import TextField from './TextField'
import {AnyField} from './Field'
import SkillField from './SkillField'
import EducationField from './EducationField'
import * as React from 'react';
import WorkField from "./WorkField";

interface IFieldListState {
    fieldToAdd: string,
    fields: JSX.Element[]
    shouldRefresh: boolean
}
interface IFieldListProps {
    children: JSX.Element[],
    onUpdate: (fields: object[]) => void
}
export default class FieldList extends React.Component<IFieldListProps, IFieldListState> {
    private fieldRefs : Array<React.RefObject<AnyField>> = [];

    public constructor(props: IFieldListProps) {
        super(props)
        this.state = { fields: props.children, fieldToAdd: 'title', shouldRefresh: true }
    }

    public onDragStart = () => {
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
        this.setState({ fields, shouldRefresh: true });
    };

    public render() {
        this.fieldRefs = this.state.fields.map( _ => React.createRef());

        const toReturn =  (
            <div>
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}
            >
                <Droppable droppableId="droppable-1" type="PERSON">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {this.state.fields.map((e, index) => React.cloneElement(e, { onDelete: this.removeField(index), onChange: this.update,ref: this.fieldRefs[index], index }))}
                        </div>
                    )}
                </Droppable>;
            </DragDropContext>
            <Row><Col span={24}>
            <Select onSelect={this.changeSelectedField} value={this.state.fieldToAdd}>
                    <Select.Option value="title">Section title</Select.Option>
                    <Select.Option value="text">Custom text</Select.Option>
                    <Select.Option value="education">Education</Select.Option>
                    <Select.Option value="work">Work</Select.Option>
                    <Select.Option value="skill">Skill</Select.Option>
            </Select>
            <Button  type="primary" onClick={this.addField}>Add a new field</Button>
            </Col></Row>
            </div>
        );

        return toReturn;
    }

    public componentDidMount() {
        this.update()
    }

    // public 

    public shouldComponentUpdate(pref: any, next: any) {
        return next.shouldRefresh;
    }

    public componentDidUpdate() {
        this.setState({shouldRefresh: false})
        this.update();
    }

    public changeSelectedField = (value: string) => {
        console.log(value)
        this.setState({fieldToAdd: value, shouldRefresh: true}) 
    }
    public removeField = (index: number) => () => {
        console.log("REMOVING")
        console.log(index)
        const newFields = [...this.state.fields]
        newFields.splice(index, 1)
        this.setState({fields: newFields, shouldRefresh: true})
        this.update();
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
            case 'work':
            field = <WorkField index={key}/>
            case 'skill':
            field = <SkillField index={key}/>
            break;
        }
        if( field ) {
            const fields = [...this.state.fields, field];
            this.setState({fields, shouldRefresh: true})
        }
    }

    public update = () => {
        this.props.onUpdate(this.fieldRefs);
    }

    private reorder = (list: any[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
}