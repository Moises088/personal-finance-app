import React from 'react';
import { View } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';
import GlobalPicker from '../../global/picker';
import { DATE_MONTH, DATE_YEAR } from '../../../constants/date.constants';
import { FinancesContext } from '../../../contexts/financesContext';

const HomeHeader: React.FC = () => {

  const {
    filteredMonth,
    filteredYear,
    setFilteredMonth,
    setFilteredYear
  } = React.useContext(FinancesContext)

  React.useEffect(() => {
    const date = new Date();
    const getMonth = (date.getMonth() + 1).toString();
    const getFullYear = date.getFullYear().toString()
    setFilteredYear(getFullYear);
    setFilteredMonth(getMonth);
  }, [])

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const [visibleMonth, setVisibleMonth] = React.useState<boolean>(false)
  const [visibleYear, setVisibleYear] = React.useState<boolean>(false)

  return (
    <View style={style.container}>
      <View style={style.containerButton}>
        <GlobalPicker
          itens={DATE_MONTH}
          selectedItem={filteredMonth}
          setSelectedItem={setFilteredMonth}
          visible={visibleMonth}
          setVisible={setVisibleMonth}
        />
      </View>

      <View style={style.containerButton}>
        <GlobalPicker
          itens={DATE_YEAR}
          selectedItem={filteredYear}
          setSelectedItem={setFilteredYear}
          visible={visibleYear}
          setVisible={setVisibleYear}
          containerStyle={{ justifyContent: 'flex-end', }}
        />
      </View>
    </View>
  );
}

export default HomeHeader;