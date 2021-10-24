import { APIGatewayProxyEvent} from 'aws-lambda'
import * as uuid from 'uuid'
import { CreateTravelPackageRequest, UpdateTravelPackageRequest} from '../requests/TravelPackageRequest'
import { getUserId } from "../utils/utils"
import { TravelPackage } from '../models/TravelPackage'
import { createLogger } from '../utils/logger'
import { TravelPackageAccess } from '../dataLayer/TravelPackageAccess'

export class TravelPackageService {

    constructor(
            private readonly logger = createLogger('TravelPackageService'), 
            private readonly access = new TravelPackageAccess()) {
    }

    async getTravelPackages() {
        
        const packages = await this.access.getTravelPackages()
        return packages
    }

    async deleteTravelPackage(event: APIGatewayProxyEvent) {
        const travelPackageId = event.pathParameters.travelPackageId
        this.logger.info('Delete TravelPackageId', travelPackageId)
        
        // Remove a TravelPackage item by id
        await this.access.deleteTravelPackage(travelPackageId)
    }

    async updateTravelPackage(event: APIGatewayProxyEvent) {
        const travelPackageId = event.pathParameters.travelPackageId
        const updated: UpdateTravelPackageRequest = JSON.parse(event.body)

        validateUpdateAtts(updated)
        await this.access.updateTravelPackage(travelPackageId, updated)
    }

    async createTravelPackage(event: APIGatewayProxyEvent) {
        this.logger.info('body : ', event.body)
        const newTravelPackage: CreateTravelPackageRequest = JSON.parse(event.body)
        validateNewAtts(newTravelPackage)
        this.logger.info('Storing new item: ', newTravelPackage)

        //Implement creating a new TravelPackage item
        const userId = getUserId(event)
        this.logger.info('getUserId', userId)

        const travelPackageId = uuid.v4()
        this.logger.info('TravelPackageId', travelPackageId)

        const TravelPackage: TravelPackage = {
            ...newTravelPackage,
            userId: userId,
            travelPackageId: travelPackageId,
            createdAt: new Date().toISOString()
        }
        await this.access.createTravelPackage(TravelPackage)
        return TravelPackage;
    }

}

function validateUpdateAtts(updated:UpdateTravelPackageRequest):void {

    if (!updated.endDate)
            throw Error('End Date can not to be NULL')
    if (!updated.location)
        throw Error('Location can not to be NULL')
    if (!updated.openDate)
        throw Error('OpenDate can not to be NULL')
    if (!updated.name)
        throw Error('Name can not to be NULL')
}

function validateNewAtts(newObject:CreateTravelPackageRequest):void {

    if (!newObject.endDate)
        throw Error('End Date can not to be NULL')
    if (!newObject.location)
        throw Error('Location can not to be NULL')
    if (!newObject.openDate)
        throw Error('OpenDate can not to be NULL')
    if (!newObject.name)
        throw Error('Name can not to be NULL')
}