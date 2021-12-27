export interface IPackageListRecordDto {
    id: string,
    title: string
}

export interface IPackageListVm {
    packages: Array<IPackageListRecordDto>
}

export interface IPackageDetailsDto {
    id: string,
    title: string,
    details: string
}

export type IGetPackageDetailsQuery = {
    id: string
}

export interface IUpdatePackageDto {
    id: string
    title: string,
    details: string
}

