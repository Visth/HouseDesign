import React, { useState } from "react";
import { 
	View, 
	Text, 
	Image, 
	StyleSheet, 
	ScrollView, 
	TouchableOpacity, 
	Modal,
	Dimensions 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import themeColors from "../styles/theme";

const images = [
	require("../assets/img/plot/plot-build-1.jpg"),
	require("../assets/img/plot/plot-build-2.jpg"),
	require("../assets/img/plot/plot-build-3.jpg"),
	require("../assets/img/plot/plot-house-1.jpg"),
	require("../assets/img/plot/plot-house-2.jpg"),
	require("../assets/img/plot/plot-house-3.jpg"),
	require("../assets/img/plot/plot-house-4.jpg"),
	require("../assets/img/plot/plot-house-5.jpg"),
	require("../assets/img/plot/plot-house-6.jpg"),
];

const { width } = Dimensions.get("window");

export const Plot = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);

	const navigation: any = useNavigation();

	const handleNavigate = () => {
		navigation.navigate("ConstructionCalculator");
	};

	const openModal = (image: any) => {
		setSelectedImage(image);
		setModalVisible(true);
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.header}>Działka pod budowę domu</Text>

			<Text style={styles.description}>
				Poszukujesz idealnej działki pod budowę swojego wymarzonego domu? 
				Chętnie pomożemy! Oferujemy kompleksową obsługę, od wyboru odpowiedniego 
				gruntu po formalności związane z pozwoleniem na budowę. Dzięki naszemu doświadczeniu 
				i profesjonalizmowi, proces zakupu działki i rozpoczęcia budowy przebiegnie 
				sprawnie i bezproblemowo.
			</Text>

			<Image source={require("../assets/img/plot/plot-main.jpg")} style={styles.image} />
			<Text style={styles.subHeader}>Dlaczego warto nam zaufać?</Text>
			<View style={styles.listContainer}>
				<Text style={styles.listItem}>✔ Pomoc w wyborze i ocenie przydatności działki</Text>
				<Text style={styles.listItem}>✔ Doprowadzenie mediów</Text>
				<Text style={styles.listItem}>✔ Tysiące gotowych projektów domów lub indywidualny projekt</Text>
				<Text style={styles.listItem}>✔ Jasno przedstawione koszty realizacji</Text>
				<Text style={styles.listItem}>✔ Załatwienie formalności, w tym pozwolenia na budowę</Text>
				<Text style={styles.listItem}>✔ Terminowa realizacja budowy</Text>
				<Text style={styles.listItem}>✔ Projekt i wykonanie zagospodarowania terenu</Text>
				<Text style={styles.listItem}>✔ Odbiór budynku</Text>
			</View>

			<Text style={styles.sectionHeader}>Oto jak budujemy domy</Text>
			<Image source={require("../assets/img/plot/plot-main-2.jpg")} style={styles.processImage} />
			<View style={styles.listContainer}>
				<Text style={styles.listItem}>✔ Indywidualne podejście do każdego projektu</Text>
				<Text style={styles.listItem}>✔ Współpraca z doświadczonymi architektami</Text>
				<Text style={styles.listItem}>✔ Nowoczesne technologie i materiały</Text>
				<Text style={styles.listItem}>✔ Pełna zgodność z normami budowlanymi</Text>
				<Text style={styles.listItem}>✔ Stały kontakt z klientem i raporty z postępu</Text>
				<Text style={styles.listItem}>✔ Kontrola jakości na każdym etapie budowy</Text>
				<Text style={styles.listItem}>✔ Gwarancja na wykonane prace</Text>
			</View>
			<Text style={styles.boldText}>Aktualne budowy</Text>
			<View style={styles.galleryContainer}>
				{images.map((image, index) => (
					<TouchableOpacity key={index} onPress={() => openModal(image)} style={styles.imageWrapper}>
						<Image source={image} style={styles.galleryImage} />
					</TouchableOpacity>
				))}
			</View>
			<Modal visible={modalVisible} transparent={true} animationType="fade">
				<View style={styles.modalContainer}>
					<TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
						<Ionicons name="close" size={30} color="white" />
					</TouchableOpacity>
					{selectedImage && <Image source={selectedImage} style={styles.modalImage} />}
				</View>
			</Modal>

			<View style={styles.calculatorContainer}>
			<TouchableOpacity style={styles.button} onPress={handleNavigate}>
				<Text style={styles.buttonText}>Przejdź do Kalkulatora Budowy</Text>
			</TouchableOpacity>
			<Text style={styles.infoText}>
				Wystarczy 60 sekund aby oszacować koszt budowy Twojego wymarzonego domu, kliknij aby 
				odpowiedzieć na kilka pytań i się przekonać.
			</Text>
		</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: "#fff",
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 15,
		color: "#333",
	},
	description: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
		color: "#555",
	},
	image: {
		width: "100%",
		height: 200,
		borderRadius: 10,
		marginBottom: 20,
	},
	subHeader: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#333",
	},
	sectionHeader: {
		fontSize: 22,
		fontWeight: "bold",
		marginTop: 20,
		marginBottom: 10,
		color: "#333",
		textAlign: "center",
	},
	listContainer: {
		paddingLeft: 10,
		marginBottom: 20,
	},
	listItem: {
		fontSize: 16,
		marginBottom: 5,
		color: "#444",
	},
	processImage: {
		width: "100%",
		height: 200,
		borderRadius: 10,
		marginBottom: 20,
	},
	boldText: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 20,
		marginBottom: 10,
		color: "#333",
		textAlign: "center",
	},
	galleryContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	imageWrapper: {
		width: width / 3 - 18,
		marginBottom: 10,
	},
	galleryImage: {
		width: "100%",
		height: width / 3 - 14,
		borderRadius: 8,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.9)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalImage: {
		width: width * 0.9,
		height: width * 1.2,
		resizeMode: "contain",
	},
	closeButton: {
		position: "absolute",
		top: 40,
		right: 20,
		zIndex: 10,
	},
	calculatorContainer: {
		marginTop: 20,
		alignItems: "center",
	},
	button: {
		backgroundColor: themeColors.lightGreen,
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 10,
		width: "90%",
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	infoText: {
		color: themeColors.gray,
		fontSize: 14,
		textAlign: "center",
		marginTop: 10,
		width: "90%",
	},
});

