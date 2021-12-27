import http from "../http-common";
import {IPackageAddDto, IPackageListVm, IUpdatePackageDto} from '../types/delivery.type';
import {IPackageDetailsDto} from '../types/delivery.type';
import {CancelTokenSource} from "axios";

class PackageDataServiceClass {
    getAll() {
        return http.get<IPackageListVm>("/package");
    }

    get(id: string) {
        return http.get<IPackageDetailsDto>(`/package/${id}`);
    }


    create(data: IPackageAddDto) {
        return http.post<string>("/package", data);
    }

    update(data: IUpdatePackageDto) {
        return http.put<any>(`/package`, data);
    }
    //
    // delete(id: any) {
    //     return http.delete<any>(`/tutorials/${id}`);
    // }
    //
    // deleteAll() {
    //     return http.delete<any>(`/tutorials`);
    // }
    //
    // findByTitle(title: string) {
    //     return http.get<Array<ITutorialData>>(`/tutorials?title=${title}`);
    // }
}

export const PackageDataService = new PackageDataServiceClass();