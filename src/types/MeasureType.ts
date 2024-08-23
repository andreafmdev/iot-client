export interface MeasureResponse{
    _id:string;
    desc: string;
    type: string;
    value: number;

}
export interface PaginatedMeasureResponse{
    data: MeasureResponse[];  // Qui deve essere un array di MeasureResponse
    total: number;
    currentPage: number;
    totalPages: number;

}