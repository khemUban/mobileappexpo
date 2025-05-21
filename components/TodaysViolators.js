import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const dummyViolators = [
    {
        id: "1",
        studentId: "2023-00123",
        violations: ["No Black Shoes"],
    },
    {
        id: "2",
        studentId: "2023-00456",
        violations: ["Improper Haircut"],
    },
    {
        id: "3",
        studentId: "2023-00789",
        violations: ["No ID"],
    },
    {
        id: "4",
        studentId: "2023-00891",
        violations: ["Wrong Uniform"],
    },
];

export default function TodaysViolators() {
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.avatarContainer}>
                <MaterialIcons name="person" size={36} color="#0047AB" />
            </View>
            <View style={styles.details}>
                <Text style={styles.info}>{item.studentId}</Text>
                <View style={styles.violationContainer}>
                    {item.violations.map((v, idx) => (
                        <View key={idx} style={styles.violationBadge}>
                            <Text style={styles.violationText}>⚠ {v}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.wrapper}>
            <View style={styles.listContainer}>
                <Text style={styles.title}>TODAY'S VIOLATORS</Text>

                <FlatList
                    data={dummyViolators.slice(0, 4)}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />
            </View>

            {/* Gradient Overlay with Button */}
            <LinearGradient
                colors={["transparent", "rgba(0, 71, 171, 0.65)"]}
                // start={{ x: 0, y: 1 }}
                // end={{ x: 0, y: 0 }}
                style={styles.gradientOverlay}
            >
                <TouchableOpacity
                    style={styles.seeMoreButton}
                    onPress={() => navigation.navigate("TodaysViolatorsScreen")}
                >
                    <Text style={styles.seeMoreText}>See More</Text>
                </TouchableOpacity>
            </LinearGradient>

        </View>
    );
}

const styles = StyleSheet.create({

    title: {
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#0047AB",
        letterSpacing: 1,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        alignItems: "flex-start",
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        backgroundColor: "#E3EAFD",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    info: {
        fontSize: 14,
        color: "#555",
        fontWeight: "700",
    },
    violationContainer: {
        marginTop: 8,
    },
    violationBadge: {
        backgroundColor: "#FFE5E5",
        borderRadius: 6,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    violationText: {
        color: "#B00020",
        fontSize: 13,
    },
    gradientOverlay: {
        position: "absolute",
        bottom: 0,
        height: 150,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    },
    seeMoreButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderColor: "#fff",
        backgroundColor: "#0047AB",
    },
    seeMoreText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 11,
    },
});