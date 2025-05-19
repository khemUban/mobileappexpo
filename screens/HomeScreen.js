import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Modal,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { format } from "date-fns";
import CustomSliderButton from "../components/CustomSliderButton"; // Adjust path as needed

export default function HomeScreen({ navigation }) {
    const [now, setNow] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);
    const [pin, setPin] = useState("");

    const CORRECT_PIN = "1234";

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const day = format(now, "EEE").toUpperCase();
    const time = format(now, "hh:mm a").toUpperCase();
    const date = format(now, "MMMM d").toUpperCase();

    const handleSlideComplete = () => {
        setModalVisible(true);
    };

    const handleConfirmPin = () => {
        if (pin === CORRECT_PIN) {
            setModalVisible(false);
            setPin("");
            navigation.navigate("QRScannerScreen");
        } else {
            Alert.alert("Invalid PIN", "Please try again.");
            setPin("");
        }
    };

    return (
        <View style={styles.container}>
            {/* Time Card */}
            <View style={styles.card}>
                <View style={styles.leftBox}>
                    <Text style={styles.dayText}>{day}</Text>
                </View>
                <View style={styles.rightBox}>
                    <Text style={styles.timeText}>{time}</Text>
                    <Text style={styles.dateText}>{date}</Text>
                </View>
            </View>

            {/* Custom Slider Button */}
            <CustomSliderButton text="Slide to Scan QR" onSlideComplete={handleSlideComplete} />

            {/* PIN Modal */}
            <Modal transparent visible={modalVisible} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Enter 4-digit PIN</Text>
                        <TextInput
                            value={pin}
                            onChangeText={setPin}
                            keyboardType="numeric"
                            maxLength={4}
                            secureTextEntry
                            style={styles.pinInput}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={handleConfirmPin}>
                            <Text style={styles.modalButtonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: "#f0f0f0",
    },
    card: {
        flexDirection: "row",
        width: "100%",
        height: 100,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#ffffff",
        elevation: 3,
    },
    leftBox: {
        flex: 1,
        backgroundColor: "#0047AB",
        justifyContent: "center",
        alignItems: "center",
    },
    rightBox: {
        flex: 2,
        justifyContent: "center",
        paddingLeft: 25,
    },
    dayText: {
        color: "#ffffff",
        fontSize: 36,
        fontWeight: "bold",
    },
    timeText: {
        color: "#0047AB",
        fontSize: 25,
        fontWeight: "bold",
    },
    dateText: {
        color: "#0047AB",
        fontSize: 16,
        marginTop: 2,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "#000000aa",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        elevation: 5,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    pinInput: {
        width: "60%",
        fontSize: 24,
        borderBottomWidth: 1,
        textAlign: "center",
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: "#0047AB",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    modalButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
