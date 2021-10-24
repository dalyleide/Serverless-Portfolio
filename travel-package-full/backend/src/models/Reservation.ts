export interface ReservationItem {
    userId: string
    reservationId: string
    travelPackegeId: string
    createdAt: string
    startDate: string
    qtdDays: number
}
  
export interface ReservationUpdate {
  startDate: string
  qtdDays: number
 }