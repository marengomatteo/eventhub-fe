import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import Logo from "@assets/logo-expanded.png";
import locationIcon from "@assets/icons/pin.png";
// Definisci gli stili PDF
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 16,
    backgroundColor: "white",
  },
  container: {
    border: "1pt solid #e0e0e0",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 2 8 rgba(0,0,0,0.1)",
  },
  header: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    color: "#eb5d24",
  },
  orderInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1pt solid #f0f0f0",
    paddingBottom: 8,
    marginBottom: 8,
  },
  smallText: {
    fontSize: 10,
    color: "#8795a4",
    marginBottom: 4,
  },
  boldText: {
    fontWeight: 500,
    fontSize: 12,
  },
  eventImage: {
    height: 200,
    width: "100%",
    objectFit: "cover",
    marginBottom: 8,
  },
  personalDataText: {
    fontSize: 12,
    color: "#43495B",
    fontWeight: 500,
    marginBottom: 10,
  },
  eventDetails: {
    marginBottom: 16,
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    color: "#43495B",
    fontWeight: 500,
  },
  locationIcon: {
    marginRight: 8,
    color: "#eb5d24",
  },
  locationText: {
    fontSize: 12,
  },
  mapImage: {
    borderRadius: 8,
    marginTop: 8,
  },
  barcode: {
    height: 60,
    backgroundColor: "#f5f7fa",
    borderRadius: 4,
    textAlign: "center",
    lineHeight: 60,
    color: "#8795a4",
    fontSize: 12,
    marginBottom: 16,
    marginTop: 16,
  },
  footer: {
    fontSize: 10,
    color: "#8795a4",
    textAlign: "center",
    borderTop: "1pt solid #f0f0f0",
    paddingTop: 8,
  },
});

export function TicketPDF({ biglietto }: { biglietto: any }) {
  const mapUrl = biglietto.location
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
        biglietto.location
      )}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${encodeURIComponent(
        biglietto.location
      )}&key=AIzaSyChk89dukymtLY_M7uYS3ZdRcu9z9p9-us`
    : null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Image
              src={Logo}
              style={{ height: 40, width: 100, objectFit: "contain" }}
            />
          </View>

          {/* Order Info */}
          <View style={styles.orderInfoRow}>
            <View>
              <Text style={styles.smallText}>Ordine</Text>
              <Text style={styles.boldText}>#{biglietto.id}</Text>
            </View>
          </View>

          {/* Event Image */}
          {biglietto.imageUrl ? (
            <Image src={biglietto.imageUrl} style={styles.eventImage} />
          ) : (
            <Text
              style={{ color: "#8795a4", textAlign: "center", marginBottom: 8 }}
            >
              Immagine evento non disponibile
            </Text>
          )}

          {/* Event Details */}
          <View style={styles.eventDetails}>
            <Text style={{ fontWeight: 500, marginBottom: 4 }}>
              1x {biglietto.eventName}
            </Text>
            <Text style={{ color: "#8795a4", fontSize: 12, marginBottom: 16 }}>
              {biglietto.startDate} • {biglietto.startTime}
            </Text>

            {/* Location */}
            <View style={styles.locationContainer}>
              <View style={styles.locationRow}>
                <Image
                  src={locationIcon}
                  style={{ width: 12, height: 12, marginRight: 4 }}
                />
                <Text style={styles.locationText}>
                  {biglietto.location || "Luogo non specificato"}
                </Text>
              </View>
              {biglietto.location && (
                <Text
                  style={{
                    color: "#8795a4",
                    fontSize: 12,
                    marginLeft: 16,
                    marginBottom: 8,
                  }}
                >
                  {biglietto.location}
                </Text>
              )}
              {mapUrl ? (
                <Image src={mapUrl} style={styles.mapImage} />
              ) : (
                <Text style={{ color: "#8795a4", textAlign: "center" }}>
                  Mappa non disponibile
                </Text>
              )}
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 12, marginBottom: 6 }}
              >
                Dati personali
              </Text>
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.personalDataText}>
                  Nome: {biglietto.name}
                </Text>
                <Text style={styles.personalDataText}>
                  Cognome: {biglietto.surname}
                </Text>
                <Text style={styles.personalDataText}>
                  Email: {biglietto.email}
                </Text>
              </View>
            </View>
            {/* Barcode placeholder */}
            <View style={styles.barcode}>CODICE A BARRE</View>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>
            Presenta questo biglietto all'ingresso
          </Text>
        </View>
      </Page>
    </Document>
  );
}
