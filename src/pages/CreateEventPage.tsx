import SideBar from "@components/sideBar/SideBar";

import "./styles/createEvent.scss";


const timelineItems = [
    { title: "Crea evento", description: "Inserisci tutti i dati" },
    { title: "Aggiungi i biglietti", description: "Inserisci le tipologie di biglietto disponibili" },
    { title: "Pubblica", description: "Fai conoscere il tuo evento!" },

]

const step = 0;
const CreateEventPage = () => {
    return <div className="create-event">
        <SideBar showExpanded={true} >
            <div className="ticket-preview">
                <h3> Titolo Evento </h3>
            </div>
            <div className="timeline">
                {timelineItems.map((item, i) => {
                    const isSelected = step == i;
                    return <div className={`timeline-item ${isSelected ? "selected" : ""}`}>
                        <p>{item.title}</p>
                        {isSelected && <p>{item.description}</p>}
                    </div>
                }
                )}
            </div>
        </SideBar>
        <div className="content">
        </div>
    </div>
}

export default CreateEventPage;