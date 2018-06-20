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
    location?: string,
    startYear?: number,
    endYear?: number,
    startMonth?: number,
    endMonth?: number
}

interface IEducationFieldState extends IFieldState {
    from?: moment.Moment,
    to?: moment.Moment,
    universityName: string,
    faculty: string,
    location: string,
}

export default class EducationField extends Field<IEducationFieldProps, IEducationFieldState> {
    constructor(props: IEducationFieldProps) {
        super(props)
        this.state = {
            from: props.startYear ? moment({year: props.startYear, month: props.startMonth || 0}) : undefined,
            to: props.endYear ? moment({year: props.endYear, month: props.endMonth || 0}) : undefined,
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
                        <MonthPicker value={this.state.from} onChange={this.updateStartDate} placeholder="Education start date"/>
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem label="Select end date">
                        <MonthPicker value={this.state.to} onChange={this.updateEndDate} placeholder="Education end date"/>
                    </FormItem>
                </Col>
                <Col span={8}>
                <FormItem label="University location">
                    <Input value={this.state.location} onChange={this.updateLocation} placeholder="Kraków"/>
                </FormItem>
                </Col>
            </Row>
            <Row><Col span={24}>
            <FormItem label="University name">
                <Input value={this.state.universityName} onChange={this.updateUniversity} placeholder="AGH University of Science and Technology"/>
            </FormItem>
            </Col></Row>
            <Row><Col span={24}>
            <FormItem label="Faculty">
                <Input value={this.state.faculty} onChange={this.updateFaculty} placeholder="Faculty of Computer Science, Electronics and Telecommunication, Computer Science"/>
            </FormItem>
            </Col></Row>
            </div>)
    }

    public updateStartDate = (from: moment.Moment, dateString: string) => {
        this.setState({from})
        this.notifyChange()
    }

    public updateEndDate = (to: moment.Moment, dateString: string) => {
        this.setState({to})
        this.notifyChange()
    }

    public updateFaculty = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({faculty: event.target.value});
        this.notifyChange()
    }

    public updateUniversity = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({universityName: event.target.value});
        this.notifyChange()
    }

    public updateLocation= (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({location: event.target.value});
        this.notifyChange()
    }
}