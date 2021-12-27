import {useEffect, useState} from "react";
import {IPackageDetailsDto} from "../../types/delivery.type";
import {PackageDataService} from "../../services/delivery.service";
import {useParams} from "react-router";
import PackageUpdate from "./package-update.component"

type Props = {};

type State = {
    error: Error | null,
    isLoaded: boolean,
    data: IPackageDetailsDto | null,
};

type Params = {
    id: string
}

const PackageUpdateLoader = (props: Props) => {
    const params = useParams<Params>();

    const [state, setState] = useState<State>({
        error: null,
        isLoaded: false,
        data: null,
    })

    function retrievePackageDetail() {
        if (params.id != undefined) {

            PackageDataService.get(params.id)
                .then((response: any) => {
                    setState({
                        ...state,
                        isLoaded: true,
                        data: response.data
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

    if (state.error) {
        console.log("redraw state.error")
        return <div>Error: {state.error.message}</div>;
    } else if (!state.isLoaded) {
        console.log("redraw Loading...")
        return <div>Loading...</div>;
    } else {
        if (state.data != null) {
            console.log(
                `redraw Ok\n packageDetailsDto Id:${state.data.id} +\n Props Id:${params.id}`)
            return (
                <div>
                    <PackageUpdate data={state.data}/>
                </div>
            )
        } else {
            console.log("redraw Loaded, any error, but state.packageDetailsDto is null")
            return (
                <div>
                    Loaded, any error, but state.packageDetailsDto is null
                </div>
            )
        }
    }
}

export default PackageUpdateLoader;