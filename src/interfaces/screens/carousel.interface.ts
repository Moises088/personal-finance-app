export interface CarouselProps {
    itens: JSX.Element[],
    width: number,
    onChangeIndex?: (index: number) => void;
}