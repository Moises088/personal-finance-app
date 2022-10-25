import React from 'react';
import { View } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';
import GlobalPicker from '../../global/picker';
import { DATE_MONTH, DATE_YEAR } from '../../../constants/date.constants';

const HomeHeader: React.FC = () => {

  React.useEffect(() => {
    const date = new Date();
    setMonth(date.getMonth().toString());
    setYear(date.getFullYear().toString());
  }, [])

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const [visibleMonth, setVisibleMonth] = React.useState<boolean>(false)
  const [month, setMonth] = React.useState<string>('')
  const [visibleYear, setVisibleYear] = React.useState<boolean>(false)
  const [year, setYear] = React.useState<string>('')

  return (
    <View style={style.container}>
      <View style={style.containerButton}>
        <GlobalPicker
          itens={DATE_MONTH}
          selectedItem={month}
          setSelectedItem={setMonth}
          visible={visibleMonth}
          setVisible={setVisibleMonth}
        />
      </View>

      <View style={style.containerButton}>
        <GlobalPicker
          itens={DATE_YEAR}
          selectedItem={year}
          setSelectedItem={setYear}
          visible={visibleYear}
          setVisible={setVisibleYear}
        />
      </View>
    </View>
  );
}

export default HomeHeader;