import {Field, IFieldProps, IFieldState} from './Field';
import * as React from 'react';
import { Form, Input, Row, Col, Rate } from 'antd';
const FormItem = Form.Item;

interface ISkillFieldProps extends IFieldProps {
    name?: string,
    rating?: number
}

interface ISkillFieldState extends IFieldState {
    name: string,
    rating: number
}

export default class SkillField extends Field<ISkillFieldProps, ISkillFieldState> {
    constructor(props: ISkillFieldProps) {
        super(props)
        this.state = {
            hidden: false,
            id: `field-${Field.counter}`,
            name: props.name || '',
            rating: props.rating || 1
        }
    }

    public get name() { return 'Skill' };

    public get content(): React.ReactNode {
        return (
            <Row>
                <Col span={12}>
                    <FormItem label="Skill">
                    <Input onChange={this.updateName} placeholder="English" value={this.state.name} style={{ "width" : "90%"}}/>
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem label="Rating">
                    <Rate onChange={this.updateRating} value={this.state.rating}/>
                    </FormItem>
                </Col>
            </Row>)
    }

    public updateRating = (rating: number) => {
        this.setState({rating})
        this.notifyChange()
    }

    public updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({name: event.target.value})
        this.notifyChange()
    }
}