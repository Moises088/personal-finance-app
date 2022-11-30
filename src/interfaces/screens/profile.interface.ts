export interface ProfileItemProps {
    icon: (color: string, size: number) => JSX.Element;
    navigate: string;
    divisor: boolean;
    title: string;
}