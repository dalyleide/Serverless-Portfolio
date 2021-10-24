import React from "react";
import { ReservationItem } from "../../models/ReservationInterfaces";

interface ReservationsProps extends ReservationItem {
    approveReservation?: (reservationId: string) => void;
    cancelReservation?: (reservationId: string) => void;
    deleteReservation?: (reservationId: string) => void;
}

export class ReservationComponent extends React.Component<ReservationsProps> {

    private renderDeleteButton() {
        if (this.props.deleteReservation) {
            return <td>
                <button onClick={() => this.props.deleteReservation!(this.props.reservationId)}>
                    delete
                </button>
            </td>
        }
    }

    render() {
        return (
            <tr>
                <td>{this.props.userId}</td>
                <td>{this.props.reservationId}</td>
                <td>{this.props.travelPackegeId}</td>
                <td>{this.props.qtdDays}</td>
                <td>{this.props.startDate}</td>
                {this.renderDeleteButton()}
            </tr>
        )
    }
}