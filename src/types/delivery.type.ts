export interface IPackageListRecordDto {
    id?: any | null,
    title: string
}

export interface IPackageListVm {
    packages: Array<IPackageListRecordDto>
}

export interface IPackageDetailsDto {
    id?: any | null,
    title: string,
    details: string
}

export type IGetPackageDetailsQuery = {
    id: string
}


