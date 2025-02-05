import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Modal,
	Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import themeColors from "../styles/theme";
import projectsData from "../data/projectsData";

export const Home = () => {
	const [selectedDate, setSelectedDate]: any = useState(null); // Wybrana data
	const [modalVisible, setModalVisible] = useState(false); // Kontrola widoczności modala

	const navigation: any = useNavigation();

	const availableHours = ["10:00", "12:00", "14:00", "16:00", "18:00"]; // Dostępne godziny

	const handleDayPress = (day: any) => {
		setSelectedDate(day.dateString); // Ustaw wybraną datę
		setModalVisible(true); // Otwórz modal
	};

	return (
		<View style={styles.container}>
			{/* Przyklejony nagłówek */}
			<View style={styles.stickyOptionsContainer}>
				<TouchableOpacity
					style={styles.optionSelected}
					onPress={() => navigation.navigate("Home")}>
					<Text style={styles.optionTextSelected}>O nas</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.option}
					onPress={() => navigation.navigate("Projects")}>
					<Text style={styles.optionText}>Projekty</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.option}
					onPress={() => navigation.navigate("Contact")}>
					<Text style={styles.optionText}>Kontakt</Text>
				</TouchableOpacity>
			</View>

			{/* Treść przewijalna */}
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>
						Dlaczego warto zbudować dom z HouseDesign?
					</Text>
					<Text style={styles.sectionContent}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>
						Nasze najnowsze projekty
					</Text>

					<View style={styles.projectsContainer}>
						{[
							projectsData[0],
							projectsData[5],
							projectsData[7],
							projectsData[13],
						].map(
							(project, index) =>
								project && ( // Sprawdzenie czy projekt istnieje (zapobiega błędom)
									<TouchableOpacity
										key={index}
										style={styles.project}
										onPress={() =>
											navigation.navigate(
												"ProjectDetails",
												{ project }
											)
										}>
										<Image
											source={
												typeof project.mainImage ===
												"number"
													? project.mainImage
													: { uri: project.mainImage }
											}
											style={styles.projectImage}
											resizeMode='cover'
										/>
										<Text style={styles.projectName}>
											{project.name}
										</Text>
									</TouchableOpacity>
								)
						)}
					</View>
				</View>

				{/* Kalendarz */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>
						Zaplanuj rozmowę z naszym konsultantem
					</Text>
					<Calendar
						onDayPress={handleDayPress}
						markedDates={{
							[selectedDate]: {
								selected: true,
								selectedColor: themeColors.primary,
							},
						}}
						theme={{
							todayTextColor: themeColors.primary,
							arrowColor: themeColors.primary,
						}}
						firstDay={1}
					/>
				</View>

				{/* Modal z godzinami */}
				<Modal
					visible={modalVisible}
					transparent={true}
					animationType='slide'
					onRequestClose={() => setModalVisible(false)}>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<Text style={styles.modalTitle}>
								Wybierz godzinę
							</Text>
							{availableHours.map((hour, index) => (
								<TouchableOpacity
									key={index}
									style={styles.hourButton}
									onPress={() => {
										setModalVisible(false);
										alert(
											`Wybrano termin: ${selectedDate} o godzinie ${hour}`
										);
									}}>
									<Text style={styles.hourText}>{hour}</Text>
								</TouchableOpacity>
							))}
							<TouchableOpacity
								style={styles.closeButton}
								onPress={() => setModalVisible(false)}>
								<Text style={styles.closeButtonText}>
									Zamknij
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>
						Budowa domu? Z nami to proste!
					</Text>
					<Text style={styles.sectionContent}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Quisque volutpat, tortor non volutpat ultricies, nulla
						quam facilisis nunc, non elementum nisi ex in sapien.
					</Text>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>
							Więcej o naszym doświadczeniu
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: themeColors.white,
	},
	stickyOptionsContainer: {
		position: "absolute", // Ustawia opcje jako przyklejone
		top: 0,
		left: 0,
		right: 0,
		zIndex: 1000, // Wyższy indeks warstwy, aby nic ich nie przykrywało
		backgroundColor: themeColors.white,
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 5, // Dodaje cień na Androidzie
	},
	contentContainer: {
		paddingTop: 60, // Zapewnia miejsce na przyklejony nagłówek
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	option: {
		flex: 1,
		alignItems: "center",
		marginHorizontal: 5,
		paddingBottom: 5,
		borderBottomWidth: 2,
		borderBottomColor: themeColors.black,
	},
	optionText: {
		fontSize: 16,
		fontWeight: "bold",
		color: themeColors.black,
	},
	optionSelected: {
		flex: 1,
		alignItems: "center",
		marginHorizontal: 5,
		paddingBottom: 5,
		borderBottomWidth: 2,
		borderBottomColor: themeColors.lightGreen,
	},
	optionTextSelected: {
		fontSize: 16,
		fontWeight: "bold",
		color: themeColors.lightGreen,
	},
	section: {
		marginBottom: 30,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		color: themeColors.black,
	},
	sectionContent: {
		fontSize: 16,
		lineHeight: 24,
		color: themeColors.gray,
	},
	projectsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	project: {
		width: "48%", // 2 elementy w rzędzie
		marginBottom: 15,
		backgroundColor: "#e5e5e5",
		borderRadius: 10,
		overflow: "hidden",
	},
	projectImage: {
		width: "100%",
		height: 150,
	},
	projectName: {
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
		padding: 10,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: "80%",
		backgroundColor: themeColors.white,
		borderRadius: 10,
		padding: 20,
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
		color: themeColors.black,
	},
	hourButton: {
		width: "100%",
		paddingVertical: 10,
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: themeColors.gray,
	},
	hourText: {
		fontSize: 16,
		color: themeColors.black,
	},
	closeButton: {
		marginTop: 20,
		backgroundColor: themeColors.primary,
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	closeButtonText: {
		color: themeColors.white,
		fontWeight: "bold",
	},
	button: {
		marginTop: 20,
		alignSelf: "center",
		backgroundColor: themeColors.lightGreen,
		width: "80%",
		paddingVertical: 15,
		borderRadius: 8,
		alignItems: "center",
	},
	buttonText: {
		color: themeColors.white,
		fontSize: 16,
		fontWeight: "bold",
	},
});
