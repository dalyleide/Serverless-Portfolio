import { APIGatewayProxyEvent} from 'aws-lambda'
import * as uuid from 'uuid'
import { ReservationAccess } from '../dataLayer/ReservationAccess'
import { CreateReservationRequest} from '../requests/ReservationRequest'
import { getUserId } from "../utils/utils"
import { ReservationItem } from 'src/models/Reservation'
import { createLogger } from '../utils/logger'

export class ReservationService {

    constructor(
        //    private readonly docClient: DocumentClient = createDynamoDBClient(),
            private readonly logger = createLogger('Service Reservations'), 
            private readonly access = new ReservationAccess()) {
    }

    async getReservations(event: APIGatewayProxyEvent) {
        const userId = getUserId(event)
        this.logger.info('UserId', userId)
        const Reservations = await this.access.getReservationsPerUser(userId)
        return Reservations
    }

    async deleteReservation(event: APIGatewayProxyEvent) {
        const reservationId = event.pathParameters.reservationId
        this.logger.info('Delete ReservationId: '+reservationId)

        const userId = getUserId(event)
        this.logger.info('UserId: '+ userId)

        // Remove a Reservation item by id
        await this.access.deleteReservation(reservationId, userId)
    }

    async createReservation(event: APIGatewayProxyEvent) {
        const newReservation: CreateReservationRequest = JSON.parse(event.body)
        validateNewAtts(newReservation)
        this.logger.info('Storing new item: ', newReservation)

        //Implement creating a new Reservation item
        const userId = getUserId(event)
        this.logger.info('getUserId', userId)

        const reservationId = uuid.v4()
        this.logger.info('ReservationId', reservationId)

        const reservation: ReservationItem = {
            ...newReservation,
            userId: userId,
            reservationId: reservationId,
            createdAt: new Date().toISOString()
        }
        await this.access.createReservation(reservation)
        return reservation;
    }

}

function validateNewAtts(newObject:CreateReservationRequest):void {

    if (!newObject.startDate)
        throw Error('Start Date can not to be NULL')
    if (!newObject.qtdDays)
        throw Error('Qtd Days can not to be NULL')
    if (!newObject.travelPackegeId)
        throw Error('Travel PackageId can not to be NULL')
}