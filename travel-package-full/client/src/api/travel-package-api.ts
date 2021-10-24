import { apiEndpoint } from '../config'
import { CreateTravelPackageRequest, UpdateTravelPackageRequest, TravelPackageItem } from '../models/TravelPackageInterfaces';
import Axios from 'axios'

const uri = `${apiEndpoint}/travelPackage`

export async function getTravelPackages(token: string): Promise<TravelPackageItem[]>{
  console.log('Fetching TravelPackages')

  const response = await Axios.get(uri, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  console.log('TravelPackages:', response.data)
  return response.data.items as TravelPackageItem[]
}

export async function createTravelPackage(token: string, newTravelPackage: CreateTravelPackageRequest): Promise<TravelPackageItem> {
  console.log(uri)
  const response = await Axios.post(uri,  JSON.stringify(newTravelPackage), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  console.log(response)
  return response.data.item as TravelPackageItem
}

export async function patchTravelPackage(token: string, travelPackageId: string, updatedTravelPackage: UpdateTravelPackageRequest): Promise<void> {
  console.log('token:'+token)
  await Axios.patch(`${uri}/${travelPackageId}`, JSON.stringify(updatedTravelPackage), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}

export async function deleteTravelPackage( token: string, travelPackageId: string) {
  try {
      const result = await Axios.delete(`${uri}/${travelPackageId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        } })
        console.log(result)
  } catch (error) {
    console.log(error) 
  }
}

export async function getUploadUrl(
  token: string,
  travelPackageId: string
): Promise<string> {
  console.log(travelPackageId)
  const response = await Axios.post(`${uri}/${travelPackageId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}
