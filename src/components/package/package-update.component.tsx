﻿import {IPackageDetailsDto, UpdatePackageDto} from "../../types/delivery.type";
import {ChangeEvent, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {PackageDataService} from "../../services/delivery.service";

type Props = { data: IPackageDetailsDto };


type State = {
    data: IPackageDetailsDto,
    isUpdating: boolean,
    error: Error | null
}

const PackageUpdate = (props: Props) => {

    const [state, setState] = useState<State>({
        data:props.data,
        isUpdating: false,
        error: null
    })

    const navigate = useNavigate();
    
    function UpdateDTO() {
        let updatePackageDto:UpdatePackageDto =  {
            id: state.data.id,
            title : state.data.title,
            details : state.data.details
        }
        
        PackageDataService.update(updatePackageDto)
            .then((response: any) => {
                navigate("/packages")
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
        //navigate("/packages");
    }

    function Cancel() {

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
                        onClick={() => {Update() 
                        }}
                    >
                        Update
                    </button>
                    <button
                        className="badge btn-sm btn-danger mt-3 m-1"
                        onClick={() => {
                        }}
                    >
                        Delete
                    </button>
                    <button
                        className="badge btn-sm btn-warning mt-3 m-1"
                        onClick={() => {
                        }}
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
    }
    
    return (
        <div>
            
            {blockPackageDetailView(state.data)}
        </div>
    )
}

export default PackageUpdate;