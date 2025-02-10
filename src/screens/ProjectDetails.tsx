import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	Modal,
	TouchableOpacity,
	useWindowDimensions,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import themeColors from "../styles/theme";

type RootStackParamList = {
	ProjectDetails: { project: any };
};

type ProjectDetailsRouteProp = RouteProp<RootStackParamList, "ProjectDetails">;

export const ProjectDetails = () => {
	const route = useRoute<ProjectDetailsRouteProp>();
	const { project } = route.params || {};

	if (!project) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>Nie znaleziono projektu.</Text>
			</View>
		);
	}
	const { width, height } = useWindowDimensions();

	const [modalVisible, setModalVisible] = useState(false);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [planModalVisible, setPlanModalVisible] = useState(false);

	const openModal = (index: number) => {
		setSelectedImageIndex(index);
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.imageWrapper}>
				<Image
					source={
						typeof project.mainImage === "number"
							? project.mainImage
							: { uri: project.mainImage }
					}
					style={styles.image}
					resizeMode='cover'
				/>
			</View>

			<Text style={styles.name}>{project.name}</Text>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.imageGallery}>
				{project.images.map((image: any, index: number) => (
					<TouchableOpacity
						key={index}
						onPress={() => openModal(index)}>
						<Image
							source={
								typeof image === "number"
									? image
									: { uri: image }
							}
							style={styles.galleryImage}
							resizeMode='cover'
						/>
					</TouchableOpacity>
				))}
			</ScrollView>

			<Text style={styles.details}>
				<Text style={styles.bold}>Powierzchnia użytkowa:</Text>{" "}
				{project.usableArea} m²
			</Text>
			<Text style={styles.details}>
				<Text style={styles.bold}>Cena stanu surowego:</Text>{" "}
				{project.rawStatePrice.toLocaleString("pl-PL")} zł
			</Text>
			<Text style={styles.details}>
				<Text style={styles.bold}>Cena pod klucz:</Text>{" "}
				{project.turnKeyPrice.toLocaleString("pl-PL")} zł
			</Text>
			<Text style={styles.details}>
				<Text style={styles.bold}>Cena pod klucz z ogrodem:</Text>{" "}
				{project.gardenTurnKeyPrice.toLocaleString("pl-PL")} zł
			</Text>

			<TouchableOpacity onPress={() => setPlanModalVisible(true)}>
				<View style={styles.imageWrapper}>
					<Image
						source={
							typeof project.planImage === "number"
								? project.planImage
								: { uri: project.planImage }
						}
						style={styles.image}
						resizeMode='cover'
					/>
				</View>
			</TouchableOpacity>

			<Modal visible={planModalVisible} transparent={true}>
				<View style={styles.modalContainer}>
					<Image
						source={
							typeof project.planImage === "number"
								? project.planImage
								: { uri: project.planImage }
						}
						style={{
							width: width,
							height: height,
						}}
						resizeMode='contain'
					/>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={() => setPlanModalVisible(false)}>
						<Text style={styles.closeButtonText}>Zamknij</Text>
					</TouchableOpacity>
				</View>
			</Modal>

			<Text style={styles.sectionTitle}>Opis ogólny:</Text>
			<Text style={styles.description}>{project.generalDescription}</Text>

			<Text style={styles.sectionTitle}>Opis wnętrza:</Text>
			<Text style={styles.description}>
				{project.interiorDescription}
			</Text>

			<Modal visible={modalVisible} transparent={true}>
				<View style={styles.modalContainer}>
					<ScrollView
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						snapToInterval={width}
						decelerationRate='fast'
						contentOffset={{ x: selectedImageIndex * width, y: 0 }}
					>
						{project.images.map((image: any, index: number) => (
							<Image
								key={index}
								source={
									typeof image === "number"
										? image
										: { uri: image }
								}
								style={{
									width: width,
									height: height,
								}}
								resizeMode='contain'
							/>
						))}
					</ScrollView>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={closeModal}>
						<Text style={styles.closeButtonText}>Zamknij</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		paddingBottom: 20,
		marginHorizontal: 15,
	},
	imageWrapper: {
		width: "100%",
		height: 250,
		backgroundColor: "#d3d3d3",
		borderRadius: 10,
		marginTop: 20,
		marginBottom: 15,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
		color: themeColors.black,
		marginBottom: 10,
	},
	details: {
		fontSize: 16,
		color: themeColors.black,
		marginBottom: 8,
	},
	bold: {
		fontWeight: "bold",
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: themeColors.black,
		marginTop: 20,
		marginBottom: 5,
	},
	description: {
		fontSize: 16,
		color: themeColors.black,
		marginBottom: 15,
	},
	imageGallery: {
		marginTop: 10,
		marginBottom: 20,
	},
	galleryImage: {
		width: 150,
		height: 100,
		marginRight: 10,
		borderRadius: 5,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalImage: {
		width: 300,
		height: 400,
		marginTop: 100,
		marginHorizontal: 10,
	},
	closeButton: {
		position: "absolute",
		top: 30,
		right: 20,
		padding: 10,
		backgroundColor: themeColors.darkGray,
		borderRadius: 5,
	},
	closeButtonText: {
		color: themeColors.white,
		fontSize: 16,
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		fontSize: 18,
		color: "red",
	},
});
