import { Textarea } from "@mantine/core";

const CustomTextArea = ({ label, placeholder, form, name, required }: { label: string; placeholder: string; form: any; name: string; required?: boolean }) => {
    const error = form.errors[name as string];

    return (
        <Textarea
            radius="lg"
            label={label}
            placeholder={placeholder}
            {...form.getInputProps(name)}
            required={required}
            error={error}
        />);
};

export default CustomTextArea;
