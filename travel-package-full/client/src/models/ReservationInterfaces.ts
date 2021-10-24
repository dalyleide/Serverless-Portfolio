export interface ReservationItem {
    userId: string
    reservationId: string
    travelPackegeId: string
    createdAt: string
    startDate: string
    qtdDays: number
}
  
export interface UpdateReservationRequest {
  startDate: string
  qtdDays: number
}

export interface CreateReservationRequest {
    travelPackegeId: string
    startDate: string
    qtdDays: number
}
