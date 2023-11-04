import * as React from 'react';
import {Text, View, StyleSheet, FlatList, SafeAreaView} from 'react-native';

import {useAppSelector, useData} from '../../services/hooks';
import {selectUser} from '../../redux/reducers/user';
import {User} from '../../domain/User';
import UserItem from '../components/UserItem';

export const ITEM_HEIGHT = 100;

const UsersScreen = () => {
  const data = useData('https://dummyjson.com/users');

  if (data)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>All Users</Text>
        <FlatList
          data={data?.users}
          renderItem={({item}) => <UserItem item={item} />}
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
