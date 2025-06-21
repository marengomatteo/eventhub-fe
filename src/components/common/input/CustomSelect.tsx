import { Select } from "@mantine/core";

const CustomSelect = ({ label, description, data, form, name, required }: { label: string; description: string; data: string[]; form: any; name: string; required?: boolean }) => {
    const error = form.errors[name as string];

    return (
        <Select label={label} description={description} data={data} required={required} error={error} />
    );
};

export default CustomSelect;
