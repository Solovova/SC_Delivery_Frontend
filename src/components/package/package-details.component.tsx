import {Component} from "react";
import {IPackageListRecordDto, IPackageListVm} from "../../types/delivery.type";
import {Link} from "react-router-dom";

type Props = {
    currentPackage: IPackageListRecordDto | null
};

type State = {
    error: Error | null,
    isLoaded: boolean,
    packages: IPackageListVm,
    currentPackage: IPackageListRecordDto | null,
    currentIndex: number
};

export default class PackageDetails extends Component<Props, State> {
    render() {
        const {currentPackage} = this.props;
        if (currentPackage != null) {
            return (
                <div>
                    <h4>Package</h4>
                    <div>
                        <label>
                            <strong>Title:</strong>
                        </label>{" "}
                        {currentPackage.title}
                    </div>
                    <div>
                        <label>
                            <strong>Description:</strong>
                        </label>{" "}
                        {/*{currentTutorial.description}*/}
                    </div>
                    <div>
                        <label>
                            <strong>Status:</strong>
                        </label>{" "}
                        {/*{currentTutorial.published ? "Published" : "Pending"}*/}
                    </div>
                    <Link
                        to={"/update/" + currentPackage.id}
                        className="badge badge-warning"
                    >
                        Edit
                    </Link>
                </div>
            )
        } else {
            return (
                <div>
                    <br/>
                    <p>Please click on a Package...</p>
                </div>
            )
        }
    }
}