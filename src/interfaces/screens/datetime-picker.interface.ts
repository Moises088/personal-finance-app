export interface DateTimePickerProps {
    isDatePickerVisible: boolean;
    onChange(selectedDate: Date | undefined) : void;
    dateActive?: Date;
}