import { useState } from "react";
import { DateTimePicker } from '@mantine/dates';

const DateTimeInput = (props: any) => {
    const [focused, setFocused] = useState(false);
    const value = props.form.getValues()[props.name as string];
    const floating = value.trim().length !== 0 || focused || undefined;
    const { label, required } = props;
    const error = props.form.errors[props.name as string];
    return (
        <DateTimePicker radius="lg" label={label} placeholder="Pick date and time" onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)} required={required} error={error} />
    );
};

export default DateTimeInput;