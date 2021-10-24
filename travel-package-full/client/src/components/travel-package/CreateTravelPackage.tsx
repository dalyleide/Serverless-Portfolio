import { Component, SyntheticEvent } from "react";
import { TravelPackageService } from "../../services/TravelPackageService"
import { User } from "../../models/UserInterfaces"

interface CustomEvent {
    target: HTMLInputElement
}
export interface CreateTravelPackageState {
    location: string
    name: string
    openDate: string
    endDate: string
}

interface CreateTravelPackageProps {
    user: User;
}

export class CreateTravelPackage extends Component<CreateTravelPackageProps, CreateTravelPackageState> {

    private service = new TravelPackageService()
    state: CreateTravelPackageState = {
        name:'',
        location: '',
        openDate: '', 
        endDate: ''
    }

    private setName(event: CustomEvent) {
        this.setState({ name: event.target.value });
    }

    private setLocation(event: CustomEvent) {
        this.setState({ location: event.target.value });
    }

    private setEndDate(event: CustomEvent) {
        this.setState({ endDate: event.target.value });
    }

    private setOpenDate(event: CustomEvent) {
        this.setState({ openDate: event.target.value });
    }

    private async handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        const stateClone = {...this.state};
        try {
            const travel = await this.service.createTravelPackage(this.props.user.token, stateClone);  
            alert(`Created travelPackage with id: ${travel.travelPackageId}`);
        } catch (error) {
            alert(`Error while creating travelPackage: ${error}`);
        }
    }

    render() {
            return <form onSubmit={e => this.handleSubmit(e)}>
                <label>Name:</label>
                <input name='name' type="text" value={this.state.name} onChange={e => this.setName(e)} /> <br/>               
                <label>Location: </label>
                <input name='location' id="location" type="text" value={this.state.location} onChange={e => this.setLocation(e)} /><br/>
                <label>Open Date:</label>
                <input name='openDate' id="openDate" type="date" value={this.state.openDate} onChange={e => this.setOpenDate(e)} /><br/>
                <label>End Date:</label>
                <input name='endDate' id="endDate" type="date" value={this.state.endDate} onChange={e => this.setEndDate(e)} /><br/>       
                <input data-test="submit-button" type="submit" value="Create" />
            </form>
    }

} 