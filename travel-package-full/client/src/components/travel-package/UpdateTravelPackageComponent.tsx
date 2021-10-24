import { Component, SyntheticEvent } from "react";
import genericImage from '../../assets/generic-image.jpg';
import { User } from '../../models/UserInterfaces';
import { TravelPackageService } from '../../services/TravelPackageService'

interface CustomEvent {
    target: HTMLInputElement
}

interface UpdateTravelPackageComponentProps {
    user : User
    travelPackageId: string
    location: string
    name: string
    openDate: string
    endDate: string
    attachmentUrl?: string
    uploadUrl: (travelPackegeId: string, file: any, user: User) => void
    deletePackage: (travelPackegeId: string) => void
    updatePackage: (travelPackageId: string, location: string, name: string, openDate: string, endDate: string) => void
}

interface UpdateTravelPackageComponentState {
    location: string
    name: string
    openDate: string
    endDate: string
    file: any
}

export class UpdateTravelPackageComponent extends Component<UpdateTravelPackageComponentProps, UpdateTravelPackageComponentState> {

    private service = new TravelPackageService();

    constructor(props:UpdateTravelPackageComponentProps) {
        super(props)
        this.state = {
            name: props.name, 
            location: props.location, 
            openDate: props.openDate,
            endDate: props.endDate, 
            file: undefined
        }
    }

    private setName(event: CustomEvent) {
        this.setState({name: event.target.value})
    }

    private setLocation(event: CustomEvent) {
        this.setState({location: event.target.value})
    }

    private handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files) return
    
        this.setState({
          file: files[0]
        })
    }

    private setOpenDate(event: CustomEvent) {
        this.setState({openDate: event.target.value})
    }

    private setEndDate(event: CustomEvent) {
        this.setState({endDate: event.target.value})
    }

    private renderImage() {
        if (this.props.attachmentUrl) {
            return <img src={this.props.attachmentUrl} alt=''/>
        } else {
            return <img src={genericImage} alt=''/>
        }
    }

    render(){
        return (<div className='spaceComponent'>
                    {this.renderImage()}
                    <p className='space-text'><label>Name:</label><input name='name' type="text" value={this.state.name} onChange={e => this.setName(e)}/></p>
                    <p className='space-text'><label>Location: </label><input name='location' type="text" value={this.state.location} onChange={e => this.setLocation(e)}/></p>
                    <p className='space-text'><label>Open Date:</label><input name='openDate' type="date" value={this.state.openDate} onChange={e => this.setOpenDate(e)}/></p>
                    <p className='space-text'><label>End Date:</label><input name='endDate' type="date" value={this.state.endDate} onChange={e => this.setEndDate(e)}/></p>
                    <p className='space-text'>
                        <input type="file" accept="image/*" placeholder="Image to upload" onChange={this.handleFileChange} />
                        <button onClick={()=>this.props.uploadUrl(this.props.travelPackageId, this.state.file, this.props.user)}>Upload</button>
                    </p>
                    <p className='name'> 
                        <button onClick={()=>this.props.updatePackage(this.props.travelPackageId, this.state.location, this.state.name, this.state.openDate, this.state.endDate)}>Save</button>
                        <button onClick={()=>this.props.deletePackage(this.props.travelPackageId)}>Delete</button>
                    </p>
                </div>)
    }
}