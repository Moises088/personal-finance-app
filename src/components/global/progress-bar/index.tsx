import React from 'react';
import { View, Image, Text } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { ProgressBarProps } from '../../../interfaces/screens/progress-bar.interface';
import { styles } from './styles';

const ProgressBar: React.FC<ProgressBarProps> = ({ backColor, barColor, progress, barText }) => {

    const { theme } = React.useContext(ThemeContext)
    const style = styles(theme);

    return (
        <View style={[style.backDrop, { backgroundColor: backColor }]}>
            <View style={[style.bar, { width: `${progress > 100 ? 100 : progress}%`, backgroundColor: barColor }]} />
            {barText && (
                <View style={style.barText}>
                    <Text numberOfLines={1} style={style.text}>{barText}</Text>
                </View>
            )}
        </View>
    );
}

export default ProgressBar;