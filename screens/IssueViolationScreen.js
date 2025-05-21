import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const dummyViolations = [
    { label: "No ID", icon: "badge" },
    { label: "Improper Haircut", icon: "content-cut" },
    { label: "Wrong Uniform", icon: "checkroom" },
    { label: "No Black Shoes", icon: "hiking" },
    { label: "Loitering", icon: "directions-walk" },
];

const IssueViolationScreen = ({ route, navigation }) => {
    const { student } = route.params;
    const [selectedViolation, setSelectedViolation] = useState(null);

    const handleConfirm = () => {
        if (!selectedViolation) {
            alert("Please select a violation.");
            return;
        }

        navigation.navigate("TicketReceiptScreen", {
            ticketData: {
                ticketNo: "TCKT-23045",
                issuedTo: student.id,
                datetime: new Date().toLocaleString(),
                violation: selectedViolation.label,
                issuedBy: "Guard One",
            },
        });
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <View style={styles.avatarContainer}>
                    {student.avatar ? (
                        <Image source={{ uri: student.avatar }} style={styles.avatar} />
                    ) : (
                        <MaterialIcons name="person" size={60} color="#0047AB" />
                    )}
                </View>
                <Text style={styles.studentId}>{student.id}</Text>
            </View>

            <View style={styles.violationsContainer}>
                <Text style={styles.sectionTitle}>SELECT VIOLATION</Text>
                {dummyViolations.map((item, idx) => {
                    const isSelected = selectedViolation?.label === item.label;

                    return (
                        <TouchableOpacity
                            key={idx}
                            style={[
                                styles.radioButton,
                                isSelected && styles.radioSelected,
                            ]}
                            onPress={() => setSelectedViolation(item)}
                            activeOpacity={0.8}
                        >
                            <MaterialIcons
                                name={item.icon}
                                size={24}
                                color={isSelected ? "#fff" : "#0047AB"}
                                style={styles.icon}
                            />
                            <Text
                                style={[
                                    styles.radioText,
                                    isSelected && styles.radioTextSelected,
                                ]}
                            >
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.confirmButton]}
                    onPress={handleConfirm}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: "#f9f9f9",
        flexGrow: 1,
    },
    card: {
        padding: 25,
        borderRadius: 15,
        alignItems: "center",
        marginBottom: 20,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: "#E3EAFD",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    studentId: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    violationsContainer: {
        // marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 10,
        color: "#0047AB",
        letterSpacing: 1,
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: "#f0f0f0",
        marginBottom: 12,
    },
    icon: {
        marginRight: 12,
    },
    radioSelected: {
        backgroundColor: "#0047AB",
    },
    radioText: {
        fontSize: 16,
        color: "#333",
    },
    radioTextSelected: {
        color: "#fff",
        fontWeight: "600",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        marginTop: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#ccc",
    },
    confirmButton: {
        backgroundColor: "#0047AB",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
});

export default IssueViolationScreen;
