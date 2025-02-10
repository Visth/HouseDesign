import { Text, TextProps } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export const CustomText = (props: TextProps) => {
  return <Text {...props} style={[globalStyles.text, props.style]} />;
};