import { Component } from "react"
import { TravelPackageItem } from "../../models/TravelPackageInterfaces"
import { TravelPackageService } from "../../services/TravelPackageService"
import { PackageComponent } from "./PackageComponent"

interface PackageState {

    travels:TravelPackageItem[]
}

interface PackageProps {

    token: string, 
    service: TravelPackageService
}

export class customerNavBar extends Component <PackageProps, PackageState> {

    constructor(props:PackageProps) {
        super(props)
        this.state = {
            travels: []
        }
    }

    async componentDidMount() {
        const travels = await this.props.service.getTravelPackage(this.props.token);
        this.setState({
            travels:travels
        })
        this.bookPackage = this.bookPackage.bind(this)
    }

    async bookPackage(travelPackegeId:string) {
        
    }

    private renderPackages(){
        const rows :any[] = []
        for (const travel of this.state.travels) {
            rows.push(
                <PackageComponent 
                    userId = {travel.location}
                    travelPackegeId={travel.travelPackageId}
                    location= {travel.location}
                    name= {travel.name}
                    openDate= {travel.openDate}
                    endDate= {travel.endDate}
                    attachmentUrl= {travel.attachmentUrl}
                    bookPackage ={this.bookPackage}
                />
            )
        }
    }

    render(){
        return <div>
            <h2>Welcome do travel page</h2>
            {this.renderPackages}
        </div>
    }

}