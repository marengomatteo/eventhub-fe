import { useState } from 'react';
import Header from '@components/header/Header';
import SideBar from '@components/sideBar/SideBar';
import CustomDropZone from '@components/customDropZone/CustomDropZone';
import { useForm } from '@mantine/form';
import CustomInput from '@components/common/input/CustomInput';

import "./styles/createEvent.scss";
import { DateTimePicker } from '@mantine/dates';
import DateTimeInput from '@components/common/input/DateTimeInput';
import CustomSelect from '@components/common/input/CustomSelect';
import { Button, NumberInput } from '@mantine/core';
import CustomTextArea from '@components/common/input/CustomTextArea';

interface ExpandableBlockProps {
    title: string;
    defaultExpanded?: boolean;
    children: React.ReactNode;
    icon?: React.ReactNode;
    onSave?: () => void;
    hasError?: boolean;
}

const ExpandableBlock = ({
    title,
    defaultExpanded = false,
    children,
    icon,
    hasError = false
}: ExpandableBlockProps) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`expandable-block ${isExpanded ? 'expanded' : ''} ${hasError ? 'has-error' : ''}`}>
            <div className="expandable-header" onClick={toggleExpand}>
                <div className="header-content">
                    {icon && <div className="header-icon">{icon}</div>}
                    <h3>{title}</h3>
                </div>
                <div className={`toggle-icon ${isExpanded ? 'expanded' : ''}`}>
                    <i className="icon-arrow-down"></i>
                </div>
            </div>
            {isExpanded && (
                <div className="expandable-content">
                    {children}
                </div>
            )}
        </div>
    );
};

const timelineItems = [
    { title: "Crea evento", description: "Inserisci tutti i dati" },
    { title: "Aggiungi i biglietti", description: "Inserisci le tipologie di biglietto disponibili" },
    { title: "Pubblica", description: "Fai conoscere il tuo evento!" },

]

const step = 0;

const EventTitleBlock = ({ form }: { form: any }) => {
    const hasError = Boolean(form.errors.title || form.errors.description);

    return (
        <ExpandableBlock
            title="Titolo e descrizione"
            icon={<i className="icon-title"></i>}
            onSave={() => console.log('Saving title and description')}
            hasError={hasError}
        >
            <div className="form-group">
                <CustomInput
                    name="title"
                    key={form.key("title")}
                    label="Titolo evento"
                    form={form}
                    required
                />
            </div>
            <div className="form-group">
                <CustomTextArea
                    name="description"
                    key={form.key("description")}
                    label="Descrizione"
                    form={form}
                    required
                    placeholder="Descrivi il tuo evento"
                />
            </div>
        </ExpandableBlock>
    );
};

const EventDetailsBlock = ({ form }: { form: any }) => {
    const hasError = Boolean(form.errors.eventType || form.errors.maxParticipants);

    return (
        <ExpandableBlock
            title="Dettagli evento"
            icon={<i className="icon-details"></i>}
            onSave={() => console.log('Saving event details')}
            hasError={hasError}
        >
            <div className="form-group">
                <CustomSelect
                    name="eventType"
                    key={form.key("eventType")}
                    label="Tipo di evento"
                    form={form}
                    description="Seleziona il tipo di evento"
                    data={["concerto", "conferenza", "altro"]}
                    required
                />
            </div>
            <div className="form-group">
                <NumberInput
                    label="Numero massimo di partecipanti"
                    placeholder="Input placeholder"
                    min={1}
                    required
                    error={form.errors.maxParticipants}
                    {...form.getInputProps("maxParticipants")}
                />
            </div>
        </ExpandableBlock>
    );
};

const EventLocationBlock = ({ form }: { form: any }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isRange, setIsRange] = useState(false);
    const hasError = Boolean(
        form.errors.location ||
        form.errors.startDate ||
        (isRange && form.errors.endDate)
    );

    return (
        <ExpandableBlock
            title="Luogo e data"
            icon={<i className="icon-location"></i>}
            onSave={() => console.log('Saving location and date')}
            hasError={hasError}
        >
            <div className="form-group">
                <CustomInput
                    name="location"
                    key={form.key("location")}
                    label="Luogo"
                    form={form}
                    required
                />
            </div>
            <div className="form-group">
                <DateTimeInput
                    name="startDate"
                    key={form.key("startDate")}
                    label="Data inizio"
                    form={form}
                    required
                />
            </div>
            {isRange && (
                <div className="form-group">
                    <DateTimeInput
                        name="endDate"
                        key={form.key("endDate")}
                        label="Data fine"
                        form={form}
                        required
                    />
                </div>
            )}
            <button
                className="toggle-range"
                onClick={() => setIsRange(!isRange)}
                type="button"
            >
                {isRange ? 'Rimuovi data fine' : 'Aggiungi data fine'}
            </button>
        </ExpandableBlock>
    );
};

const CreateEventPage = () => {
    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            eventType: '',
            maxParticipants: 1,
            location: '',
            startDate: '',
            endDate: '',
            isRange: false,
        },
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (files.length === 0) {
                setFilesError(true);

            }
            if (!values.title) {
                errors.title = 'Titolo è obbligatorio';
            }
            if (!values.description) {
                errors.description = 'Descrizione è obbligatoria';
            }
            if (!values.eventType) {
                errors.eventType = 'Tipo di evento è obbligatorio';
            }
            if (!values.maxParticipants) {
                errors.maxParticipants = 'Numero massimo di partecipanti è obbligatorio';
            }
            if (!values.location) {
                errors.location = 'Luogo è obbligatorio';
            }
            if (!values.startDate) {
                errors.startDate = 'Data inizio è obbligatoria';
            }
            if (values.isRange && !values.endDate) {
                errors.endDate = 'Data fine è obbligatoria';
            }
            return errors;
        },
    });
    const [files, setFiles] = useState<File[]>([]);
    const [filesError, setFilesError] = useState(false);

    return (
        <>
            <Header />
            <div className="create-event">
                <SideBar showExpanded={true}>
                    <div className="ticket-preview">
                        <h3>Anteprima Biglietto</h3>
                    </div>
                    <div className="timeline">
                        {timelineItems.map((item, i) => {
                            const isSelected = step == i;
                            return (
                                <div key={i} className={`timeline-item ${isSelected ? "selected" : ""}`}>
                                    <p>{item.title}</p>
                                </div>
                            );
                        })}
                    </div>
                </SideBar>
                <div className="content">
                    <CustomDropZone required error={filesError} files={files} setFiles={(files: File[]) => setFiles(files)} />
                    <form onSubmit={form.onSubmit((values) => {
                        console.log(values);
                    })}>
                        <div className='blocks'>
                            <EventTitleBlock form={form} />
                            <EventDetailsBlock form={form} />
                            <EventLocationBlock form={form} />
                            <Button className="submit-button" type='submit' variant="primary" > Avanti </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateEventPage;