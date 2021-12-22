import {Component, ChangeEvent} from "react";
import DeliveryDataService from "../services/delivery.service";
import {Link} from "react-router-dom";
import {IPackageDetailsDto, IGetPackageDetailsQuery, IPackageListRecordDto} from '../types/delivery.type';

type Props = {};

type State = {
    error: Error | null,
    isLoaded: boolean,
    packageDetailsDto: IPackageDetailsDto | null,
};

export default class PackageUpdate extends Component<Props, State> {

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
        let getPackageDetailsQuery: IGetPackageDetailsQuery = {
            id: "AF97CC05-000A-4301-B862-9B67F4E56042"
        }

        DeliveryDataService.get(getPackageDetailsQuery.id)
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