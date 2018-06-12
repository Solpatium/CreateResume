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
        let startYear = 0;
        let endYear = 0;
        let startMonth = 0;
        let endMonth = 0;
        let sY = '';
        let eY = '';
        let sM = '';
        let eM = '';
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
                    startYear = f.state.startYear;
                    if(startYear !== 0) {sY = String(startYear)};

                    endYear = f.state.endYear;
                    if(endYear !== 0) {eY = String(endYear)};

                    startMonth = f.state.startMonth;
                    if(startMonth !== 0) {sM = String(startMonth)};

                    endMonth = f.state.endMonth;
                    if(endMonth !== 0) {eM = String(endMonth)};

                    return <Row>
                            <p key={index}>{f.state.universityName}</p>
                            <span className="faculty">{f.state.faculty}</span>
                            <span className="location">{f.state.location}</span>
                            <span className="StartYear">{sY}</span>
                            <span className="StartMonth">{sM}</span>
                            <span className="EndYear">{eY}</span>
                            <span className="EndMonth">{eM}</span>
                        </Row>

                case TextField.name:
                    f = f as TextField;
                    return <p key={index}>{f.state.value}</p>

                case TitleField.name:
                    f = f as TitleField;
                    return <h2 key={index}>{f.state.value}</h2>

                case WorkField.name:
                    f = f as WorkField;
                    startYear = f.state.startYear;
                    if(startYear !== 0) {sY = String(startYear)};

                    endYear = f.state.endYear;
                    if(endYear !== 0) {eY = String(endYear)};

                    startMonth = f.state.startMonth;
                    if(startMonth !== 0) {sM = String(startMonth)};

                    endMonth = f.state.endMonth;
                    if(endMonth !== 0) {eM = String(endMonth)};

                    let currently = ''
                    if(f.state.currently === true){
                        currently = "CurrentlyWorking"
                    }

                    return <Row>
                        <p key={index}>{f.state.company}</p>
                        <span className="position">{f.state.position}</span>
                        <span className="description">{f.state.description}</span>
                        <span className="location">{f.state.location}</span>
                        <span className="currently">{currently}</span>
                        <span className="StartYear">{sY}</span>
                        <span className="StartMonth">{sM}</span>
                        <span className="EndYear">{eY}</span>
                        <span className="EndMonth">{eM}</span>
                    </Row>
            }
            return <span key={index}/>
    });

        return <div>{fields}</div>;
    }

    public get = (name: string) => this.props.data.has(name) ? this.props.data.get(name) : this.props.user[name] || '';

}
