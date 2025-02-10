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
				component={withNavigation(Home)}
			/>
			<Stack.Screen
				name="Contact"
				component={withNavigation(Contact)}
			/>
			<Stack.Screen
				name="Projects"
				component={withNavigation(Projects)}
			/>
			<Stack.Screen
				name="ProjectDetails"
				component={withNavigation(ProjectDetails)}
			/>
			<Stack.Screen
				name="ConstructionCalculator"
				component={withNavigation(ConstructionCalculator)}
			/>
			<Stack.Screen
				name="Plot"
				component={withNavigation(Plot)}
			/>
			<Stack.Screen
				name="IndividualProject"
				component={withNavigation(IndividualProject)}
			/>
		</Stack.Navigator>
	</NavigationContainer>
);

export default App;

const withNavigation = (Component: React.ComponentType) => {
	return (props: any) => (
		<>
			<Navigation />
			<Component {...props} />
		</>
	);
};
