import {IPackageAddDto, IPackageDetailsDto, IUpdatePackageDto} from "../../types/delivery.type";
import {ChangeEvent, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {PackageDataService} from "../../services/delivery.service";

type Props = {  };


type State = {
    data: IPackageAddDto,
    isAdding: boolean,
    error: Error | null
}

const PackageAdd = (props: Props) => {

    const [state, setState] = useState<State>({
        data: {
            title: "",
            details: ""
        },
        isAdding: false,
        error: null
    })

    const navigate = useNavigate();

    function AddDTO() {
        let packageAddDto: IPackageAddDto = {
            title: state.data.title,
            details: state.data.details
        }

        PackageDataService.create(packageAddDto)
            .then((response: any) => {
                localStorage.setItem('activeId', response.data);
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

    function Add() {
        setState(function (prevState) {
            return {
                ...prevState,
                isAdding: true,
                error: null
            };
        });
        AddDTO();
    }

    function Cancel() {
        localStorage.setItem('activeId', "");
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

    function blockPackageFormEdit(packageDetailsDto: IPackageAddDto) {
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

    function blockPackageDetailView(packageDetailsDto: IPackageAddDto) {
        return (
            <div>
                <div className="edit-form">
                    <h4>Package</h4>
                    {blockPackageFormEdit(packageDetailsDto)}

                    <button
                        type="submit"
                        className="badge btn-sm btn-success mt-3 m-1 "
                        onClick={() => {
                            Add()
                        }}
                    >
                        Submit
                    </button>
                    <button
                        className="badge btn-sm btn-warning mt-3 m-1"
                        onClick={() => {
                            Cancel()
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
    } else if (state.isAdding) {
        return <div>Adding...</div>;
    }

    return (
        <div>
            {blockPackageDetailView(state.data)}
        </div>
    )
}

export default PackageAdd;