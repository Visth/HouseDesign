import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Animated,
	TextInput,
	FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import themeColors from "../styles/theme";
import projectsData from "../data/projectsData"; // Import projektów

export const Navigation = () => {
	const [menuVisible, setMenuVisible] = useState(false);
	const [menuHeight] = useState(new Animated.Value(0));
	const [searchValue, setSearchValue] = useState("");
	const navigation: any = useNavigation();

	// Filtracja projektów po wpisanej nazwie
	const filteredProjects = projectsData.filter(
		(project) =>
			project.name.toLowerCase().startsWith(searchValue.toLowerCase()) // Sprawdza początek nazwy
	);

	const calculateMenuHeight = () => {
		const itemHeight = 50;
		const searchHeight = 50;
		const totalItems = 4;
		return menuVisible ? 0 : searchHeight + itemHeight * totalItems;
	};

	const navigateToProject = (project: any) => {
		// 1️⃣ Przejście do szczegółów projektu
		navigation.navigate("ProjectDetails", { project });
	
		// 2️⃣ Zamknięcie menu nawigacji
		setMenuVisible(false);
		
		// 3️⃣ Resetowanie pola wyszukiwania
		setSearchValue("");
	
		// 4️⃣ Schowanie animowanego menu (jeśli jest)
		Animated.timing(menuHeight, {
			toValue: 0, // Zamyka animację menu
			duration: 300,
			useNativeDriver: false,
		}).start();
	};
	

	const toggleMenu = () => {
		setMenuVisible((prev) => !prev);

		Animated.timing(menuHeight, {
			toValue: calculateMenuHeight(),
			duration: 300,
			useNativeDriver: false,
		}).start();
	};

	return (
		<View style={styles.container}>
			{/* Pasek nawigacji */}
			<View style={styles.navbar}>
				<View style={styles.leftSection}>
					<Ionicons name="home" size={40} color={themeColors.black} style={styles.icon} />
					<Text style={styles.companyName}>HouseDesign</Text>
				</View>
				<TouchableOpacity onPress={toggleMenu}>
					<Ionicons
						name={menuVisible ? "close" : "menu"}
						size={40}
						color={themeColors.black}
						style={styles.icon}
					/>
				</TouchableOpacity>
			</View>
	
			{/* Rozwijane menu */}
			<Animated.View style={[styles.menu, { height: menuHeight }]}>
				{menuVisible && (
					<>
						{/* Wyszukiwarka */}
						<View style={styles.searchContainer}>
							<Ionicons name="search" size={24} color={themeColors.darkGray} style={styles.searchIcon} />
							<TextInput
								style={styles.searchInput}
								placeholder="Znajdź projekt po nazwie..."
								placeholderTextColor={themeColors.darkGray}
								value={searchValue}
								onChangeText={setSearchValue}
							/>
						</View>
	
						{/* Lista wyników wyszukiwania */}
						{searchValue.length > 0 && filteredProjects.length > 0 && (
							<View style={styles.searchResultsContainer}>
								{filteredProjects.map((project) => (
									<TouchableOpacity key={project.name} style={styles.searchResult} onPress={() => navigateToProject(project)}>
										<Text style={styles.searchResultText}>{project.name}</Text>
									</TouchableOpacity>
								))}
							</View>
						)}
	
						{/* Opcje w menu */}
						<TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Home")}>
							<Text style={styles.menuText}>Strona główna</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("ConstructionCalculator")}>
							<Text style={styles.menuText}>Kalkulator Budowy</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.menuItem}>
							<Text style={styles.menuText} onPress={() => navigation.navigate("Plot")}>Działka i Budowa</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.menuItem}>
							<Text style={styles.menuText} onPress={() => navigation.navigate("IndividualProject")}>Projekty indywidualne</Text>
						</TouchableOpacity>
					</>
				)}
			</Animated.View>
		</View>
	);
	
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: themeColors.white,
		zIndex: 10,
	},
	navbar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
		paddingTop: 40,
		paddingBottom: 20,
		backgroundColor: themeColors.lightGreen,
	},
	leftSection: {
		flexDirection: "row",
		alignItems: "center",
	},
	companyName: {
		fontSize: 24,
		fontWeight: "bold",
		marginLeft: 10,
		color: themeColors.black,
	},
	icon: {
		marginRight: 10,
	},
	menu: {
		overflow: "hidden",
		backgroundColor: themeColors.lightGreen,
		paddingHorizontal: 20,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: themeColors.darkGray,
		backgroundColor: themeColors.lightGreen, // Tło wyszukiwarki
		zIndex: 20, // Na wierzchu
	},
	searchIcon: {
		marginRight: 10,
	},
	searchResultsContainer: {
		position: "absolute", // Na wierzchu
		top: 60, // Odsunięcie od wyszukiwarki
		left: 10,
		right: 10,
		backgroundColor: themeColors.white,
		borderWidth: 1,
		borderColor: themeColors.darkGray,
		borderRadius: 8,
		maxHeight: 200, // Maksymalna wysokość
		overflow: "scroll",
		zIndex: 100, // Zapewnia widoczność
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		color: themeColors.black,
		paddingVertical: 5,
	},
	searchResult: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderBottomColor: themeColors.lightGray,
	},
	searchResultText: {
		fontSize: 18,
		color: themeColors.black,
	},
	menuItem: {
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: themeColors.darkGray,
	},
	menuText: {
		fontSize: 18,
		color: themeColors.black,
	},
});

export default Navigation;
