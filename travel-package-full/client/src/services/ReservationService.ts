import { ReservationItem, UpdateReservationRequest, CreateReservationRequest } from "../models/ReservationInterfaces";
import { createReservation, deleteReservation, getReservations, patchReservation} from "../api/reservation-api"
export class ReservationService {

    public async getUserReservatios(token: string) : Promise<ReservationItem[]> {
        const result = getReservations(token)
        return result 
    }

    public async createReservation(token: string, travelPackegeId: string, startDate: string, qtdDays: string) : Promise<ReservationItem> {
        
        console.log('enter createReservation')
        const reservation:CreateReservationRequest = {
            travelPackegeId: travelPackegeId, 
            startDate: startDate, 
            qtdDays: Number(qtdDays)
        }

        console.log(reservation)
        const result = await createReservation(token, reservation)
        return result
    }

    public async updateReservation(token: string, travelPackegeId: string, startDate: string, qtdDays: number) {
        
        const reservation:UpdateReservationRequest = {
            startDate: startDate, 
            qtdDays: qtdDays
        }

        await patchReservation(token, travelPackegeId, reservation)
    }

    public async deleteReservation(token: string, ReservationId: string) {
        const result = await deleteReservation(token, ReservationId)
        return result
    }
}