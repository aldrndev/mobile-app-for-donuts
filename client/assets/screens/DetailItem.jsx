import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const DetailItem = ({ route, navigation }) => {
  const { item } = route.params;

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
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: item.imgUrl }} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.text}>Description: {item.description}</Text>
        <Text style={styles.text}>Price: {formatCurrency(item.price)}</Text>
        <Text style={styles.text}>Category: {item.Category.name}</Text>
        <Text style={styles.text}>Created: {formatDate(item.createdAt)}</Text>
        <Text style={styles.text}>Author: {item.User.email.split('@')[0]}</Text>

        <TouchableOpacity style={styles.button} onPress={backHandler}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    fontSize: 16,
    marginVertical: 5,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#F7E7C3',
    borderRadius: 15,
    shadowColor: '#FFA461',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#DC9A78',
    borderRadius: 7,
  },
  buttonText: {
    color: '#763627',
    fontSize: 16,
  },
});

export default DetailItem;
