import { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const [items, setItems] = useState([]);

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://isproject.my.id/user/items');
        const data = await response.json();
        const newData = [1, 2, 5, 13, 12];
        const selectedItems = newData.map((index) => data.data[index]);
        setItems(selectedItems);
      } catch (error) {
        console.log('Error fetching items:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image
            source={{
              uri: 'https://cdn.app.jcodelivery.com/img/banner/banner-231004.webp',
            }}
            style={styles.bannerImage}
          />
          <Text style={styles.title}>BEST SELLER</Text>
          <FlatList
            data={items}
            numColumns={2}
            renderItem={({ item }) => (
              <View key={item.id} style={styles.card}>
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

export default HomeScreen;
