import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../models/UserInterfaces";
import { ReservationItem } from "../../models/ReservationInterfaces";
import { ReservationService } from "../../services/ReservationService";
import { ReservationComponent } from "./ReservationComponent";

interface ReservationsState {
    userReservations: Map<string, ReservationItem>,
}
interface ReservationsProps {
    user: User
}

export class Reservations extends React.Component<ReservationsProps, ReservationsState> {

    private service = new ReservationService()

    constructor(props: ReservationsProps){
        super(props);
        this.state = {
            userReservations: new Map<string, ReservationItem>()
        }
        this.deleteReservation = this.deleteReservation.bind(this);
    }

    async componentDidMount() {
        const userReservations = await this.service.getUserReservatios(this.props.user.token)
        this.setState({
            userReservations: new Map(userReservations.map(i=>[i.reservationId, i]))
        });
    }

    private async deleteReservation(reservationId: string){
        
        try {
            await this.service.deleteReservation(this.props.user.token, reservationId);
            const reservations = new Map(this.state.userReservations);
            reservations.delete(reservationId);
            this.setState({
            userReservations: reservations
            })
        } catch(error) {
            alert('Was not possible to delete reservation: ' + error)
        }
        
    }

    private renderUserReservations(){
        const rows: any[] = []
        this.state.userReservations.forEach((reservation) =>{
            rows.push(
                <ReservationComponent
                    key = {reservation.reservationId}
                    reservationId = {reservation.reservationId}
                    startDate = {reservation.startDate}
                    qtdDays = {reservation.qtdDays}
                    userId = {reservation.userId}
                    travelPackegeId = {reservation.travelPackegeId}
                    createdAt = {reservation.createdAt}
                    deleteReservation = {this.deleteReservation}
                />
            )
        })
        return <table>
            <tbody>
                <tr>
                    <th>User</th>
                    <th>ReservationId</th>
                    <th>TravelPackageId</th>
                    <th>Qtd Days</th>
                    <th>Start Date</th>
                    <th colSpan={1} >Actions</th>
                </tr>
            {rows}
            </tbody>
        </table>
    }

    render(){
        if (this.props.user) {
            return <div>
                Hello {this.props.user.userName}, here are your reservations:<br></br>
                {this.renderUserReservations()}
            </div>
        } else {
            return <div>
            Please <Link to='login'>Login</Link>
         </div>
        }
    }
}