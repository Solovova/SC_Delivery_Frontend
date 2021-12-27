import {useState, useEffect, FC} from "react";
import {PackageDataService} from "../../services/delivery.service";
import {IPackageListVm, IPackageListRecordDto} from '../../types/delivery.type';
import PackageDetails from "./package-details.component";
import "./package.css"
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";

type Props = {};

type State = {
    error: Error | null,
    isLoaded: boolean,
    packages: IPackageListVm,
    currentPackage: IPackageListRecordDto | null,
    currentIndex: number,
    activeId: string | null
};

type StateIn = {
    activeId? : string
}

type Params = {
    id: string
}

const PackageList:FC<Props> = (props: Props) => {
    const [state, setState] = useState<State>({
        error: null,
        isLoaded: false,
        packages: {packages: []},
        currentPackage: null,
        currentIndex: -1,
        activeId: localStorage.getItem('activeId')
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

    function setActivePackage(active_package: IPackageListRecordDto, index: number) {
        setState({
            ...state,
            currentPackage: active_package,
            currentIndex: index
        });
    }

    function setActivePackageById() {
        if (state.activeId==undefined) {
            return
        }
        
        const position = state.packages.packages.findIndex((quoteEl) => {
            return quoteEl.id == state.activeId;
        });
        
        if (position!=-1){
            setActivePackage(state.packages.packages[position],position)
        }
    }

    function Callback(i: number) {
        setActivePackage(state.packages.packages[i], i);
    }

    useEffect(() => {
        retrievePackages();
    }, []);

    useEffect(() => {
        setActivePackageById();
    }, [state.packages]);


    
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
                        <PackageDetails packageListRecordDto={state.currentPackage}/>
                    </div>
                </div>
            </div>
        );
    }
}


export default PackageList;
