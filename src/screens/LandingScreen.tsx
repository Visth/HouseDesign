import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native"; // Dodane importy
import themeColors from "../styles/theme";

export const LandingScreen = () => {
    const navigation: any = useNavigation(); // Hook do nawigacji

    return (
        <LinearGradient
            colors={["#37b6ae", "#ffffff"]}
            start={{ x: 0, y: 0 }} // Początek gradientu (lewy górny róg)
            end={{ x: 1, y: 1 }}   // Koniec gradientu (prawy dolny róg)
            style={styles.container}
        >
            <View style={styles.header}>
                <Ionicons name="home" size={40} color="#000" style={styles.icon} />
                <Text style={styles.title}>HouseDesign</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Home")} // Przejście do "Home"
            >
                <Text style={styles.buttonText}>Startujmy!</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 50,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 200,
    },
    icon: {
        marginRight: 10,
        fontSize: 70,
    },
    title: {
        fontSize: 32,
        color: "#000000",
    },
    button: {
        width: "80%",
        backgroundColor: themeColors.lightGreen,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
