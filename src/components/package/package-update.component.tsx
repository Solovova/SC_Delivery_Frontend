import {IPackageDetailsDto, IUpdatePackageDto} from "../../types/delivery.type";
import {ChangeEvent, useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {PackageDataService} from "../../services/delivery.service";

type Props = { data: IPackageDetailsDto };


type State = {
    data: IPackageDetailsDto,
    isUpdating: boolean,
    isDeleting: boolean,
    error: Error | null
}

const PackageUpdate = (props: Props) => {

    const [state, setState] = useState<State>({
        data:props.data,
        isUpdating: false,
        isDeleting: false,
        error: null
    })
    
    const navigate = useNavigate();
    
    function UpdateDTO() {
        let updatePackageDto:IUpdatePackageDto =  {
            id: state.data.id,
            title : state.data.title,
            details : state.data.details
        }
        
        PackageDataService.update(updatePackageDto)
            .then((response: any) => {
                localStorage.setItem('activeId', state.data.id);
                navigate("/packages/")
                console.log(response.data);
            })
            .catch((e: Error) => {
                setState({
                    ...state,
                    error: e
                });
                console.log(e);
            });
    }

    function DeleteDTO() {
        PackageDataService.delete(state.data.id)
            .then((response: any) => {
                localStorage.setItem('activeId', "");
                navigate("/packages/")
                console.log(response.data);
            })
            .catch((e: Error) => {
                setState({
                    ...state,
                    error: e
                });
                console.log(e);
            });
    }
    
    function Update() {
        setState(function (prevState) {
            return {
                ...prevState,
                isUpdating:true,
                error:null
            };
        });
        UpdateDTO();
    }

    function Delete() {
        setState(function (prevState) {
            return {
                ...prevState,
                isDeleting:true,
                error:null
            };
        });
        DeleteDTO();
    }

    function Cancel() {
        localStorage.setItem('activeId', state.data.id);
        navigate("/packages/")
    }
    

    function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        const title = e.target.value;
        setState(function (prevState) {
            return {
                ...prevState,
                data: {
                    ...prevState.data,
                    title: title,
                },
            };
        });
    }

    function onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
        const details = e.target.value;
        setState(function (prevState) {
            return {
                ...prevState,
                data: {
                    ...prevState.data,
                    details: details,
                },
            };
        });
    }

    function blockPackageFormEdit(packageDetailsDto: IPackageDetailsDto) {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={packageDetailsDto.title}
                        onChange={onChangeTitle}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="details"
                        value={packageDetailsDto.details}
                        onChange={onChangeDescription}
                    />
                </div>
            </form>
        )
    }

    function blockPackageDetailView(packageDetailsDto: IPackageDetailsDto) {
        return (
            <div>
                <div className="edit-form">
                    <h4>Package</h4>
                    {blockPackageFormEdit(packageDetailsDto)}

                    <button
                        type="submit"
                        className="badge btn-sm btn-success mt-3 m-1 "
                        onClick={() => {Update()}}
                    >
                        Update
                    </button>
                    <button
                        className="badge btn-sm btn-danger mt-3 m-1"
                        onClick={() => {Delete()}}
                    >
                        Delete
                    </button>
                    <button
                        className="badge btn-sm btn-warning mt-3 m-1"
                        onClick={() => {Cancel()}}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        )
    }

    if (state.error) {
        return <div>Ошибка: {state.error.message}</div>;
    } else if (state.isUpdating) {
        return <div>Update...</div>;
    } else if (state.isDeleting) {
        return <div>Deleting...</div>;
    }
    
    return (
        <div>
            
            {blockPackageDetailView(state.data)}
        </div>
    )
}

export default PackageUpdate;