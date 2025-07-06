import CustomInput from '@components/common/input/CustomInput';
import CustomDropZone from '@components/customDropZone/CustomDropZone';
import Header from '@components/header/Header';
import SideBar from '@components/sideBar/SideBar';
import { useForm } from '@mantine/form';
import { useCallback, useEffect, useState } from 'react';
import locationIcon from '@assets/icons/pin.png';
import CustomSelect from '@components/common/input/CustomSelect';
import CustomTextArea from '@components/common/input/CustomTextArea';
import DateTimeInput from '@components/common/input/DateTimeInput';
import { ActionIcon, Button, LoadingOverlay, NumberInput } from '@mantine/core';
import "./styles/createEvent.scss";
import axios from 'axios';
import { useRouter } from '@tanstack/react-router';
import { getBaseURL } from '../utils';
import { useUser } from '@context/UserContext';



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
    { title: "Imposta l'agenda", description: "Inserisci le sessioni dell'evento" },

]


const EventTitleBlock = ({ form }: { form: any }) => {
    const hasError = Boolean(form.errors.title || form.errors.description);

    return (
        <ExpandableBlock
            title="Titolo e descrizione"
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
    const [isRange, setIsRange] = useState(false);
    const hasError = Boolean(
        form.errors.location ||
        form.errors.startDate ||
        (isRange && form.errors.endDate)
    );

    return (
        <ExpandableBlock
            title="Luogo e data"
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
                    minDate={new Date()}
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
                        minDate={new Date()}
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

const EventAgendaBlock = ({ form, error }: { form: any, error: boolean }) => {
    const sessions = form.values.agenda || [];
    const agendaErrors = Array.isArray(form.errors.agenda) ? form.errors.agenda : [];
    const hasError = error || agendaErrors.length > 0 || (typeof form.errors.agenda === 'string' && form.errors.agenda.length > 0);

    const addSession = () => {
        form.insertListItem('agenda', {
            speaker: '',
            title: '',
            location: '',
            description: '',
            startTime: null,
            endTime: null
        });
    };

    const removeSession = (index: number) => {
        form.removeListItem('agenda', index);
    };

    return (
        <ExpandableBlock
            title="Agenda dell'evento"
            defaultExpanded={false}
            hasError={hasError}
        >
            {typeof form.errors.agenda === 'string' && (
                <div className="form-error" style={{ color: 'red', marginBottom: '16px' }}>
                    {form.errors.agenda}
                </div>
            )}
            <div className="sessions-list">
                {sessions.map((_: any, index: number) => (
                    <div key={index} className="session-block">
                        <div className="session-header">
                            <h4>Sessione {index + 1}</h4>
                            {sessions.length > 1 && (
                                <ActionIcon
                                    className='delete-icon'
                                    color="red"
                                    onClick={() => removeSession(index)}
                                    variant="subtle"
                                >
                                    <i className='icon-trash'></i>
                                </ActionIcon>
                            )}
                        </div>
                        <div className="form-group">
                            <CustomInput
                                name={`agenda.${index}.title`}
                                key={form.key(`agenda.${index}.title`)}
                                label="Titolo sessione"
                                placeholder="Inserisci il titolo della sessione"
                                form={form}
                                error={agendaErrors[index]?.title}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <CustomInput
                                name={`agenda.${index}.speaker`}
                                key={form.key(`agenda.${index}.speaker`)}
                                label="Speaker/Performer"
                                placeholder="Inserisci nome speaker/performer"
                                form={form}
                                error={agendaErrors[index]?.speaker}
                                required
                            />
                            <CustomInput
                                name={`agenda.${index}.speakerSurname`}
                                key={form.key(`agenda.${index}.speakerSurname`)}
                                label="Cognome speaker/performer"
                                placeholder="Inserisci cognome speaker/performer"
                                form={form}
                                error={agendaErrors[index]?.speakerSurname}
                            />
                        </div>
                        <div className="form-group">
                            <CustomInput
                                name={`agenda.${index}.email`}
                                key={form.key(`agenda.${index}.email`)}
                                label="Email speaker/performer"
                                placeholder="Inserisci email speaker/performer"
                                form={form}
                                error={agendaErrors[index]?.email}
                            />
                            <CustomInput
                                name={`agenda.${index}.bio`}
                                key={form.key(`agenda.${index}.bio`)}
                                label="Bio speaker/performer"
                                placeholder="Inserisci bio speaker/performer"
                                form={form}
                                error={agendaErrors[index]?.bio}
                            />
                            <CustomInput
                                name={`agenda.${index}.company`}
                                key={form.key(`agenda.${index}.company`)}
                                label="Company speaker/performer"
                                placeholder="Inserisci company speaker/performer"
                                form={form}
                                error={agendaErrors[index]?.company}
                            />
                        </div>
                        <div className="form-group">
                            <CustomInput
                                name={`agenda.${index}.location`}
                                key={form.key(`agenda.${index}.location`)}
                                label="Luogo"
                                placeholder="Dove si terrà la sessione"
                                form={form}
                                error={agendaErrors[index]?.location}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <DateTimeInput
                                    name={`agenda.${index}.startTime`}
                                    key={form.key(`agenda.${index}.startTime`)}
                                    label="Ora inizio"
                                    form={form}
                                    minDate={new Date()}
                                    error={agendaErrors[index]?.startTime}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <DateTimeInput
                                    name={`agenda.${index}.endTime`}
                                    key={form.key(`agenda.${index}.endTime`)}
                                    label="Ora fine"
                                    form={form}
                                    minDate={new Date()}
                                    error={agendaErrors[index]?.endTime}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <CustomTextArea
                                name={`agenda.${index}.description`}
                                key={form.key(`agenda.${index}.description`)}
                                label="Descrizione"
                                placeholder="Descrizione della sessione"
                                form={form}
                                required
                                error={agendaErrors[index]?.description}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Button
                // leftSection={ }
                onClick={addSession}
                variant="outline"
                fullWidth
                mt="md"
            >
                Aggiungi Sessione
            </Button>
        </ExpandableBlock>
    );
};

const CreateEventPage = () => {
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            eventType: '',
            maxParticipants: 1,
            location: '',
            startDate: null,
            endDate: null,
            isRange: false,
            agenda: [],
        },
        validate: (values) => {
            const errors: Record<string, string> = {};
            console.log("validation", values.startDate, values.endDate, (values.agenda[0] as any)?.startTime);
            console.log(files, form.getValues());
            setFilesError(false);
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
            if (step == 2 && (!values.agenda || values.agenda.length === 0)) {
                errors.agenda = 'Aggiungi almeno una sessione all\'agenda';
            } else if (step == 2) {
                const agendaErrors: any[] = [];
                values.agenda.forEach((session: any, index: number) => {
                    const sessionErrors: Record<string, string> = {};

                    if (!session.title) {
                        sessionErrors.title = 'Titolo sessione è obbligatorio';
                    }
                    if (!session.speaker) {
                        sessionErrors.speaker = 'Speaker/Performer è obbligatorio';
                    }
                    if (!session.email) {
                        sessionErrors.email = 'Email speaker/performer è obbligatoria';
                    }
                    if (!emailRegex.test(session.email)) {
                        sessionErrors.email = 'Email speaker/performer non valida';
                    }
                    if (!session.bio) {
                        sessionErrors.bio = 'Bio speaker/performer è obbligatoria';
                    }
                    if (!session.company) {
                        sessionErrors.company = 'Company speaker/performer è obbligatoria';
                    }
                    if (!session.location) {
                        sessionErrors.location = 'Luogo è obbligatorio';
                    }
                    if (!session.description) {
                        sessionErrors.description = 'Descrizione è obbligatoria';
                    }
                    if (!session.startTime) {
                        sessionErrors.startTime = 'Ora inizio è obbligatoria';
                    }
                    if (!session.endTime) {
                        sessionErrors.endTime = 'Ora fine è obbligatoria';
                    }
                    if (new Date(session.startTime) > new Date(session.endTime)) {
                        sessionErrors.startTime = 'Ora inizio deve essere inferiore a ora fine';
                    }
                    if (values.startDate && new Date(session.startTime) < new Date(values.startDate)) {
                        sessionErrors.startTime = 'Ora inizio deve essere superiore a data inizio evento';
                    }
                    const endDate = values.endDate ? new Date(values.endDate) : new Date(values.startDate!);
                    if (endDate && new Date(session.endTime) > endDate) {
                        sessionErrors.endTime = 'Ora fine deve essere inferiore a data fine evento';
                    }


                    if (Object.keys(sessionErrors).length > 0) {
                        agendaErrors[index] = sessionErrors;
                    }
                });

                if (agendaErrors.length > 0) {
                    // Cast esplicito per risolvere il problema di tipo
                    errors.agenda = agendaErrors as any;
                }
            }
            return errors;
        },
    });
    const [files, setFiles] = useState<File[]>([]);
    const [filesError, setFilesError] = useState(false);
    const [step, setStep] = useState(1);
    const [error, setError] = useState<string>("");
    const [pageLoading, setPageLoading] = useState(false);

    const [publishEvent, setPublishEvent] = useState(false);

    const { user, isLoading } = useUser();

    useEffect(() => {
        if (isLoading) return;
        if (!user || user.role !== "ADMIN") {
            router.navigate({ to: "/login" });
        }
    }, [user, isLoading]);

    const router = useRouter();

    const api = getBaseURL("event");

    const handlePublishEvent = useCallback(async (values: any) => {
        try {
            setPageLoading(true);
            const data = {
                "eventName": values.title,
                "startTime": new Date(values.startDate).toISOString(),
                "endTime": values.endDate ? new Date(values.endDate).toISOString() : new Date(values.startDate).toISOString(),
                "location": values.location,
                "description": values.description,
                "maxPartecipants": values.maxParticipants,
                "eventType": values.eventType,
                "userId": user?.id
            }

            const response = await api.post("", data);
            debugger
            if (response.status === 200) {
                const agendaID = response.data.response;
                await Promise.all(values.agenda.map(async (session: any) => {
                    await getBaseURL("agenda").post(`/${agendaID}/sessions`, {
                        "speaker": {
                            "name": session.speaker,
                            "surname": "",
                            "email": "",
                            "bio": "",
                            "company": ""
                        },
                        "title": session.title,
                        "location": session.location,
                        "description": session.description,
                        "startTime": new Date(session.startTime).toISOString(),
                        "endTime": new Date(session.endTime).toISOString()
                    });
                })).then(() => {
                    setPublishEvent(true);
                    form.reset();
                    setStep(1);
                    setFiles([]);
                    setFilesError(false);
                    setPageLoading(false);
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Errore durante la pubblicazione");
            }
            setPageLoading(false);
        }
    }, [api, form]);

    return (
        <>
            <LoadingOverlay visible={pageLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: '#eb5d24', type: 'dots' }} />
            <Header />
            <div className="create-event">
                <SideBar showExpanded={true}>
                    <div className="ticket-preview">
                        <h3>Anteprima Biglietto</h3>
                        <div className='preview-ticket'>
                            <h4>{form.getValues().title || "Titolo evento"}</h4>
                            <p>{form.getValues().description || "Descrizione"}</p>
                            <p className='secondary-info'>Data e ora: {form.getValues().startDate ? new Date(form.getValues().startDate!).toLocaleString() : "Non inserita"} {form.getValues().endDate && " - " + form.getValues().endDate}</p>
                            <p className='secondary-info'><img src={locationIcon} />Location: {form.getValues().location || "Non inserita"}</p>
                        </div>
                    </div>
                    <div className="timeline">
                        {timelineItems.map((item, i) => {
                            const isSelected = step - 1 == i;
                            return (
                                <button type='button' onClick={() => {
                                    if (step == 2) {
                                        setStep(i + 1)
                                    }
                                }} key={i} className={`timeline-item ${isSelected ? "selected" : ""}`}>
                                    <p>{item.title}</p>
                                </button>
                            );
                        })}
                    </div>
                </SideBar>
                <div className="content">
                    {
                        publishEvent && (
                            <Modal close={() => setPublishEvent(false)}>
                                <h2>Evento pubblicato con successo</h2>
                                <p>Il tuo evento è stato pubblicato con successo, vai alla <a href="/dashboard">dashboard</a> per monitorarlo.</p>
                            </Modal>
                        )
                    }
                    <form onSubmit={form.onSubmit((values) => {
                        if (step == 1 && !filesError) {
                            console.log(form.errors)
                            setStep((prev) => prev + 1);
                        } else if (step == 2 && Object.keys(form.errors).length == 0) {
                            handlePublishEvent(values);
                        }
                    })}>
                        {step == 1 ? <>
                            <CustomDropZone required error={filesError} files={files} setFiles={(files: File[]) => setFiles(files)} />
                            <div className='blocks'>
                                <EventTitleBlock form={form} />
                                <EventDetailsBlock form={form} />
                                <EventLocationBlock form={form} />
                                <Button className="submit-button" type='submit' variant="primary" > Avanti </Button>
                            </div>
                        </> :
                            <>
                                {error && <p className="error">{error}</p>}
                                <div className='blocks'>
                                    <EventAgendaBlock error={error.length > 0} form={form} />
                                    <Button className="submit-button" type='submit' variant="primary" > Pubblica </Button>
                                </div>
                            </>
                        }
                    </form>
                </div>
            </div>
        </>
    );
}

const Modal = ({ children, close }: { children: React.ReactNode, close: () => void }) => {

    return (
        <>
            <button onClick={close} className="modal-bg"></button>
            <div className="modal">
                {children}
            </div>
        </>
    )
}
export default CreateEventPage;