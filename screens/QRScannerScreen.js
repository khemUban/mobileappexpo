// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { CameraView, useCameraPermissions } from "expo-camera";

// const QRScannerScreen = ({ navigation }) => {
//   const [facing, setFacing] = useState("back");
//   const [permission, requestPermission] = useCameraPermissions();
//   const [scanned, setScanned] = useState(false);
//   const [loading, setLoading] = useState(false);

//   if (!permission) return <View />;
//   if (!permission.granted) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>
//           We need your permission to access the camera.
//         </Text>
//         <Button title="Grant Permission" onPress={requestPermission} />
//       </View>
//     );
//   }

//   const handleScan = async ({ data }) => {
//     if (scanned) return;
//     setScanned(true);
//     setLoading(true);

//     try {
//       const response = await fetch(
//         "http://192.168.1.18:8000/api/students/verify-qr",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ scannedData: data }),
//         }
//       );

//       const result = await response.json();
//       setLoading(false);

//       if (response.ok && result.exists) {
//         Alert.alert("Success", "Student found.", [
//           { text: "OK", onPress: () => navigation.goBack() },
//         ]);
//       } else {
//         Alert.alert("Not Found", result.message || "Student not found.");
//         setScanned(false);
//       }
//     } catch (error) {
//       console.error("Scan error:", error);
//       setLoading(false);
//       Alert.alert("Error", "Failed to verify scanned data. Please try again.");
//       setScanned(false);
//     }
//   };

//   const toggleCameraFacing = () => {
//     setFacing((prev) => (prev === "back" ? "front" : "back"));
//   };

//   return (
//     <View style={styles.container}>
//       <CameraView
//         style={styles.camera}
//         facing={facing}
//         barcodeScannerSettings={{
//           barcodeTypes: [
//             "qr",
//             "ean13",
//             "ean8",
//             "upc_a",
//             "upc_e",
//             "code39",
//             "code128",
//           ],
//         }}
//         onBarcodeScanned={handleScan}
//       >
//         <View style={styles.overlay}>
//           <View style={styles.scanArea} />
//           {loading && (
//             <View style={styles.loadingOverlay}>
//               <ActivityIndicator size="large" color="#fff" />
//               <Text style={styles.loadingText}>Verifying...</Text>
//             </View>
//           )}
//         </View>

//         <View style={styles.buttonContainer}>
//           <Button title="Flip Camera" onPress={toggleCameraFacing} />
//         </View>
//       </CameraView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   message: { textAlign: "center", marginTop: 20, fontSize: 16 },
//   camera: { flex: 1 },
//   overlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   scanArea: {
//     width: 250,
//     height: 250,
//     borderWidth: 2,
//     borderColor: "white",
//     borderRadius: 10,
//   },
//   loadingOverlay: {
//     position: "absolute",
//     top: "40%",
//     left: "25%",
//     right: "25%",
//     backgroundColor: "#000000aa",
//     borderRadius: 10,
//     padding: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingText: {
//     color: "#fff",
//     marginTop: 10,
//     fontSize: 16,
//   },
//   buttonContainer: {
//     position: "absolute",
//     bottom: 40,
//     alignSelf: "center",
//   },
// });

// export default QRScannerScreen;


import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

const QRScannerScreen = ({ navigation }) => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to access the camera.</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const handleScan = ({ data }) => {
    if (scanned) return;
    setScanned(true);

    // Navigate to IssueViolationScreen and pass dummy data
    navigation.navigate("IssueViolationScreen", {
      student: {
        id: data,
        avatar: null, // You can pass an image URI if you want
      },
    });
  };

  const toggleCameraFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleScan}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Flip Camera" onPress={toggleCameraFacing} />
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  message: { textAlign: "center", marginTop: 20, fontSize: 16 },
  camera: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
});

export default QRScannerScreen;
