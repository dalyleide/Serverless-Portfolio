import { Component } from "react";
import genericImage from '../assets/generic-image.jpg';

interface CustomEvent {
    target: HTMLInputElement
}

interface HomeComponentProps {
    travelPackageId: string
    location: string
    name: string
    openDate: string
    endDate: string
    startDate: string
    attachmentUrl?: string
    reserveTravelPackage: (travelPackageId: string, qtdDays:string, startDate: string) => void
}

interface HomeComponentState {
    qtdDays: string
    startDate: string
}

export class HomeComponent extends Component<HomeComponentProps, HomeComponentState> {

    state: HomeComponentState = {
        qtdDays: '', 
        startDate: ''
    }

    private setQtdDays(event: CustomEvent) {
        this.setState({ qtdDays: event.target.value });
    }

    private setStartDate(event: CustomEvent) {
        this.setState({ startDate: event.target.value });
    }

    private renderImage(){
        if (this.props.attachmentUrl) {
            return <img src={this.props.attachmentUrl} alt=''/>
        } else {
            return <img src={genericImage} alt=''/>
        }
    }

    render(){
        return (<div className='spaceComponent'>
            {this.renderImage()}
            <h5 className='name' >{this.props.name}</h5>
            <label className='space-text'>{this.props.location}</label><br/>
            <label className='space-text'>{this.props.openDate}</label><br/>
            <label className='space-text'>{this.props.endDate}</label><br/>
            <p className='space-text'><label>Qtd Days: </label><input type="number" min='1' value={this.state.qtdDays} onChange={e => this.setQtdDays(e)}/></p>
            <p className='space-text'><label>Start Date:</label><input type="date" min={this.props.startDate} value={this.state.startDate} onChange={e => this.setStartDate(e)} /></p>
            <button className='name' onClick={()=>this.props.reserveTravelPackage(this.props.travelPackageId, this.state.qtdDays, this.state.startDate)}>Reserve</button>
        </div>)
    }
}