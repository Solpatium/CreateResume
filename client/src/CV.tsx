import { Row } from 'antd';
import * as React from 'react';
import './App.scss';

interface ICvDataProps {
    user: any,
    data: Map<string, string>,
    fields: Element[]
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
        const image = this.get('picture')
        return (<div className="cv-inside cv-preview">
            <div className="cv-document cv-basic">
            <Row>
                {image ? <img src={image}/> : ''}
                <span className="name">{this.get('name')}</span>
                <span className="surname">{this.get('surname')}</span>
            </Row>
            </div>
        </div>)
    }

    public get = (name: string) => this.props.data.has(name) ? this.props.data.get(name) : this.props.user[name] || '';

}
