import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TicketReceiptScreen = ({ route }) => {
  const { ticketData } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.ticket}>
        <Text style={styles.header}>Violation Ticket</Text>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.label}>Ticket No.:</Text>
          <Text style={styles.value}>{ticketData.ticketNo}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Issued To:</Text>
          <Text style={styles.value}>{ticketData.issuedTo}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date & Time:</Text>
          <Text style={styles.value}>{ticketData.datetime}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.label}>Violation:</Text>
          <Text style={styles.value}>{ticketData.violation}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.label}>Issued By:</Text>
          <Text style={styles.value}>{ticketData.issuedBy}</Text>
        </View>

        <View style={styles.footer}>
          <MaterialCommunityIcons name="ticket-confirmation-outline" size={40} color="#0047AB" />
          <Text style={styles.footerText}>This is a system-generated ticket</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "#f1f1f1",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ticket: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // shadowOffset: { width: 0, height: 4 },
    // elevation: 5,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#ccc",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0047AB",
    textAlign: "center",
    marginBottom: 20,
  },
  separator: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#333",
    maxWidth: "60%",
    textAlign: "right",
  },
  footer: {
    marginTop: 30,
    alignItems: "center",
  },
  footerText: {
    marginTop: 8,
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
});

export default TicketReceiptScreen;
