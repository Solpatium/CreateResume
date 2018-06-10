import {Field, IFieldProps, IFieldState} from './Field';
import * as React from 'react';
import { Input, DatePicker, Row, Col, Form } from 'antd';
const FormItem = Form.Item;
const { MonthPicker} = DatePicker;
import moment from 'moment';


interface IEducationFieldProps extends IFieldProps {
    from?: moment.Moment,
    to?: moment.Moment,
    universityName?: string,
    faculty?: string,
    location?: string
}

interface IEducationFieldState extends IFieldState {
    from?: moment.Moment,
    to?: moment.Moment,
    universityName: string,
    faculty: string,
    location: string
}

export default class EducationField extends Field<IEducationFieldProps, IEducationFieldState> {
    constructor(props: IEducationFieldProps) {
        super(props)
        this.state = {
            faculty: props.faculty ? props.faculty : '',
            hidden: false,
            id: `field-${Field.counter}`,
            location: props.location ? props.location : '',
            universityName: props.universityName ? props.universityName : '',
        }

    }

    public get name() { return 'Education' };

    public get content(): React.ReactNode {
        return (<div>
            <Row>
                <Col span={8}>
                    <FormItem label="Select start date">
                        <MonthPicker onChange={this.update} placeholder="Education start date"/>
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem label="Select end date">
                        <MonthPicker onChange={this.update} placeholder="Education end date"/>
                    </FormItem>
                </Col>
                <Col span={8}>
                <FormItem label="University location">
                    <Input onChange={this.update} placeholder="Kraków"/>
                </FormItem>
                </Col>
            </Row>
            <Row><Col span={24}>
            <FormItem label="University name">
                <Input onChange={this.update} placeholder="AGH University of Science and Technology"/>
            </FormItem>
            </Col></Row>
            <Row><Col span={24}>
            <FormItem label="Faculty">
                <Input onChange={this.updateFaculty} placeholder="Faculty of Computer Science, Electronics and Telecommunication, Computer Science"/>
            </FormItem>
            </Col></Row>
            </div>)
    }

    public update = (event: any) => {
        // this.setState({faculty: event.target.value});
        this.notifyChange()
    }

    public updateFaculty = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({faculty: event.target.value});
        this.notifyChange()
    }
}