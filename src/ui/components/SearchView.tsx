import React from 'react';
import {View, StyleSheet, ViewProps, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchViewProps extends ViewProps {
  placeholder?: string;
  onChange: (str: string) => void;
}

const SearchView = ({
  placeholder = 'Search',
  onChange,
  ...props
}: SearchViewProps) => {
  const onChangeText = (text: string) => {
    onChange(text);
  };

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.left}>
        <Icon name="search-outline" size={25} color="#373d41" />
        <TextInput
          placeholder={placeholder}
          style={styles.placeholderText}
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
    backgroundColor: '#f3f2e9',
    padding: 15,
    borderRadius: 7,
  },
  left: {flexDirection: 'row', alignItems: 'center', gap: 10},
  placeholderText: {
    color: 'black',
    fontSize: 30,
    flex: 1,
  },
});
