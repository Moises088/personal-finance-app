import { Dimensions } from "react-native";
import Constants from "expo-constants";

export const WINDOW_WIDTH = Dimensions.get("window").width;
export const WINDOW_HEIGTH = Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const SCREEN_HEIGTH = Dimensions.get("screen").height;

export const STATUS_BAR_HEIGHT = Constants.statusBarHeight
