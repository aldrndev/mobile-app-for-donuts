import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';
import { GET_ITEM_DETAIL } from '../../queries';

const DetailItem = ({ route, navigation }) => {
  const { itemId } = route.params;

  const { loading, error, data } = useQuery(GET_ITEM_DETAIL, {
    variables: { itemDetailId: +itemId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error! {error.message}</Text>;

  const detailedItem = data.itemDetail;

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return `${day}/${month}/${year}`;
  };

  const backHandler = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Image source={{ uri: detailedItem.imgUrl }} style={styles.image} />
            <Text style={styles.title}>{detailedItem.name}</Text>
            <Text style={styles.text}>
              Description: {detailedItem.description}
            </Text>
            <Text style={styles.text}>
              Price: {formatCurrency(detailedItem.price)}
            </Text>
            <Text style={styles.text}>Ingredients:</Text>
            {detailedItem.Ingredients.map((ingredient, index) => (
              <Text style={styles.text} key={index}>
                {index + 1}. {ingredient.name}
              </Text>
            ))}
            <Text style={styles.text}>
              Category: {detailedItem.Category.name}
            </Text>
            <Text style={styles.text}>
              Created: {formatDate(detailedItem.createdAt)}
            </Text>
            <Text style={styles.text}>
              Author: {detailedItem.User.email.split('@')[0]}
            </Text>

            <TouchableOpacity style={styles.button} onPress={backHandler}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#763627',
  },
  text: {
    fontSize: 17,
    marginVertical: 4,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  card: {
    width: '100%',
    // backgroundColor: '#F7E7C3',
    borderRadius: 15,
    // shadowColor: '#FFA461',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 4,
    padding: 15,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#DC9A78',
    borderRadius: 7,
  },
  buttonText: {
    color: '#763627',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DetailItem;
