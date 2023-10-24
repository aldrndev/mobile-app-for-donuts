import { useEffect, useState } from 'react';
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

const ListScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://isproject.my.id/user/items');
      const data = await response.json();
      setItems(data.data);
    } catch (error) {
      console.log('Error fetching items:', error);
    }
  };

  const onRefresh = async () => {
    setRefresh(true);
    await fetchData();
    setRefresh(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => navigation.navigate('Detail Item', { item })}
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
    shadowColor: '#F7E7C3',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
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
  },
  cardPrice: {
    color: 'grey',
    marginTop: 5,
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
