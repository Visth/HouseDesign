import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import themeColors from "../styles/theme";

export const ConstructionCalculator = () => {
	const [area, setArea] = useState("");
	const [province, setProvince] = useState("");
	const [buildingType, setBuildingType] = useState("");
	const [roofType, setRoofType] = useState("");
	const [ceilingType, setCeilingType] = useState("");
	const [garage, setGarage] = useState("");
	const [cost, setCost] = useState<number | null>(null);

	const provinces = [
		"Dolnośląskie",
		"Kujawsko-Pomorskie",
		"Lubelskie",
		"Lubuskie",
		"Łódzkie",
		"Małopolskie",
		"Mazowieckie",
		"Opolskie",
		"Podkarpackie",
		"Podlaskie",
		"Pomorskie",
		"Śląskie",
		"Świętokrzyskie",
		"Warmińsko-Mazurskie",
		"Wielkopolskie",
		"Zachodniopomorskie",
	];

	const isFormValid =
		area && province && buildingType && roofType && ceilingType && garage;

	const calculateCost = () => {
		let baseCost = parseFloat(area) * 3000; // Podstawowy koszt za m²

		if (roofType === "Dwuspadowy") baseCost *= 1.05;
		if (roofType === "Wielospadowy") baseCost *= 1.1;
		if (ceilingType === "Betonowy") baseCost *= 1.08;
		if (garage === "Na 1 auto") baseCost += 30000;
		if (garage === "Na 2 auta") baseCost += 50000;

		setCost(Math.round(baseCost));
	};

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Kalkulator Budowy</Text>

			{/* Powierzchnia użytkowa */}
			<View style={styles.card}>
				<Text style={styles.label}>
					Podaj powierzchnię użytkową domu (m²)
				</Text>
				<TextInput
					style={styles.input}
					keyboardType='numeric'
					value={area}
					onChangeText={setArea}
					placeholder='Wpisz metry kwadratowe'
				/>
			</View>

			{/* Województwo */}
			<View style={styles.card}>
				<Text style={styles.label}>Województwo inwestycji</Text>
				<Picker
					selectedValue={province}
					onValueChange={setProvince}
					style={styles.picker}>
					<Picker.Item label='Wybierz województwo' value='' />
					{provinces.map((prov, index) => (
						<Picker.Item key={index} label={prov} value={prov} />
					))}
				</Picker>
			</View>

			{/* Rodzaj budynku */}
			<View style={styles.card}>
				<Text style={styles.label}>Wybierz rodzaj budynku</Text>
				<Picker
					selectedValue={buildingType}
					onValueChange={setBuildingType}
					style={styles.picker}>
					<Picker.Item label='Wybierz rodzaj' value='' />
					<Picker.Item label='Parterowy' value='Parterowy' />
					<Picker.Item label='Z Poddaszem' value='Z Poddaszem' />
					<Picker.Item label='Piętrowy' value='Piętrowy' />
				</Picker>
			</View>

			{/* Rodzaj dachu */}
			<View style={styles.card}>
				<Text style={styles.label}>Wybierz rodzaj dachu</Text>
				<Picker
					selectedValue={roofType}
					onValueChange={setRoofType}
					style={styles.picker}>
					<Picker.Item label='Wybierz dach' value='' />
					<Picker.Item label='Płaski' value='Płaski' />
					<Picker.Item label='Dwuspadowy' value='Dwuspadowy' />
					<Picker.Item label='Wielospadowy' value='Wielospadowy' />
				</Picker>
			</View>

			{/* Rodzaj stropu */}
			<View style={styles.card}>
				<Text style={styles.label}>Wybierz rodzaj stropu</Text>
				<Picker
					selectedValue={ceilingType}
					onValueChange={setCeilingType}
					style={styles.picker}>
					<Picker.Item label='Wybierz strop' value='' />
					<Picker.Item label='Drewniany' value='Drewniany' />
					<Picker.Item label='Betonowy' value='Betonowy' />
				</Picker>
			</View>

			{/* Garaż */}
			<View style={styles.card}>
				<Text style={styles.label}>Wybierz garaż</Text>
				<Picker
					selectedValue={garage}
					onValueChange={setGarage}
					style={styles.picker}>
					<Picker.Item label='Wybierz garaż' value='' />
					<Picker.Item label='Na 1 auto' value='Na 1 auto' />
					<Picker.Item label='Na 2 auta' value='Na 2 auta' />
					<Picker.Item label='Bez garażu' value='Bez garażu' />
				</Picker>
			</View>

			{cost !== null && (
				<Text style={styles.result}>
					Budowa Twojego domu wyniesie: {cost.toLocaleString("pl-PL")}{" "}
					zł
				</Text>
			)}

			{/* Przycisk Oblicz */}
			<TouchableOpacity
				style={[styles.button, !isFormValid && styles.buttonDisabled]}
				onPress={calculateCost}
				disabled={!isFormValid}>
				<Text style={styles.buttonText}>Oblicz</Text>
			</TouchableOpacity>

			{/* Wynik */}
			
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
	},
	card: {
		backgroundColor: "#f5f5f5",
		borderRadius: 10,
		padding: 15,
		marginBottom: 20,
		borderWidth: 1,
		borderColor: "#ccc",
	},
	label: {
		fontSize: 16,
		marginBottom: 5,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		backgroundColor: "#fff",
	},
	picker: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		backgroundColor: "#fff",
	},
	button: {
		backgroundColor: themeColors.lightGreen,
		padding: 15,
		borderRadius: 5,
		alignItems: "center",
		marginVertical: 40,
	},
	buttonDisabled: {
		backgroundColor: "#ccc",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	result: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
});
