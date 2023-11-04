import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';

import {useData, useAppDispatch} from '../../services/hooks';
import UserItem from '../components/UserItem';
import {useNavigation} from '@react-navigation/native';
import {User} from '../../domain/User';
import {setUser} from '../../redux/reducers/user';

export const ITEM_HEIGHT = 100;

const UsersScreen = () => {
  const data = useData('https://dummyjson.com/users');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onPressHandler = (item: User) => {
    navigation.navigate('UserDetail');
    dispatch(setUser(item));
  };

  if (data)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>All Users</Text>
        <FlatList
          data={data?.users}
          renderItem={({item}) => (
            <UserItem item={item} onPress={onPressHandler} />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: (ITEM_HEIGHT + 20) * index,
            index,
          })}
        />
      </View>
    );
};

export default UsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    paddingBottom: 0,
    gap: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});
