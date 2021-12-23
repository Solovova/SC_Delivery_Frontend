import {Component, ChangeEvent} from "react";
import DeliveryDataService from "../../services/delivery.service";
import {Link} from "react-router-dom";
import {IPackageListVm, IPackageListRecordDto} from '../../types/delivery.type';
import PackageDetails from "./package-details.component";

type Props = {
};

type State = {
    error: Error | null,
    isLoaded: boolean,
    packages: IPackageListVm,
    currentPackage: IPackageListRecordDto | null,
    currentIndex: number,
};

export default class PackageList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.retrievePackages = this.retrievePackages.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActivePackage = this.setActivePackage.bind(this);

        this.state = {
            error: null,
            isLoaded: false,
            packages: {packages: []},
            currentPackage: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrievePackages();
    }

    retrievePackages() {
        DeliveryDataService.getAll()
            .then((response: any) => {
                this.setState({
                    isLoaded: true,
                    packages: response.data
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

    refreshList() {
        this.retrievePackages();
        this.setState({
            currentPackage: null,
            currentIndex: -1
        });
    }

    setActivePackage(active_package: IPackageListRecordDto, index: number) {
        this.setState({
            currentPackage: active_package,
            currentIndex: index
        });
    }

    render() {
        const {error, isLoaded, packages, currentPackage, currentIndex} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="list row">
                    <div className="col-md-6">
                        <h4>Packages List</h4>
                        <button
                            className="m-3 btn btn-sm btn-danger"
                            // onClick={this.removeAllTutorials}
                        >
                            Remove All
                        </button>
                        <ul className="list-group">
                            {packages &&
                                packages.packages.map((packageData: IPackageListRecordDto, index: number) => (
                                    <li
                                        className={
                                            "list-group-item " +
                                            (index === currentIndex ? "active" : "")
                                        }
                                        onClick={() => this.setActivePackage(packageData, index)}
                                        key={index}
                                    >
                                        {packageData.title}
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <PackageDetails currentPackage={this.state.currentPackage}/>
                    </div>
                </div>
            );
        }
    }
}