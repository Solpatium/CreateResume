import { Row, Col, Form, Input } from 'antd';
const FormItem = Form.Item;
import * as React from 'react';
import './App.scss';
import FieldList from './fields/FieldList'
import TextField from './fields/TextField'
import TitleField from './fields/TitleField'
import EducationField from './fields/EducationField'
import WorkField from './fields/WorkField'
import SkillField from './fields/SkillField'
import CV from './CV'
import {AnyField} from './fields/Field'; 
import clause from './clause';
// import { Field } from './fields/Field';
// import { Field } from './fields/Field';
// import {Field} from './fields/Field'


interface ICvDataProps {
    user: any
}
// interface Field {
//     type: string;
//     value: object;
// }
interface ICvDataState {
    data: Map<string, string>,
    fields: Array<React.RefObject<AnyField>>
}
export default class CvCreator extends React.Component<ICvDataProps, ICvDataState> {
    constructor(props: any) {
        super(props)
        this.state = {
            data: new Map(),
            fields: []
        };
    }  

    public render() {
        const dataFields = this.renderFields();
        console.log( (dataFields.props as any).children[0].state )
        return (<Row className="cv-inside">
            <Col className="hide-print" span={12}>{dataFields}</Col>
            <Col span={12} className="cv-inside">
                <CV user={this.props.user} data={this.state.data} fields={this.state.fields}/>
            </Col>
        </Row>)   
    }


    public onChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => this.set(name, event.target.value);

    public onFieldsUpdate = (fields: Array<React.RefObject<AnyField>>) => {
        this.setState({fields});
        console.log(fields);
    }

    public set = (name: string, value: string) => {
        const data = new Map(this.state.data);
        data.set(name, value)
        this.setState({ data })
    }

    public get = (name: string) => this.state.data.has(name) ? this.state.data.get(name) : this.props.user[name] || '';

    private renderFields = () => {
        const profileImage = this.get('picture') || require('./dummy-image.png');
        return (<div className="hide-print"><div className="cv-data">
            <Row className="hide-print" gutter={20}>
                <Col span={16}>
                    <FormItem label="Name">
                        <Input name="name" placeholder="Jon" value={this.get('name')} onChange={this.onChange('name')}/>
                    </FormItem>
                    <FormItem label="Surname">
                        <Input name="surname" placeholder="Smith" value={this.get('surname')} onChange={this.onChange('surname')}/>
                    </FormItem>
                    <FormItem label="Occupation">
                        <Input name="occupation" placeholder="Programmer" value={this.get('occupation')} onChange={this.onChange('occupation')}/>
                    </FormItem>
                    <FormItem label="Location">
                        <Input name="location" placeholder="Kraków, Poland" value={this.get('location')} onChange={this.onChange('location')}/>
                    </FormItem>
                    <FormItem label="Telephone">
                        <Input name="telephone" placeholder="+48 123 234 567" value={this.get('telephone')} onChange={this.onChange('telephone')}/>
                    </FormItem>
                    <FormItem label="Email">
                        <Input name="email" type="email" placeholder="me@domain.com" value={this.get('email')} onChange={this.onChange('email')}/>
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
            {this.dynamicFields()}
        </div>)
    }

    private dynamicFields = () => {
        let key=0;

        const fields = [
            <TitleField value="Education" key={key} index={key++} />,
            <EducationField key={key} index={key++}
                startYear={2015}
                faculty={`Faculty of Computer Science, Electronics and Telecommunication, Computer Science`}
                universityName={"AGH University of Science and Technology"}
                location={"Kraków"}
            />,
            <EducationField key={key} index={key++}
                startYear={2012}
                endYear={2015}
                universityName={"I Liceum Ogólnokształcące im. Kazimierza Brodzińskiego"}
                location={"Tarnów"}
            />,
            <TitleField value="Experience" key={key} index={key++} />,
        ]

        if( this.props.user.positions && this.props.user.positions.length ) {
            for(const position of this.props.user.positions) {
                const props = {
                    company: position.company,
                    currently: position.isCurrent,
                    startYear: position.startDateYear,
                    startMonth: position.startDateMonth ? position.startDateMonth-1 : 0,
                    endYear: position.endDateYear,
                    endMonth: position.endDateMonth
                }
                fields.push(<WorkField 
                    key={key} 
                    index={key++} 
                    {...props}
                />)
            }
        } else {
            fields.push(<WorkField 
                key={key} 
                index={key++} 
                company={"Januszex"}
                position={"Main ninja majster"}
                description={"My responsibilites included:\n Laying on the floor"}
                location={"Sosnowiec"}
                startYear={2017}
                startMonth={10}
                currently={true}
            />)
            fields.push(<WorkField 
                key={key} index={key++}
                company={"Januszex"}
                position={"Main ninja majster"}
                description={"My responsibilites included:\n Laying on the floor"}
                location={"Sosnowiec"}
                startYear={2015}
                startMonth={2}
                endYear={2017}
                endMonth={9}
            />)
        }
                
        const add = [
            <TitleField key={key} index={key++} value="Skills"/>,
            <SkillField key={key} index={key++} name="English" rating={4}/>,
            <SkillField key={key} index={key++} name="HTML5" rating={5}/>,
            <SkillField key={key} index={key++} name="CSS3" rating={5}/>,
            <SkillField key={key} index={key++} name="JavaScript" rating={4}/>,
            <SkillField key={key} index={key++} name="PHP" rating={4}/>,
            <SkillField key={key} index={key++} name="Python3" rating={4}/>,
            <SkillField key={key} index={key++} name="Java" rating={3}/>,
            <SkillField key={key} index={key++} name="SQL" rating={3}/>,
            <TextField value={clause} key={key} index={key++} />
        ]
        add.forEach(f => fields.push(f));

        return <FieldList onUpdate={this.onFieldsUpdate}>{fields}</FieldList>
        
    }

}
