import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: "98%",
        backgroundColor: "#FFF",
        marginVertical: 8,
        borderRadius: 18,
        flexDirection: "row",
        overflow: "hidden"
    },
    inputIcon: {
        width: 30,
        height: 48,
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        flex: 1,
        height: 48,
        paddingHorizontal: 5
    }
});
