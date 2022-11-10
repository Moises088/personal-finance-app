export interface CategoryDto {
    name: string;
    color: string;
    icon: string;
}
export interface CategoryEntity extends CategoryDto {
    id: number;
}