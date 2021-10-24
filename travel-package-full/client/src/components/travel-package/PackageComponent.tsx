import {Component} from 'react'

interface PackageComponentProps {

    userId: string
    travelPackegeId: string
    location: string
    name: string
    openDate: string
    endDate: string
    attachmentUrl?: string
    bookPackage: (travelPackegeId: string) => void
}

export class PackageComponent extends Component <PackageComponentProps>{

    private renderImage(){
        if(this.props.attachmentUrl) {
            return <img src= {this.props.attachmentUrl} alt=''/>
        } else {
            return <img src= '' alt=''/>
        }
    }

    reder(){
        return <div>
            <label>{this.props.name}</label><br/>
            <label>{this.props.location}</label><br/>
            <label>{this.props.openDate}</label><br/>
            <label>{this.props.endDate}</label><br/>
            <button onClick={()=>this.props.bookPackage(this.props.travelPackegeId)}/>
        </div>
    }
}