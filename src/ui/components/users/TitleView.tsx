import React, {ReactNode} from 'react';
import {Text, StyleSheet, TextProps} from 'react-native';
import {ThemeConstants} from '../../../libs/constants';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../../services/redux/reducers/themeApp';

interface TitleViewProps extends TextProps {
  children: ReactNode;
}

const TitleView = ({children, ...props}: TitleViewProps) => {
  const theme = useSelector(selectTheme);

  return (
    <Text
      style={[
        styles.container,
        {color: ThemeConstants[theme].fontColor},
        {...props},
      ]}>
      {children}
    </Text>
  );
};

export default TitleView;

const styles = StyleSheet.create({
  container: {
    fontWeight: 'bold',
    fontSize: 35,
    fontFamily: 'RobotoSlab-Bold',
  },
});
