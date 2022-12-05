export interface DonutChartProps {
    radius: number;
    strokeWidth: number;
    color: string;
    strokeColor: string;
    total: number;
}

export interface BarChartProps {
    icon: JSX.Element;
    total: number;
    heigth?: number;
    color: string;
}