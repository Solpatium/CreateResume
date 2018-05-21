import { Row, Col, Form, Input } from 'antd';
const FormItem = Form.Item;
import * as React from 'react';
import './App.scss';
import FieldList from './fields/FieldList'
import TextField from './fields/TextField'
import TitleField from './fields/TitleField'
import EducationField from './fields/EducationField'
import CV from './CV'
// import {Field} from './fields/Field'

interface ICvDataProps {
    user: any
}
interface ICvDataState {
    data: Map<string, string>
}
export default class CvCreator extends React.Component<ICvDataProps, ICvDataState> {
    constructor(props: any) {
        super(props)
        this.state = {
            data: new Map()
        };
        console.log(props)
    }

    public render() {
        return (<Row className="cv-inside">
            <Col span={12}>{this.renderFields()}</Col>
            <Col span={12} className="cv-inside"><CV user={this.props.user} data={this.state.data} fields={[]}/></Col>
        </Row>)   
    }


    public onChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => this.set(name, event.target.value);

    public set = (name: string, value: string) => {
        const data = new Map(this.state.data);
        data.set(name, value)
        this.setState({ data })
    }

    public get = (name: string) => this.state.data.has(name) ? this.state.data.get(name) : this.props.user[name] || '';

    private renderFields = () => {
        const profileImage = this.get('picture') || require('./dummy-image.png');
        return (<div><div className="cv-data">
            <Row gutter={20}>
                <Col span={16}>
                    <FormItem label="Name">
                        <Input placeholder="Jon" value={this.get('name')} onChange={this.onChange('name')}/>
                    </FormItem>
                    <FormItem label="Surname">
                        <Input placeholder="Smith" value={this.get('surname')} onChange={this.onChange('surname')}/>
                    </FormItem>
                    <FormItem label="Location">
                        <Input placeholder="Kraków, Poland" value={this.get('location')} onChange={this.onChange('location')}/>
                    </FormItem>
                    <FormItem label="Telephone">
                        <Input placeholder="+48 123 234 567" value={this.get('telephone')} onChange={this.onChange('telephone')}/>
                    </FormItem>
                    <FormItem label="Email">
                        <Input type="email" placeholder="me@domain.com" value={this.get('email')} onChange={this.onChange('email')}/>
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem label="Image">
                        <img className="photo-preview" src={profileImage} />
                        <Input type="url" placeholder="your_image_url.com" value={this.get('picture')} onChange={this.onChange('picture')}/>
                    </FormItem>
                </Col>
            </Row>
            </div>
            <FieldList>
                <TitleField key={0} index={0} />
                <TextField key={1} index={1} />
                <EducationField key={2} index={2} />
            </FieldList>
        </div>)
    }

}
