import {useEffect, useState} from "react";
import {IPackageDetailsDto} from "../../types/delivery.type";
import {PackageDataService} from "../../services/delivery.service";
import axios, {CancelTokenSource} from "axios";

type Props = {
    id: string | undefined
    callback: (i: number) => void
};

type State = {
    error: Error | null,
    isLoaded: boolean,
    packageDetailsDto: IPackageDetailsDto | null,
    id: string | undefined
    cancelToken: CancelTokenSource | null
};

const PackageDetails = (props: Props) => {
    const [state, setState] = useState<State>({
        error: null,
        isLoaded: false,
        packageDetailsDto: null,
        id: undefined,
        cancelToken: null
    })

    function retrievePackageDetail() {
        if (state.id != null) {

            if (state.cancelToken != null) {
                state.cancelToken.cancel();
                setState({
                    ...state,
                    cancelToken: null
                })
            }

            let newCancelToken = axios.CancelToken.source();
            setState({
                ...state,
                cancelToken: newCancelToken
            })
            PackageDataService.get(state.id, newCancelToken)
                .then((response: any) => {
                    setState({
                        ...state,
                        isLoaded: true,
                        packageDetailsDto: response.data
                    });
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    if (!axios.isCancel(e)) {
                        setState({
                            ...state,
                            isLoaded: true,
                            error: e
                        });
                        console.log(e);
                    }
                });
        } else {
            console.log("Loading ... props.idPackage == null");
        }
    }

    // useEffect(() => {
    //     return blockMain()
    // },[state.isLoaded])

    useEffect(() => {
        retrievePackageDetail();
    }, [state.id]);

    useEffect(() => {
        //console.log(`Props change: ${props.id}`)
        setState({
            ...state,
            isLoaded: false,
            error: null,
            packageDetailsDto: null,
            id: props.id
        })
    }, [props.id]);


    function blockPackageDetailView(currentPackage: IPackageDetailsDto) {
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
                        <strong>Details:</strong>
                    </label>{" "}
                    {currentPackage.details}
                </div>

                <button
                    className="m-3 btn btn-sm btn-secondary"
                    onClick={() => props.callback(4)}
                >
                    Edit
                </button>
            </div>
        )
    }

    function blockMain() {
        if (state.id == null) {
            console.log("redraw state.id == null")
            return (
                <div>
                    <br/>
                    <p>Please click on a Package...</p>
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
                    `redraw Ok\n packageDetailsDto Id:${state.packageDetailsDto.id} +\n Props Id:${props.id}`)
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

    return blockMain()
}

export default PackageDetails;