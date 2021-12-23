import {Component} from "react";
import {IPackageListRecordDto, IPackageListVm} from "../types/delivery.type";
type Props = {};

type State = {
    error: Error | null,
    isLoaded: boolean,
    packages: IPackageListVm,
    currentPackage: IPackageListRecordDto | null,
    currentIndex: number,
    searchTitle: string
};

export default class PackageEmpty extends Component<Props, State>{

    render() {
        return (
            <div>
                Empty component ...
            </div>
        );
    }
}