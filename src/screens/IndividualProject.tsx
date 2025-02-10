import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import themeColors from "../styles/theme";

export const IndividualProject = () => {
    const [selectedRegion, setSelectedRegion] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [phone, setPhone] = React.useState("");
	const [message, setMessage] = React.useState("");
	const [houseArea, setHouseArea] = React.useState("");
	const [isSubmitted, setIsSubmitted] = React.useState(false);

    const isFormValid =
		email && phone && message && houseArea && selectedRegion;

	const handleSubmit = () => {
		if (!isFormValid) return;

		setIsSubmitted(true);

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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Projekty Indywidualne</Text>

            <Text style={styles.description}>
                Przerobimy dla Ciebie dowolny projekt tak, aby Twój dom był idealny i spełniał wszelkie oczekiwania.
            </Text>

            <Image source={require("../assets/img/individual/worker.jpg")} style={styles.image} />
            
            <Text style={styles.subHeader}>
                Nazywam się Stanisław Nowak, CEO HouseDesign i wieloletni praktyk w budowie domów
            </Text>
            
            <Text style={styles.bio}>
                Od ponad 20 lat zajmuję się projektowaniem i budową domów jednorodzinnych. Nadzorowałem realizację
                ponad 500 inwestycji budowlanych, zarówno dla klientów indywidualnych, jak i dużych deweloperów.
                Moim priorytetem jest funkcjonalność, estetyka i trwałość każdego projektu. Pracując z moim zespołem,
                masz pewność, że Twój dom zostanie zaprojektowany z dbałością o najmniejsze detale, a proces budowy
                przebiegnie sprawnie i terminowo. W HouseDesign łączymy nowoczesne technologie z tradycyjnym rzemiosłem,
                aby dostarczać naszym klientom rozwiązania na najwyższym poziomie.
            </Text>
            <View style={styles.formContainer}>
						<Text style={styles.formTitle}>
							Wyślij mi wiadomość, odpowiem tak szybko jak to możliwe
						</Text>

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

						{isSubmitted && (
							<Text style={styles.successMessage}>
								Wiadomość wysłana. Skontaktujemy się z Tobą tak
								szybko jak to możliwe.
							</Text>
						)}
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
        textAlign: "center",
        marginBottom: 10,
        color: "#333",
    },
    bio: {
        fontSize: 16,
        textAlign: "justify",
        color: "#444",
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
});