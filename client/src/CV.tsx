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
                    return <p key={index}>{f.state.faculty}</p>

                case TextField.name:
                    f = f as TextField;
                    return <p key={index}>{f.state.value}</p>

                case TitleField.name:
                    f = f as TitleField;
                    return <h2 key={index}>{f.state.value}</h2>

                case WorkField.name:
                    f = f as WorkField;
                    return <p key={index}>{f.state.description}</p>
            }
            return <span key={index}/>
    });

        return <div>{fields}</div>;
    }

    public get = (name: string) => this.props.data.has(name) ? this.props.data.get(name) : this.props.user[name] || '';

}
