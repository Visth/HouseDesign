import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
	ScrollView,
	TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import themeColors from "../styles/theme";

export const Contact = () => {
	const [selectedRegion, setSelectedRegion] = React.useState(""); // State dla wybranego województwa
	const [email, setEmail] = React.useState("");
	const [phone, setPhone] = React.useState("");
	const [message, setMessage] = React.useState("");
	const [houseArea, setHouseArea] = React.useState("");
	const [isSubmitted, setIsSubmitted] = React.useState(false);

	const navigation: any = useNavigation();

	const isFormValid =
		email && phone && message && houseArea && selectedRegion;

	const handleSubmit = () => {
		if (!isFormValid) return;

		// Wyświetlenie komunikatu o wysłaniu wiadomości
		setIsSubmitted(true);

		// Wyczyszczenie formularza po 5 sekundach
		setTimeout(() => {
			setIsSubmitted(false);
			setEmail("");
			setPhone("");
			setMessage("");
			setHouseArea("");
			setSelectedRegion("");
		}, 5000);
	};

	return (
		<View style={styles.container}>
			{/* Przyklejony nagłówek */}
			<View style={styles.stickyOptionsContainer}>
				<TouchableOpacity
					style={styles.option}
					onPress={() => navigation.navigate("Home")}>
					<Text style={styles.optionText}>O nas</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.option}
					onPress={() => navigation.navigate("Projects")}>
					<Text style={styles.optionText}>Projekty</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.optionSelected}
					onPress={() => navigation.navigate("Contact")}>
					<Text style={styles.optionTextSelected}>Kontakt</Text>
				</TouchableOpacity>
			</View>

			{/* Zawartość przewijalna */}
			<ScrollView contentContainerStyle={styles.scrollContent}>
				{/* Zdjęcie z napisem KONTAKT */}

				{/* <ImageBackground
					style={styles.headerImage}
					source={{ uri: "" }}>
					<View style={styles.headerOverlay}>
						<Text style={styles.headerText}>KONTAKT</Text>
					</View>
				</ImageBackground> */}

				{/* Sekcja treści */}
				<View style={styles.contentContainer}>
					<Text style={styles.title}>
						Zastanawiasz się nad budową domu lub zakupem projektu?
					</Text>
					<Text style={styles.subTitle}>
						Skontaktuj się z nami, chętnie odpowiemy na Twoje
						pytania.
					</Text>

					{/* Karty z informacjami */}
					<View style={styles.card}>
						<Ionicons
							name='call'
							size={24}
							color={themeColors.primary}
						/>
						<Text style={styles.cardText}>
							Zadzwoń: +00 123 456 789
						</Text>
					</View>

					<View style={styles.card}>
						<Ionicons
							name='mail'
							size={24}
							color={themeColors.primary}
						/>
						<Text style={styles.cardText}>
							Napisz: kontakt@designhouse.com
						</Text>
					</View>

					{/* Formularz „Wyślij wiadomość” */}
					<View style={styles.formContainer}>
						<Text style={styles.formTitle}>
							Wyślij nam wiadomość
						</Text>

						{/* Inputy formularza */}
						<TextInput
							style={styles.input}
							placeholder='Twój adres email...'
							placeholderTextColor={themeColors.darkGray}
							value={email}
							onChangeText={setEmail}
						/>
						<TextInput
							style={styles.input}
							placeholder='Twój numer telefonu...'
							placeholderTextColor={themeColors.darkGray}
							value={phone}
							onChangeText={setPhone}
						/>
						<TextInput
							style={[styles.input, styles.textArea]}
							placeholder='Treść wiadomości...'
							placeholderTextColor={themeColors.darkGray}
							multiline={true}
							numberOfLines={4}
							value={message}
							onChangeText={setMessage}
						/>
						<TextInput
							style={styles.input}
							placeholder='Powierzchnia planowanego domu...'
							placeholderTextColor={themeColors.darkGray}
							value={houseArea}
							onChangeText={setHouseArea}
						/>

						{/* Select z województwami */}
						<View style={styles.selectContainer}>
							<Picker
								selectedValue={selectedRegion}
								onValueChange={(itemValue: any) =>
									setSelectedRegion(itemValue)
								}
								style={styles.picker}>
								<Picker.Item
									label='Wybierz województwo'
									value=''
								/>
								<Picker.Item
									label='Dolnośląskie'
									value='dolnoslaskie'
								/>
								<Picker.Item
									label='Kujawsko-pomorskie'
									value='kujawskopomorskie'
								/>
								<Picker.Item
									label='Lubelskie'
									value='lubelskie'
								/>
								<Picker.Item
									label='Lubuskie'
									value='lubuskie'
								/>
								<Picker.Item label='Łódzkie' value='lodzkie' />
								<Picker.Item
									label='Małopolskie'
									value='malopolskie'
								/>
								<Picker.Item
									label='Mazowieckie'
									value='mazowieckie'
								/>
								<Picker.Item
									label='Opolskie'
									value='opolskie'
								/>
								<Picker.Item
									label='Podkarpackie'
									value='podkarpackie'
								/>
								<Picker.Item
									label='Podlaskie'
									value='podlaskie'
								/>
								<Picker.Item
									label='Pomorskie'
									value='pomorskie'
								/>
								<Picker.Item label='Śląskie' value='slaskie' />
								<Picker.Item
									label='Świętokrzyskie'
									value='swietokrzyskie'
								/>
								<Picker.Item
									label='Warmińsko-mazurskie'
									value='warminskomazurskie'
								/>
								<Picker.Item
									label='Wielkopolskie'
									value='wielkopolskie'
								/>
								<Picker.Item
									label='Zachodniopomorskie'
									value='zachodniopomorskie'
								/>
							</Picker>
						</View>
						<TouchableOpacity
							style={[
								styles.submitButton,
								{
									backgroundColor: isFormValid
										? themeColors.lightGreen
										: themeColors.gray,
								},
							]}
							disabled={!isFormValid}
							onPress={handleSubmit}>
							<Text style={styles.submitButtonText}>Wyślij</Text>
						</TouchableOpacity>

						{/* Wiadomość potwierdzająca */}
						{isSubmitted && (
							<Text style={styles.successMessage}>
								Wiadomość wysłana. Skontaktujemy się z Tobą tak
								szybko jak to możliwe.
							</Text>
						)}
					</View>
				</View>
				<View style={styles.mapContainer}>
					<MapView
						style={styles.map}
						initialRegion={{
							latitude: 52.40936976192418,
							longitude: 16.93183083852028,
							latitudeDelta: 0.01,
							longitudeDelta: 0.01,
						}}>
						<Marker
							coordinate={{
								latitude: 52.40936976192418,
								longitude: 16.93183083852028,
							}}
							title='Design House'
							description='Lokalizacja naszej firmy'
						/>
					</MapView>
				</View>
				<View style={styles.benefitsContainer}>
					<View style={styles.benefitRow}>
						<Ionicons
							name='shield-checkmark'
							size={48}
							color={themeColors.white}
						/>
						<Text style={styles.benefitText}>10 lat gwarancji</Text>
					</View>
					<View style={styles.benefitRow}>
						<Ionicons
							name='documents-sharp'
							size={48}
							color={themeColors.white}
						/>
						<Text style={styles.benefitText}>500 referencji</Text>
					</View>
					<View style={styles.benefitRow}>
						<Ionicons
							name='home-sharp'
							size={48}
							color={themeColors.white}
						/>
						<Text style={styles.benefitText}>
							900 wybudowanych domów
						</Text>
					</View>
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
	scrollContent: {
		paddingTop: 60,
	},
	headerImage: {
		width: "100%",
		height: 400,
		backgroundColor: themeColors.gray,
		justifyContent: "center",
		alignItems: "center",
	},
	headerOverlay: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	headerText: {
		fontSize: 32,
		fontWeight: "bold",
		color: themeColors.white,
		textAlign: "center",
	},
	contentContainer: {
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: themeColors.black,
		marginBottom: 10,
		textAlign: "center",
	},
	subTitle: {
		fontSize: 16,
		color: themeColors.gray,
		textAlign: "center",
		marginBottom: 20,
	},
	card: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: themeColors.lightGreen,
		padding: 15,
		borderRadius: 8,
		marginBottom: 10,
	},
	cardText: {
		marginLeft: 10,
		fontSize: 16,
		color: themeColors.black,
	},
	formContainer: {
		marginTop: 20,
	},
	formTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: themeColors.black,
		textAlign: "center",
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: themeColors.gray,
		paddingVertical: 10,
		marginBottom: 15,
		fontSize: 16,
		color: themeColors.black,
	},
	textArea: {
		textAlignVertical: "top",
		// height: 100,
	},
	selectContainer: {
		borderBottomWidth: 1,
		borderBottomColor: themeColors.gray,
		marginBottom: 15,
	},
	picker: {
		height: 50,
		width: "100%",
	},
	submitButton: {
		marginTop: 20,
		paddingVertical: 15,
		borderRadius: 8,
		alignItems: "center",
	},
	submitButtonText: {
		fontSize: 16,
		color: themeColors.white,
		fontWeight: "bold",
	},
	successMessage: {
		marginTop: 10,
		fontSize: 16,
		color: themeColors.lightGreen,
		textAlign: "center",
	},
	mapContainer: {
		marginTop: 20,
		height: 200,
		width: "100%",
		borderRadius: 10,
		overflow: "hidden",
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	benefitsContainer: {
		backgroundColor: themeColors.lightGreen,
		width: "100%",
		paddingVertical: 20,
		paddingHorizontal: 10,
	},
	benefitRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
	},
	benefitText: {
		marginLeft: 15,
		fontSize: 20,
		color: themeColors.white,
		fontWeight: "bold",
	},
});
