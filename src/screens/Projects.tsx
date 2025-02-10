import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TextInput,
	TouchableOpacity,
	Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import projectsData from "../data/projectsData";
import themeColors from "../styles/theme";
import { useNavigation } from "@react-navigation/native";

export const Projects = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const navigation: any = useNavigation();

	const filteredProjects = projectsData.filter((project) =>
		project.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<View style={styles.container}>
			<View style={styles.stickyOptionsContainer}>
				<TouchableOpacity
					style={styles.option}
					onPress={() => navigation.navigate("Home")}>
					<Text style={styles.optionText}>O nas</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.optionSelected}
					onPress={() => navigation.navigate("Projects")}>
					<Text style={styles.optionTextSelected}>Projekty</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.option}
					onPress={() => navigation.navigate("Contact")}>
					<Text style={styles.optionText}>Kontakt</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.searchContainer}>
				<Ionicons
					name='search'
					size={24}
					color={themeColors.darkGray}
					style={styles.searchIcon}
				/>
				<TextInput
					style={styles.searchInput}
					placeholder='Szukaj...'
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
			</View>

			<FlatList
				data={filteredProjects}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.card}
						onPress={() =>
							navigation.navigate("ProjectDetails", {
								project: item,
							})
						}>
						<Image
							source={item.mainImage}
							style={styles.imagePlaceholder}
							resizeMode='cover'
						/>
						<Text style={styles.name}>{item.name}</Text>
						<Text style={styles.details}>
							Powierzchnia użytkowa: {item.usableArea} m²
						</Text>
						<Text style={styles.details}>
							Cena stanu surowego:{" "}
							{item.rawStatePrice.toLocaleString("pl-PL")} zł
						</Text>
						<Text style={styles.details}>
							Cena pod klucz:{" "}
							{item.turnKeyPrice.toLocaleString("pl-PL")} zł
						</Text>
						<Text style={styles.details}>
							Cena pod klucz z ogrodem:{" "}
							{item.gardenTurnKeyPrice.toLocaleString("pl-PL")} zł
						</Text>
					</TouchableOpacity>
				)}
				contentContainerStyle={styles.listContent}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: themeColors.white,
	},
	stickyOptionsContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		zIndex: 1000,
		backgroundColor: themeColors.white,
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 5,
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
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 60,
		marginHorizontal: 15,
		paddingVertical: 10,
		paddingHorizontal: 10,
		backgroundColor: themeColors.lightGray,
		borderRadius: 5,
	},
	searchIcon: {
		marginRight: 10,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
	},
	listContent: {
		paddingTop: 20,
		paddingBottom: 20,
	},
	card: {
		backgroundColor: themeColors.white,
		marginVertical: 10,
		marginHorizontal: 15,
		padding: 15,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		alignItems: "center",
	},
	imagePlaceholder: {
		width: "100%",
		height: 150,
		backgroundColor: "#d3d3d3",
		borderRadius: 5,
		marginBottom: 10,
	},
	name: {
		fontSize: 18,
		fontWeight: "bold",
		color: themeColors.black,
		marginBottom: 5,
	},
	details: {
		fontSize: 14,
		color: themeColors.black,
	},
});