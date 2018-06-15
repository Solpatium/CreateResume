import { Row } from 'antd';
import * as React from 'react';
import './App.scss';
import {AnyField} from './fields/Field'
import WorkField from './fields/WorkField';
import TextField from './fields/TextField';
import TitleField from './fields/TitleField';
import EducationField from './fields/EducationField';

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
        console.log(props)
    }

    public render() {
        console.log(this.props.fields)
        const image = this.get('picture')
        return (<div className="cv-inside cv-preview">
            <div className="cv-document cv-basic">
            <Row>
                {image ? <img src={image}/> : ''}
                <span className="name">{this.get('name')}</span>
                <span className="surname">{this.get('surname')}</span>
                <span className="location">{this.get('location')}</span>
                <span className="telephone">{this.get('telephone')}</span>
                <span className="email">{this.get('email')}</span>
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
            console.log(f.constructor.name)
            switch(f.constructor.name) {
                case EducationField.name:
                    f = f as EducationField;

                    return <Row>
                            <p key={index}>{f.state.universityName}</p>
                            <span className="faculty">{f.state.faculty}</span>
                            <span className="location">{f.state.location}</span>
                            {f.state.from ? 
                                <span className="startDate">{f.state.from.format("YYYY-MM")}</span>
                                : ''
                            }
                            {f.state.to ? 
                                <span className="startDate">{f.state.to.format("YYYY-MM")}</span>
                                : ''
                            }
                        </Row>

                case TextField.name:
                    f = f as TextField;
                    return <p key={index}>{f.state.value}</p>

                case TitleField.name:
                    f = f as TitleField;
                    return <h2 key={index}>{f.state.value}</h2>

                case WorkField.name:
                    f = f as WorkField;

                    let endDate = ''
                    if(f.state.currently === true){
                        endDate = "currently"
                    } else
                    if( f.state.to ) {
                        endDate = f.state.to.format("YYYY-MM")
                    }

                    return <Row>
                        <p key={index}>{f.state.company}</p>
                        <span className="position">{f.state.position}</span>
                        <span className="description">{f.state.description}</span>
                        <span className="location">{f.state.location}</span>
                        {f.state.from ? 
                                <span className="startDate">{f.state.from.format("YYYY-MM")}</span>
                                : ''
                            }
                        {endDate ? 
                            <span className="startDate">{endDate}</span>
                            : ''
                        }
                    </Row>
            }
            return <span key={index}/>
    });

        return <div>{fields}</div>;
    }

    public get = (name: string) => this.props.data.has(name) ? this.props.data.get(name) : this.props.user[name] || '';

}
