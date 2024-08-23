// src/services/authService.ts
import { apiClient } from './apiClient';
import { MeasureResponse,PaginatedMeasureResponse } from '@/types/MeasureType'

export async function getMeasures(page: number, limit: number): Promise<PaginatedMeasureResponse> {
    const defaultPage: number = page ?? 1;
    const defaultLimit: number = limit ?? 100;

    const response = await apiClient.get<PaginatedMeasureResponse>(`/measure/getPaginatedMeasure?page=${defaultPage}&limit=${defaultLimit}`);
    console.log(response)
    return response.data;
}
export async function getAllMeasures(): Promise<MeasureResponse> {
    const response = await apiClient.get<MeasureResponse>('/measure/getAll');
    console.log(response)
    return response.data;
}

