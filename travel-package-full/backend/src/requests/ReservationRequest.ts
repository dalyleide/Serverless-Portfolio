export interface CreateReservationRequest {
    travelPackegeId: string
    startDate: string
    qtdDays: number
}

export interface UpdateReservationRequest {
    startDate: string
    qtdDays: number
}