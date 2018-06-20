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
    currently: boolean
}

export default class WorkField extends Field<IWorkFieldProps, IWorkFieldState> {
    constructor(props: IWorkFieldProps) {
        super(props)
        this.state = {
            from: props.startYear && props.startMonth ? moment({year: props.startYear, month: props.startMonth}) : undefined,
            to: props.endYear && props.endMonth ? moment({year: props.endYear, month: props.endMonth}) : undefined,
            position: props.position ? props.position : '',
            description: props.description ? props.description : '',
            hidden: false,
            id: `field-${Field.counter}`,
            location: props.location ? props.location : '',
            company: props.company ? props.company : '',
            currently: props.currently || false
        }
    }
// <Checkbox onChange={this.onChange}>Currrently working</Checkbox>
    public get name() { return 'Work experience' };

    public get content(): React.ReactNode {
        return (<div>
            <Row>
                <Col span={8}>
                    <FormItem label="Select start date">
                        <MonthPicker value={this.state.from} placeholder="Start date" onChange={this.updateStartDate}/>
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem label="Select end date">
                        <MonthPicker value={this.state.to} placeholder="End date" onChange={this.updateEndDate} disabled={this.state.currently}/>
                    </FormItem>
                    <Switch checked={this.state.currently} onChange={this.updateCurrently} />
                    <label>Currently working</label>
                </Col>
                <Col span={8}>
                <FormItem label="Location">
                    <Input value={this.state.location} placeholder="Kraków" onChange={this.updateLocation} />
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <FormItem label="Company">
                        <Input value={this.state.company} placeholder="Google" onChange={this.updateCompany} style={{ "width" : "90%"}}/>
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem label="Position">
                        <Input value={this.state.position} placeholder="Developer" onChange={this.updatePosition}/>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={48}>
                    <FormItem label="Job Description">
                        <TextArea value={this.state.description} placeholder="I was doing pancakes" onChange={this.updateDescription} rows={5}/>
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
    public updateEndDate = (to: moment.Moment, dateString: string) => {
        this.setState({to})
        this.notifyChange()
    }
    public updateStartDate = (from: moment.Moment, dateString: string) => {
        this.setState({from})
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