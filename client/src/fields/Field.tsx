import { Draggable } from 'react-beautiful-dnd';
import * as React from 'react';
import { Card, Button } from 'antd';
import EducationField from './EducationField';
import TextField from './TextField';
import TitleField from './TitleField';
import WorkField from './WorkField';


export interface IFieldProps {
    index: number,
    onChange?: VoidFunction,
    onDelete?: VoidFunction
}

export interface IFieldState {
    id: string,
    hidden: boolean
}

export abstract class Field<Props extends IFieldProps, State extends IFieldState> extends React.Component<Props, State> {
    abstract get name(): string;
    abstract get content(): React.ReactNode;
    protected static counter = 0;

    constructor(props: Props) {
        super(props);
        Field.counter += 1;
    }

    public render() {
        const index = this.props.index;
        const className = this.state.hidden ? 'card-content-hidden field' : 'field';
        return (
            <Draggable draggableId={this.state.id} key={this.state.id} index={index}>
                {(provided, snapshot) => {
                    const draggableProps = provided.draggableProps as any
                    return (
                        <div
                            ref={provided.innerRef}

                            {...provided.dragHandleProps}

                            {...draggableProps}

                            className={className}
                        >
                            <Card
                                title={this.name}
                                extra={this.buttons()}>
                                {this.content}
                            </Card>
                        </div>
                    )
                }}
            </Draggable>
        )
    }
    
    public notifyChange = () => this.props.onChange && this.props.onChange();

    private buttons = () => {
        const icon = this.state.hidden ? 'up' : 'down';
        return (<div className="card-actions">
            <Button type="danger" onClick={this.delete} shape="circle" icon="close" size="default" />
            <Button onClick={this.toggle} shape="circle" icon={icon} size="default" />
        </div>)
    }

    private delete = () => this.props.onDelete && this.props.onDelete()

    private toggle = () => this.setState({ hidden: !this.state.hidden })
}

export type AnyField = EducationField | TextField | TitleField | WorkField;
