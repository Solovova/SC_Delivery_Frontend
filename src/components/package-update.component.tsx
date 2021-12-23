import React, {Component} from "react";
import DeliveryDataService from "../services/delivery.service";
import {IPackageDetailsDto} from '../types/delivery.type';
import {useParams} from "react-router";


type State = {
    error: Error | null,
    isLoaded: boolean,
    packageDetailsDto: IPackageDetailsDto | null,
};

type Props = {
    Id: string | undefined;
};

type PropsWrapper = {
};

type Params = {
    id: string;
};

const WrapperPackageUpdate: React.FC<PropsWrapper> = ({}) => {
    return(<PackageUpdate Id={useParams<Params>().id}/>)
}

export default WrapperPackageUpdate;

class PackageUpdate extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            packageDetailsDto: null
        };
        
        
    }

    componentDidMount() {
        this.retrieveDetails();
    }

    retrieveDetails() {
        if (this.props.Id!=undefined) {
            DeliveryDataService.get(this.props.Id)
                .then((response: any) => {
                    this.setState({
                        isLoaded: true,
                        packageDetailsDto: response.data
                    });
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    this.setState({
                        isLoaded: true,
                        error: e
                    });
                    console.log(e);
                });    
        }else {
            this.setState({
                isLoaded: true,
                error: new Error("id - undefined")
            });
        }
        
    }

    render() {
        const {error, isLoaded, packageDetailsDto} = this.state;
        
        
        if (error) {
            
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="list row">
                    
                    <div className="col-md-8">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by title"
                                value={packageDetailsDto?.details}
                                // onChange={this.onChangeSearchTitle}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }
}