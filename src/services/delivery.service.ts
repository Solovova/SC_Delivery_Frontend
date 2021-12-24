import http from "../http-common";
import {IPackageListVm} from '../types/delivery.type';
import {IPackageDetailsDto} from '../types/delivery.type';
import {CancelTokenSource} from "axios";

class PackageDataServiceClass {
    getAll() {
        return http.get<IPackageListVm>("/package");
    }

    get(id: string, cancelTokenSource: CancelTokenSource) {
        return http.get<IPackageDetailsDto>(`/package/${id}`, {
            cancelToken:cancelTokenSource.token
        });
    }

    //
    // create(data: ITutorialData) {
    //     return http.post<ITutorialData>("/tutorials", data);
    // }
    //
    // update(data: ITutorialData, id: any) {
    //     return http.put<any>(`/tutorials/${id}`, data);
    // }
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