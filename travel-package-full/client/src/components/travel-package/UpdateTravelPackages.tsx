import { Component } from "react";
import { TravelPackageItem } from "../../models/TravelPackageInterfaces"
import { TravelPackageService } from "../../services/TravelPackageService";
import { UpdateTravelPackageComponent } from "./UpdateTravelPackageComponent";
import { User } from '../../models/UserInterfaces'
import { UpdateTravelPackageRequest } from '../../models/TravelPackageInterfaces'
import { ConfirmModalComponent } from './ConfirmModalComponent';

interface UpdateTravelPackagesState {
    travels: Map<string, TravelPackageItem>
    showModal: boolean,
    modalContent: string, 
    title: string
}

interface UpdateTravelPackagesProps {
    user: User;
}

export class UpdateTravelPackages extends Component<UpdateTravelPackagesProps, UpdateTravelPackagesState> {

    private service= new TravelPackageService();

    constructor(props: UpdateTravelPackagesProps) {
        super(props)
        this.state = {
            travels: new Map<string, TravelPackageItem>(),
            showModal: false,
            modalContent: '', 
            title: ''
        }
        this.updatePackage = this.updatePackage.bind(this)
        this.deletePackage = this.deletePackage.bind(this)
        this.uploadUrl = this.uploadUrl.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    async componentDidMount() {
        console.log(this.props.user)
        const travels = await this.service.getTravelPackage(this.props.user.token)
            this.setState({
                travels:  new Map(travels.map(i=>[i.travelPackageId, i]))
            });
    }

    private async deletePackage(travelPackegeId: string) {
        try {
            await this.service.deleteTravelPackage(this.props.user.token, travelPackegeId)   
            const travels = new Map(this.state.travels);
            travels.delete(travelPackegeId);
            this.setState({ 
                travels: travels,
                showModal: true,
                modalContent: 'Success deleting package ${travelPackegeId}',
                title: 'Success: '
            }) 

        } catch (error) {
            console.log(error)
            this.setState({
                showModal: true,
                title: 'Some problems occurred with your order: ',
                modalContent: `Error deleting package with id ${travelPackegeId} Error ${error}`
            })
        }
    }

    private async updatePackage (travelPackageId: string, location: string, name: string, openDate: string, endDate: string){
        try {
            const update:UpdateTravelPackageRequest ={
                name: name, 
                location: location, 
                openDate: openDate, 
                endDate: endDate
            }
            await this.service.updateTravelPackage(this.props.user.token, travelPackageId, update)   
            this.setState({ 
                showModal: true,
                title: 'Success:',
                modalContent: `Success updating package ${travelPackageId}`
            }) 

        } catch (error) {
            console.log(error)
            this.setState({
                showModal: true,
                title: 'Some problems occurred with your order: ',
                modalContent: `Error updating package with id ${travelPackageId} Error ${error}`
            })
        }
    }

    private async uploadUrl(travelPackageId: string, file: any) {
        try {
            if (!file) {
                this.setState({
                    showModal: true,
                    modalContent: 'File should be selected', 
                    title: 'Some problems occurred with your order: ',
                })
              return
            }
            const uploadUrl = await this.service.getUploadUrl(this.props.user.token, travelPackageId)
            await this.service.uploadFile(uploadUrl, file)

            this.setState({
                showModal: true,
                modalContent: 'File uploaded successfully! Please reload the page to see the change', 
                title: 'Success: ',
            })
          return
          } catch (e) {
            this.setState({
                showModal: true,
                modalContent: `Error: ${e}`,
                title: 'Some problems occurred with your order: ',
            })
          } 
    }

    private renderTravelPackages() {
        const rows: any[] = []
        this.state.travels.forEach((travel) =>{
            rows.push(
                <UpdateTravelPackageComponent user={this.props.user} 
                    key={travel.travelPackageId}
                    location={travel.location}
                    name={travel.name}
                    attachmentUrl={travel.attachmentUrl}
                    endDate={travel.endDate}
                    openDate={travel.openDate}
                    travelPackageId={travel.travelPackageId}
                    uploadUrl={this.uploadUrl}
                    updatePackage={this.updatePackage}
                    deletePackage={this.deletePackage}
                />
            )
        })
        return rows;
    }

    private closeModal() {
        this.setState({
            showModal: false,
            modalContent: ''
        })
    }

    render() {
        return (
            <div>
                <h2>TravelPackages Management</h2>
                {this.renderTravelPackages()}
                <ConfirmModalComponent
                    close={this.closeModal}
                    content={this.state.modalContent}
                    show={this.state.showModal} 
                    title={this.state.title}/>
            </div>
        )
    }
}