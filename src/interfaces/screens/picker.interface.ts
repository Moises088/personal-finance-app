export interface PickerProps {
    selectedItem?: any;
    visible: boolean;
    setSelectedItem: (itemValue: any) => void;
    setVisible: (visible: boolean) => void;
    itens: { label: string; value: string }[];
}