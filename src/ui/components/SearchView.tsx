import React from 'react';
import {View, StyleSheet, ViewProps, TextInput, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/reducers/themeApp';
import {ThemeConstants} from '../../libs/constants';

interface SearchViewProps extends ViewProps {
  placeholder?: string;
  onChange: (str: string) => void;
}

const SearchView = ({
  placeholder = 'Search',
  onChange,
  ...props
}: SearchViewProps) => {
  const theme = useSelector(selectTheme);
  const onChangeText = (text: string) => {
    onChange(text);
  };

  return (
    <View
      style={[
        styles.container,
        props.style,
        {backgroundColor: ThemeConstants[theme].search},
      ]}>
      <View style={styles.left}>
        <Icon name="search-outline" size={25} color="gray" />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={ThemeConstants[theme].placeholder}
          style={[
            styles.placeholderText,
            {color: ThemeConstants[theme].fontColor},
          ]}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

export default SearchView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 13 : 3,
    borderRadius: 7,
  },
  left: {flexDirection: 'row', alignItems: 'center', gap: 10},
  placeholderText: {
    fontSize: 30,
    flex: 1,
    fontFamily: 'RobotoSlab-Thin',
  },
});
