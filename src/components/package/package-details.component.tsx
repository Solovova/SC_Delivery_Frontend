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
                        className="badge btn-sm btn-warning mt-3 m-1"
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