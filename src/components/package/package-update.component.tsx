import {useEffect, useState} from "react";
import {IPackageDetailsDto} from "../../types/delivery.type";
import {PackageDataService} from "../../services/delivery.service";
import {useParams} from "react-router";

type Props = {};

type State = {
    error: Error | null,
    isLoaded: boolean,
    packageDetailsDto: IPackageDetailsDto | null,
};

type Params = {
    id: string
}

const PackageUpdate = (props: Props) => {
    const params = useParams<Params>();

    const [state, setState] = useState<State>({
        error: null,
        isLoaded: false,
        packageDetailsDto: null,
    })

    function retrievePackageDetail() {
        if (params.id != undefined) {

            PackageDataService.get(params.id)
                .then((response: any) => {
                    setState({
                        ...state,
                        isLoaded: true,
                        packageDetailsDto: response.data
                    });
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    setState({
                        ...state,
                        isLoaded: true,
                        error: e
                    });
                    console.log(e);
                });
        } else {
            console.log("param.id == null");
        }
    }

    useEffect(() => {
        retrievePackageDetail();
    }, []);
    
    function Submit() {
        
    }

    function Cancel() {

    }

    function blockPackageDetailView(packageDetailsDto: IPackageDetailsDto) {
        return (
            <div>
                <h4>Package</h4>
                <div>
                    <label>
                        <strong>Title:</strong>
                    </label>{" "}
                    {packageDetailsDto.title}
                </div>
                <div>
                    <label>
                        <strong>Details:</strong>
                    </label>{" "}
                    {packageDetailsDto.details}
                </div>

                <button
                    className="m-3 btn btn-sm btn-primary"
                    onClick={() => {Submit()}}
                >
                    Submit
                </button>
                <button
                    className="m-3 btn btn-sm btn-secondary"
                    onClick={() => {Cancel()}}
                >
                    Cancel
                </button>
            </div>
        )
    }

    if (state.error) {
        console.log("redraw state.error")
        return <div>Ошибка: {state.error.message}</div>;
    } else if (!state.isLoaded) {
        console.log("redraw Loading...")
        return <div>Loading...</div>;
    } else {
        if (state.packageDetailsDto != null) {
            console.log(
                `redraw Ok\n packageDetailsDto Id:${state.packageDetailsDto.id} +\n Props Id:${params.id}`)
            return (
                <div>
                    {blockPackageDetailView(state.packageDetailsDto)}
                </div>
            )
        } else {
            console.log("redraw Loaded, any error, but state.packageDetailsDto is null")
            return (
                <div>
                    <br/>
                    <p>Loaded, any error, but state.packageDetailsDto is null</p>
                </div>
            )
        }
    }
}

export default PackageUpdate;