import http from "../http-common";
import {IPackageList} from '../types/delivery.type';

class PackageDataService {
    getAll() {
        return http.get<IPackageList>("/package");
    }

    // get(id: string) {
    //     return http.get<ITutorialData>(`/tutorials/${id}`);
    // }
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

export default new PackageDataService();