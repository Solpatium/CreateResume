import {Field, IFieldProps, IFieldState} from './Field';
import * as React from 'react';
import { Input, DatePicker, Row, Col, Form } from 'antd';
const FormItem = Form.Item;
const { MonthPicker} = DatePicker;
import moment from 'moment';
const {TextArea} = Input
import { Switch } from 'antd';

interface IWorkFieldProps extends IFieldProps {
    from?: moment.Moment,
    to?: moment.Moment,
    company?: string,
    position?: string,
    description?: string,
    location?: string,
    startYear?: number,
    endYear?: number,
    startMonth?: number,
    endMonth?: number,
    currently?: boolean
}

interface IWorkFieldState extends IFieldState {
    from?: moment.Moment,
    to?: moment.Moment,
    company: string,
    position: string,
    description: string,
    location: string,
    startYear: number,
    endYear: number,
    startMonth: number,
    endMonth: number,
    currently: boolean
}

export default class WorkField extends Field<IWorkFieldProps, IWorkFieldState> {
    constructor(props: IWorkFieldProps) {
        super(props)
        this.state = {
            startYear: props.startYear ? props.startYear : 0,
            endYear: props.endYear ? props.endYear : 0,
            startMonth: props.startMonth ? props.startMonth : 0,
            endMonth: props.endMonth ? props.endMonth : 0,
            position: props.position ? props.position : '',
            description: props.description ? props.description : '',
            hidden: false,
            id: `field-${Field.counter}`,
            location: props.location ? props.location : '',
            company: props.company ? props.company : '',
            currently: props.currently ? props.currently : false,
        }
    }
// <Checkbox onChange={this.onChange}>Currrently working</Checkbox>
    public get name() { return 'Work experience' };

    public get content(): React.ReactNode {
        return (<div>
            <Row>
                <Col span={8}>
                    <FormItem label="Select start date">
                        <MonthPicker placeholder="Start date" onChange={this.updateStartDate}/>
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem label="Select end date">
                        <MonthPicker placeholder="End date" onChange={this.updateEndDate} disabled={this.state.currently}/>
                    </FormItem>
                    <Switch onChange={this.updateCurrently} />
                    <label>Currently working</label>
                </Col>
                <Col span={8}>
                <FormItem label="Location">
                    <Input placeholder="Kraków" onChange={this.updateLocation} />
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <FormItem label="Company">
                        <Input placeholder="Google" onChange={this.updateCompany} style={{ "width" : "90%"}}/>
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem label="Position">
                        <Input placeholder="Developer" onChange={this.updatePosition}/>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={48}>
                    <FormItem label="Job Description">
                        <TextArea placeholder="I was doing pancakes" onChange={this.updateDescription} rows={5}/>
                    </FormItem>
                </Col>
            </Row>
            </div>)
    }

    public updateCompany= (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({company: event.target.value});
        this.notifyChange()
    }
    public updatePosition= (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({position: event.target.value});
        this.notifyChange()
    }
    public updateDescription= (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({description: event.target.value});
        this.notifyChange()
    }
    public updateEndDate = (date: moment.Moment, dateString: string) => {
        if( date !== null) {
            this.setState({endYear: date.year(), endMonth: date.month() + 1});
        }
        else{
            this.setState({endYear: 0, endMonth: 0});
        }
        this.notifyChange()
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
    public updateCurrently= (event: any) => {
        this.setState({currently: !this.state.currently })
        this.notifyChange()
    }
    public updateLocation= (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({location: event.target.value});
        this.notifyChange()
    }


}