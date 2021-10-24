export interface TravelPackageItem {
    userId: string
    travelPackageId: string
    location: string
    name: string
    openDate: string
    endDate: string
    attachmentUrl?: string
  }
  
  export interface CreateTravelPackageRequest {
    location: string
    name: string
    openDate: string
    endDate: string
}

export interface UpdateTravelPackageRequest {
    location: string
    name: string
    openDate: string
    endDate: string
}