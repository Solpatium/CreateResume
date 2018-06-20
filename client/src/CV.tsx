import { Row, Rate, Icon } from 'antd';
import * as React from 'react';
import './App.scss';
import {AnyField} from './fields/Field'
import WorkField from './fields/WorkField';
import TextField from './fields/TextField';
import TitleField from './fields/TitleField';
import EducationField from './fields/EducationField';
import SkillField from './fields/SkillField'

interface ICvDataProps {
    user: any,
    data: Map<string, string>,
    fields: Array<React.RefObject<AnyField>>
}
export default class CV extends React.Component<ICvDataProps> {
    constructor(props: any) {
        super(props)
        this.state = {
            data: new Map()
        };
    }

    public render() {
        const image = this.get('picture')
        return (<div className="cv-inside cv-preview">
            <div className="cv-document cv-basic">
            <Row className="basic-info">
                {image ? <img src={image}/> : ''}
                <div className="full-name">
                    <span className="name">{this.get('name')}</span>
                    <span className="surname">{this.get('surname')}</span>
                    <div className="occupation">{this.get('occupation')}</div>
                </div>
                <div className="rest">
                    <div className="location"><Icon type="environment-o" />{this.get('location')}</div>
                    <div className="telephone"><Icon type="phone" />{this.get('telephone')}</div>
                    <div className="email"><Icon type="mail" />{this.get('email')}</div>
                </div>
            </Row>
            {this.renderFields()}
            </div>
        </div>)
    }

    public renderFields = () => {
        let index = 0;
        const fields = this.props.fields
        .map(ref => ref.current)
        .filter( f => f != null )
        .map(f => {
            index++;
            f = f as AnyField;

                if( f instanceof EducationField) {
                    return <Row key={index} className="education-field">
                            <span className="univeristy" key={index}>{f.state.universityName}</span>
                            <span className="faculty">{f.state.faculty}</span>
                            {f.state.from ? 
                                <span className="start-date">{f.state.from.format("YYYY.MM")}</span>
                                : ''
                            }
                            {f.state.to ? 
                                <span className="end-date">{f.state.to.format("YYYY.MM")}</span>
                                : ''
                            }
                            <span className="location">{f.state.location}</span>
                        </Row>
                }

                if( f instanceof TextField) {
                    return <p className="text-field" key={index}>{this.renderTextField(f.state.value)}</p>
                }

                if( f instanceof TitleField ) {
                    return <Row key={index} className="title-field"><h2 className="title-text" key={index}>{f.state.value}</h2></Row>
                }

                if( f instanceof WorkField ) {
                    let endDate = ''
                    if(f.state.currently === true){
                        endDate = "Present";
                    } else
                    if( f.state.to ) {
                        endDate = f.state.to.format("YYYY.MM")
                    }

                    return <Row key={index} className="work-field">
                        <span className="position">{f.state.position}</span>
                        <span className="company" key={index}>{f.state.company}</span>
                        <span className="description">{this.renderTextField(f.state.description)}</span>
                        {f.state.from ? 
                                <span className="start-date">{f.state.from.format("YYYY.MM")}</span>
                                : ''
                            }
                        {endDate ? 
                            <span className="end-date">{endDate}</span>
                            : ''
                        }
                        <span className="location">{f.state.location}</span>
                    </Row>
                }

                if( f instanceof SkillField ){
                    return (<span key={index} className="skill-field">
                        <span className="name">{f.state.name}</span>
                        <Rate character={<span className="rating-star" />} disabled={true} value={f.state.rating} />
                    </span>)
                }

            return <span key={index}/>
    });

        return <div>{fields}</div>;
    }

    public get = (name: string) => this.props.data.has(name) ? this.props.data.get(name) : this.props.user[name] || '';

    private renderTextField = (text: string) => text.split("\n").map((line, index) => <span key={index}>{line}<br/></span>)

}
