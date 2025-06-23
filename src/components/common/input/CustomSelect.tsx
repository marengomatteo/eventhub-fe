import { Select } from "@mantine/core";

const CustomSelect = ({ label, description, data, form, name, required, key }: { label: string; description: string; data: string[]; form: any; key: string, name: string; required?: boolean }) => {
    const error = form.errors[name as string];

    return (
        <Select label={label} name={name} key={key} description={description} data={data} required={required} error={error} {...form.getInputProps(name)} />
    );
};

export default CustomSelect;
