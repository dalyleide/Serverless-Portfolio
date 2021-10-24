import { apiEndpoint } from '../config'
import { CreateReservationRequest, UpdateReservationRequest, ReservationItem } from '../models/ReservationInterfaces';
import Axios from 'axios'

const uri = `${apiEndpoint}/reservation`

export async function getReservations(token: string): Promise<ReservationItem[]> {
  const response = await Axios.get(uri, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  console.log('ReservationItem:', response.data)
  return response.data.items as ReservationItem[]
}

export async function createReservation(token: string, newReservation: CreateReservationRequest): Promise<ReservationItem> {
  console.log(uri)
  const response = await Axios.post(uri,  JSON.stringify(newReservation), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  console.log(response.data.item)
  return response.data.item as ReservationItem
}

export async function patchReservation(token: string, reservationId: string, updatedReservation: UpdateReservationRequest): Promise<void> {
  await Axios.patch(`${uri}/${reservationId}`, JSON.stringify(updatedReservation), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}

export async function deleteReservation( token: string, ReservationId: string) {
  const result = await Axios.delete(`${uri}/${ReservationId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  console.log(result)
}
