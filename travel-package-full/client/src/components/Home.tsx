import { Component } from "react";
import { TravelPackageItem } from "../models/TravelPackageInterfaces"
import { TravelPackageService } from "../services/TravelPackageService";
import { ReservationService } from "../services/ReservationService";
import { HomeComponent } from "./HomeComponent";
import { User  } from '../models/UserInterfaces'
import { ConfirmModalComponent } from './travel-package/ConfirmModalComponent';
import { Link } from "react-router-dom";

interface HomeState {
    travels: TravelPackageItem[],
    showModal: boolean,
    modalContent: string, 
    title: string
}

interface HomeProps {
    user: User;
}

export class Home extends Component<HomeProps, HomeState> {

    private service= new TravelPackageService();
    private reservationService= new ReservationService();

    constructor(props: HomeProps) {
        super(props)
        this.state = {
            travels: [],
            showModal: false,
            modalContent: '', 
            title: ''
        }
        this.reserveTravelPackage = this.reserveTravelPackage.bind(this);
        this.closeModal = this.closeModal.bind(this)
    }

    async componentDidMount() {
        const travels = await this.service.getTravelPackage(this.props.user.token)
            this.setState({
                travels: travels
            });
    }

    private async reserveTravelPackage(travelPackegeId: string, qtdDays: string, startDate: string) {

        if (!qtdDays || !startDate) {
            this.setState({
                showModal: true,
                title:'Some problems occurred with your order: ',
                modalContent: 'Please fill all the fields!!!'
            })
        } if ( Number(qtdDays) <= 0 ) {
            this.setState({
                showModal: true,
                title:'Some problems occurred with your order: ',
                modalContent: 'Quantity of days must be greater than zero'
            })
        } else {
            console.log('start reservation')
            try {
                const reservationResult = await this.reservationService.createReservation(this.props.user.token, travelPackegeId, startDate, qtdDays)   
                if (reservationResult) {
                    this.setState({
                        showModal: true,
                        title: 'Success: ',
                        modalContent: `Success reserved package ${travelPackegeId} and got the reservation number ${reservationResult.reservationId}`
                    })
                } else {
                    this.setState({
                        showModal: true,
                        title:'Some problems occurred with your order: ',
                        modalContent: `You can't reserve the package with id ${travelPackegeId}`
                    })
                } 
            } catch (error) {
                this.setState({
                    showModal: true,
                    modalContent: `You can't reserve the package with id ${travelPackegeId}. Error: ${error}`,
                    title:'Some problems occurred with your order: '
                })
            }
        }
     }

    private renderTravelPackages() {
        const rows: any[] = []
        for (const travel of this.state.travels) {
            let startDate:string =  travel.openDate
            if (new Date(travel.openDate) < new Date){
                startDate= new Date().toISOString().slice(0, 10);
            }
            rows.push(
                <HomeComponent key={travel.travelPackageId}
                    location={travel.location}
                    name={travel.name}
                    attachmentUrl={travel.attachmentUrl}
                    endDate={travel.endDate}
                    openDate={travel.openDate}
                    startDate= {startDate}
                    travelPackageId={travel.travelPackageId}
                    reserveTravelPackage={this.reserveTravelPackage}
                />
            )
        }
        return rows;
    }

    private closeModal() {
        this.setState({
            showModal: false,
            modalContent: ''
        })
    }

    renderCreateTravelPackagesLink(){
        if (this.props.user?.isAdmin) {
            return <div>
                <Link to='/create'>Create</Link><br></br>
            </div>
        }
    }

    render() {
        return (
            <div>
                <h2>Welcome to the TravelPackages page!</h2>
                {this.renderCreateTravelPackagesLink()}
                {this.renderTravelPackages()}
                <ConfirmModalComponent
                    close={this.closeModal}
                    content={this.state.modalContent}
                    show={this.state.showModal} 
                    title={this.state.title} />
            </div>
        )
    }
}