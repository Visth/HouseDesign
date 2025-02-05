import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Navigation } from "./src/components/Navigation";
import { LandingScreen } from "./src/screens/LandingScreen";
import { Home } from "./src/screens/Home";
import { Contact } from "./src/screens/Contact";
import { Projects } from "./src/screens/Projects";
import { ProjectDetails } from "./src/screens/ProjectDetails";
import { ConstructionCalculator } from "./src/screens/ConstructionCalculator";
import { Plot } from "./src/screens/Plot";
import { IndividualProject } from "./src/screens/IndividualProject";

const Stack = createStackNavigator();

const App = () => (
	<NavigationContainer>
		<Stack.Navigator
			initialRouteName="LandingScreen"
			screenOptions={{ headerShown: false }}>
			<Stack.Screen name="LandingScreen" component={LandingScreen} />
			<Stack.Screen
				name="Home"
				component={withNavigation(Home)} // Użycie wrappera dla nawigacji
			/>
			<Stack.Screen
				name="Contact"
				component={withNavigation(Contact)} // Użycie wrappera dla nawigacji
			/>
			<Stack.Screen
				name="Projects"
				component={withNavigation(Projects)} // Użycie wrappera dla nawigacji
			/>
			<Stack.Screen
				name="ProjectDetails"
				component={withNavigation(ProjectDetails)} // Użycie wrappera dla nawigacji
			/>
			<Stack.Screen
				name="ConstructionCalculator"
				component={withNavigation(ConstructionCalculator)} // Użycie wrappera dla nawigacji
			/>
			<Stack.Screen
				name="Plot"
				component={withNavigation(Plot)} // Użycie wrappera dla nawigacji
			/>
			<Stack.Screen
				name="IndividualProject"
				component={withNavigation(IndividualProject)} // Użycie wrappera dla nawigacji
			/>
		</Stack.Navigator>
	</NavigationContainer>
);

export default App;

/**
 * HOC (Higher Order Component) do owijania ekranów, które mają zawierać nawigację.
 */
const withNavigation = (Component: React.ComponentType) => {
	return (props: any) => (
		<>
			<Navigation />
			<Component {...props} />
		</>
	);
};
