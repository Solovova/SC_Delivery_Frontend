import {useState} from "react";
import {IPackageListRecordDto, IPackageListVm} from "../../types/delivery.type";
import {Link} from "react-router-dom";

type Props = {
    currentPackage: IPackageListRecordDto | null
    callback:(i: number) => void
};

type State = {
    error: Error | null,
    isLoaded: boolean,
    packages: IPackageListVm,
    currentPackage: IPackageListRecordDto | null,
    currentIndex: number
};

export default function PackageDetails(props: Props) {
    const [state, setState] = useState<State>({
        error: null,
        isLoaded: false,
        packages: {packages: []},
        currentPackage: null,
        currentIndex: -1
    })

    if (props.currentPackage != null) {
        return (
            <div>
                <h4>Package</h4>
                <div>
                    <label>
                        <strong>Title:</strong>
                    </label>{" "}
                    {props.currentPackage.title}
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
                    to={"/update/" + props.currentPackage.id}
                    className="badge badge-warning"
                >
                    Edit
                </Link>
                <button
                    className="m-3 btn btn-sm btn-secondary"
                    onClick={() => props.callback(4)}
                >
                    Test
                </button>
                
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