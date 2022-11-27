import React from 'react';
import { Modal, Image, View } from 'react-native';
import { styles } from './styles';

const SPLASH_GIF = require("../../../../assets/gifs/splash.gif")

/**
 * @autor image https://lottiefiles.com/53461-chart-webble
 */
const Loading: React.FC<{ visible: boolean }> = ({ visible }) => {

    const style = styles();

    return (
        <Modal visible={visible} transparent={true}>
            <View style={style.container}>
                <Image source={SPLASH_GIF} style={style.gif} />
            </View>
        </Modal>
    );
}

export default Loading;