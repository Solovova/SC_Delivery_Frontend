import {Component, ChangeEvent} from "react";
import DeliveryDataService from "../services/delivery.service";
import {Link} from "react-router-dom";
import {IPackageListVm, IPackageListRecordDto} from '../types/delivery.type';

type Props = {};

type State = {
    error: Error | null,
    isLoaded: boolean,
    packages: IPackageListVm,
    currentPackage: IPackageListRecordDto | null,
    currentIndex: number,
    searchTitle: string
};

export default class TutorialsList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        // this.removeAllTutorials = this.removeAllTutorials.bind(this);
        // this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            error: null,
            isLoaded: false,
            packages: {packages: []},
            currentPackage: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveTutorials();
    }

    onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveTutorials() {
        DeliveryDataService.getAll()
            .then((response: any) => {
                this.setState({
                    isLoaded: true,
                    packages: response.data
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                this.setState({
                    isLoaded: true,
                    error: e
                });
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveTutorials();
        this.setState({
            currentPackage: null,
            currentIndex: -1
        });
    }

    setActiveTutorial(tutorial: IPackageListRecordDto, index: number) {
        this.setState({
            currentPackage: tutorial,
            currentIndex: index
        });
    }

    // removeAllTutorials() {
    //     DeliveryDataService.deleteAll()
    //         .then((response: any) => {
    //             console.log(response.data);
    //             this.refreshList();
    //         })
    //         .catch((e: Error) => {
    //             console.log(e);
    //         });
    // }

    // searchTitle() {
    //     this.setState({
    //         currentTutorial: null,
    //         currentIndex: -1
    //     });
    //
    //     DeliveryDataService.findByTitle(this.state.searchTitle)
    //         .then((response: any) => {
    //             this.setState({
    //                 tutorials: response.data
    //             });
    //             console.log(response.data);
    //         })
    //         .catch((e: Error) => {
    //             console.log(e);
    //         });
    // }

    render() {
        const {error, isLoaded, searchTitle, packages, currentPackage, currentIndex} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="list row">
                    <div className="col-md-8">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by title"
                                value={searchTitle}
                                // onChange={this.onChangeSearchTitle}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    // onClick={this.searchTitle}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4>Packages List</h4>
                        <button
                            className="m-3 btn btn-sm btn-danger"
                            // onClick={this.removeAllTutorials}
                        >
                            Remove All
                        </button>
                        <ul className="list-group">
                            {packages &&
                                packages.packages.map((packageData: IPackageListRecordDto, index: number) => (
                                    <li
                                        className={
                                            "list-group-item " +
                                            (index === currentIndex ? "active" : "")
                                        }
                                        onClick={() => this.setActiveTutorial(packageData, index)}
                                        key={index}
                                    >
                                        {packageData.title}
                                    </li>
                                ))}
                        </ul>

                        
                    </div>
                    <div className="col-md-6">
                        {currentPackage ? (
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
                                        <strong>Description:</strong>
                                    </label>{" "}
                                    {/*{currentTutorial.description}*/}
                                </div>
                                <div>
                                    <label>
                                        <strong>Status:</strong>
                                    </label>{" "}
                                    {/*{currentTutorial.published ? "Published" : "Pending"}*/}
                                </div>
                                <Link
                                    to={"/update/" + currentPackage.id}
                                    className="badge badge-warning"
                                >
                                    Edit
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <br/>
                                <p>Please click on a Package...</p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    }
}