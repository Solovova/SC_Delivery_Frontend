import {IPackageListRecordDto} from "../../types/delivery.type";
import {Link} from "react-router-dom";

type Props = {
    packageListRecordDto: IPackageListRecordDto | null
};

const PackageDetails = (props: Props) => {
    function blockPackageDetailView(packageListRecordDto: IPackageListRecordDto) {
        return (
            <div>
                <h4>Package</h4>
                <div>
                    <label>
                        <strong>Title:</strong>
                    </label>{" "}
                    {packageListRecordDto.title}
                </div>
                

                
                <Link
                    to={"/update/" + packageListRecordDto.id}
                >
                    <button
                        className="m-3 btn btn-sm btn-primary"
                    >
                        Edit
                    </button>
                </Link>
            </div>
        )
    }

    if (props.packageListRecordDto == null) {
        console.log("redraw props.packageDetailsDto == null")
        return (
            <div>
                <br/>
                <p>Please click on a Package...</p>
            </div>
        )
    } else {
        console.log("redraw Ok")
        return (
            <div>
                {blockPackageDetailView(props.packageListRecordDto)}
            </div>
        )
    }
}

export default PackageDetails;