import {Field, IFieldProps, IFieldState} from './Field';
import * as React from 'react';
import { Form, Input } from 'antd';
const {TextArea} = Input
const FormItem = Form.Item;

interface ITextFieldProps extends IFieldProps {
    value?: string
}

interface ITextFieldState extends IFieldState {
    value: string,
}

export default class TextField extends Field<ITextFieldProps, ITextFieldState> {
    constructor(props: ITextFieldProps) {
        super(props)
        this.state = {
            hidden: false,
            id: `field-${Field.counter}`,
            value: props.value ? props.value : ''
        }
    }

    public get name() { return 'Custom text' };

    public get content(): React.ReactNode {
        return (<FormItem label="Content">
            <TextArea placeholder="I like pancakes" onChange={this.update} rows={5}/>
        </FormItem>)
    }

    public update = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({value: event.target.value})
        this.notifyChange()
    }
}