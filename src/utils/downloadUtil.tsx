import { PDFDownloadLink } from '@react-pdf/renderer';
import { TicketPDF } from "../components/TicketPDF/TicketPDF";

export function handleDownload(biglietto: any) {
    console.log(biglietto)
    return (
        <PDFDownloadLink document={<TicketPDF biglietto={biglietto} />} fileName={`biglietto-${biglietto.orderId}.pdf`}>
            {({ loading }) => (loading ? 'Generazione PDF...' : 'Scarica il biglietto')}
        </PDFDownloadLink>
    );

}