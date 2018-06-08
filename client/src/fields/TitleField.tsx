import {Field, IFieldProps, IFieldState} from './Field';
import * as React from 'react';
import { Input, Form } from 'antd';
const FormItem = Form.Item;

interface ITextFieldProps extends IFieldProps {
    value?: string
}

interface ITextFieldState extends IFieldState {
    value: string
}

export default class TitleField extends Field<ITextFieldProps, ITextFieldState> {
    constructor(props: ITextFieldProps) {
        super(props)
        this.state = {
            hidden: false,
            id: `field-${Field.counter}`,
            value: props.value ? props.value : ''
        }
    }

    public get name() { return 'Section title' };

    public get content(): React.ReactNode {
        return (
            <FormItem label="Title">
                <Input placeholder="Education" value={this.state.value} onChange={this.update} />
            </FormItem>
        )
    }

    public update = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: event.target.value});
        this.notifyChange()
    }
}