import { DateTimePicker } from '@mantine/dates';

interface DateTimeInputProps {
    label: string;
    required?: boolean;
    name: string;
    key: string;
    form: any;
    error?: string;
    minDate?: Date;
}

const DateTimeInput = (props: DateTimeInputProps) => {
    const { label, required, name, form, error, minDate } = props;
    const fieldError = error || form.errors[name];

    return (
        <DateTimePicker
            name={name}
            radius="lg"
            key={props.key}
            label={label}
            placeholder="Seleziona data e ora"
            required={required}
            {...form.getInputProps(name)}
            error={fieldError}
            minDate={minDate}
        />
    );
};

export default DateTimeInput;