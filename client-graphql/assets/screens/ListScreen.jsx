import { useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_ALL_ITEMS } from '../../queries';

const ListScreen = ({ navigation }) => {
  const [refresh, setRefresh] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_ALL_ITEMS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error! {error.message}</Text>;

  const items = data.getAllItems;

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  const onRefresh = async () => {
    setRefresh(true);
    try {
      await refetch();
    } catch (error) {
      console.error(error);
    }
    setRefresh(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>ALL ITEMS</Text>
          <FlatList
            data={items}
            numColumns={2}
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate('Detail Item', { itemId: item.id })
                }
              >
                <Image source={{ uri: item.imgUrl }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardPrice}>
                  {formatCurrency(item.price)}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#F7E7C3',
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
    padding: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  cardTitle: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  cardPrice: {
    color: 'grey',
    marginTop: 5,
    fontSize: 15,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#763627',
    padding: 15,
  },
});
export default ListScreen;
