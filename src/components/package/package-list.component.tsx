import {useState, useEffect} from "react";
import {PackageDataService} from "../../services/delivery.service";
import {IPackageListVm, IPackageListRecordDto} from '../../types/delivery.type';
import PackageDetails from "./package-details.component";
import "./package.css"

type Props = {};

type State = {
    error: Error | null,
    isLoaded: boolean,
    packages: IPackageListVm,
    mode: DetailMode,
    currentPackage: IPackageListRecordDto | null,
    currentIndex: number,
};

enum DetailMode {
    view,
    edit
}

const PackageList = (props: Props) => {
    const [state, setState] = useState<State>({
        error: null,
        isLoaded: false,
        packages: {packages: []},
        mode: DetailMode.view,
        currentPackage: null,
        currentIndex: -1
    })

    function retrievePackages() {
        PackageDataService.getAll()
            .then((response: any) => {
                setState({
                    ...state,
                    isLoaded: true,
                    packages: response.data
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
    }

    function refreshList() {
        retrievePackages();
        setState({
            ...state,
            currentPackage: null,
            currentIndex: -1
        });
    }

    function setActivePackage(active_package: IPackageListRecordDto, index: number) {
        setState({
            ...state,
            currentPackage: active_package,
            currentIndex: index
        });
    }

    function Callback(i: number) {
        setActivePackage(state.packages.packages[i], i);
    }

    useEffect(() => {
        retrievePackages();
    }, []);


    
    function blockList() {
        return (
            <ul className="list-group list-group-scroll">
                {state.packages &&
                    state.packages.packages.map((packageData: IPackageListRecordDto, index: number) => (
                        <li
                            className={
                                "list-group-item " +
                                (index === state.currentIndex ? "active" : "")
                            }
                            onClick={() => setActivePackage(packageData, index)}
                            key={index}
                        >
                            {packageData.title}
                        </li>
                    ))}
            </ul>
        )
    }

    if (state.error) {
        return <div>Ошибка: {state.error.message}</div>;
    } else if (!state.isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row mt-3">
                            <h4>Packages List</h4>
                        </div>
                        <div className="row  mt-3">
                            {blockList()}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <PackageDetails id={state.currentPackage?.id} callback={Callback}/>
                    </div>
                </div>
            </div>
        );
    }
}


export default PackageList;
