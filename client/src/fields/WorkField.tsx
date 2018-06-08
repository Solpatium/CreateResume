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
        const state: IWorkFieldState = {
            position: props.position ? props.position : '',
            description: props.description ? props.description : '',
            hidden: false,
            id: `field-${Field.counter}`,
            location: props.location ? props.location : '',
            company: props.company ? props.company : '',
            currently: props.currently ? props.currently : false,
        }

        if( props.from ) {
            state.from = props.from;
        }

        if( props.to ) {
            state.to = props.to;
        }

        this.state = state;
    }
// <Checkbox onChange={this.onChange}>Currrently working</Checkbox>
    public get name() { return 'Work experience' };

    public get content(): React.ReactNode {
        return (<div>
            <Row>
                <Col span={8}>
                    <FormItem label="Select start date">
                        <MonthPicker placeholder="Start date"/>
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem label="Select end date">
                        <MonthPicker placeholder="End date" disabled={this.state.currently}/>
                    </FormItem>
                    <Switch onChange={this.notifyChange} />
                    <label>Currently working</label>
                </Col>
                <Col span={8}>
                <FormItem label="Location">
                    <Input placeholder="Kraków"/>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <FormItem label="Company">
                        <Input placeholder="Google" style={{ "width" : "90%"}}/>
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem label="Position">
                        <Input placeholder="Developer" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={48}>
                    <FormItem label="Job Description">
                        <TextArea placeholder="I was doing pancakes" onChange={this.update} rows={5}/>
                    </FormItem>
                </Col>
            </Row>
            </div>)
    }

    public onChange = (event: any) => {
        this.setState({
            currently: !this.state.currently,
        });
        this.notifyChange()
    }

    public update = (event: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({description: event.target.value})

}