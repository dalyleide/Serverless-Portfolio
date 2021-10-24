import { TravelPackageItem, CreateTravelPackageRequest, UpdateTravelPackageRequest} from "../models/TravelPackageInterfaces";
import { createTravelPackage, deleteTravelPackage, getTravelPackages, getUploadUrl, patchTravelPackage, uploadFile} from "../api/travel-package-api"
export class TravelPackageService {

    public async getTravelPackage(token: string) : Promise<TravelPackageItem[]> {
        const result = getTravelPackages(token)
        return result 
    }

    public async createTravelPackage(token: string, travel:CreateTravelPackageRequest) : Promise<TravelPackageItem> {
        const result = createTravelPackage(token, travel)
        return result
    }

    public async deleteTravelPackage(token: string, travelPackageId: string) {
        const result = deleteTravelPackage(token, travelPackageId)
        return result
    }

    public async updateTravelPackage(token: string, travelPackageId: string, updatedTravelPackage: UpdateTravelPackageRequest) {
        const result = patchTravelPackage(token, travelPackageId, updatedTravelPackage)
        return result
    }

    public async getUploadUrl(token: string, travelPackageId: string) {
        const result = getUploadUrl(token, travelPackageId)
        return result
    }

    public async uploadFile(uploadUrl: string, file: Buffer){
        const result = uploadFile(uploadUrl, file)
        return result
    }
}