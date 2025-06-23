import { Textarea } from "@mantine/core";

interface CustomTextAreaProps {
    label: string;
    placeholder: string;
    form: any;
    name: string;
    required?: boolean;
    error?: string;
}

const CustomTextArea = ({ label, placeholder, form, name, required, error }: CustomTextAreaProps) => {
    const fieldError = error || form.errors[name as string];

    return (
        <Textarea
            radius="lg"
            label={label}
            placeholder={placeholder}
            {...form.getInputProps(name)}
            required={required}
            error={fieldError}
        />);
};

export default CustomTextArea;
