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
    startYear: number,
    endYear: number,
    startMonth: number,
    endMonth: number
}

export default class EducationField extends Field<IEducationFieldProps, IEducationFieldState> {
    constructor(props: IEducationFieldProps) {
        super(props)
        this.state = {
            startYear: props.startYear ? props.startYear : 0,
            endYear: props.endYear ? props.endYear : 0,
            startMonth: props.startMonth ? props.startMonth : 0,
            endMonth: props.endMonth ? props.endMonth : 0,
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
                        <MonthPicker onChange={this.updateStartDate} placeholder="Education start date"/>
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem label="Select end date">
                        <MonthPicker onChange={this.updateEndDate} placeholder="Education end date"/>
                    </FormItem>
                </Col>
                <Col span={8}>
                <FormItem label="University location">
                    <Input onChange={this.updateLocation} placeholder="Kraków"/>
                </FormItem>
                </Col>
            </Row>
            <Row><Col span={24}>
            <FormItem label="University name">
                <Input onChange={this.updateUniversity} placeholder="AGH University of Science and Technology"/>
            </FormItem>
            </Col></Row>
            <Row><Col span={24}>
            <FormItem label="Faculty">
                <Input onChange={this.updateFaculty} placeholder="Faculty of Computer Science, Electronics and Telecommunication, Computer Science"/>
            </FormItem>
            </Col></Row>
            </div>)
    }

    public updateStartDate = (date: moment.Moment, dateString: string) => {
        if( date !== null) {
            this.setState({startYear: date.year(), startMonth: date.month() + 1});
        }
        else{
            this.setState({startYear: 0, startMonth: 0});
        }
        this.notifyChange()
    }

    public updateEndDate = (date: moment.Moment, dateString: string) => {
        if( date !== null) {
            this.setState({endYear: date.year(), endMonth: date.month() + 1});
        }
        else {
            this.setState({endYear: 0, endMonth: 0});
        }
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