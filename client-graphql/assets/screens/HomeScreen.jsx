import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';
import { GET_ALL_ITEMS } from '../../queries';

const HomeScreen = () => {
  const { loading, error, data } = useQuery(GET_ALL_ITEMS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error! {error.message}</Text>;

  const newItems = [1, 2, 5, 13, 12];

  const selectedItem = newItems.map((index) => data.getAllItems[index]);

  const items = selectedItem;

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.centerImage}>
            <Image
              source={{
                uri: 'https://cdn.app.jcodelivery.com/img/banner/banner-231004.webp',
              }}
              style={styles.bannerImage}
            />
          </View>
          <Text style={styles.title}>BEST SELLER</Text>
          <FlatList
            data={items}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.imgUrl }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardPrice}>
                  {formatCurrency(item.price)}
                </Text>
              </View>
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
    width: '97%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
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
  centerImage: {
    alignItems: 'center',
  },
});

export default HomeScreen;
