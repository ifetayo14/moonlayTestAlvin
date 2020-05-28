import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class App extends Component{
  
  constructor(){
    super()
    this.state = {
      dataSource: [],
    }
  }
  
  renderItem = ({item}) => {
    return(
      <View style={styles.flatList}>
        <Image
          style={styles.avatarImg}
          source={{uri: item.avatar}} />
        <View style={styles.name}>
          <Text style={{fontSize: 23}}>
            {item.first_name} {item.last_name}
          </Text>
          <Text style={{fontSize: 15}}>
            {item.email}
          </Text>
          </View>
      </View>      
    )
  }

  componentDidMount(){
    const url = 'https://reqres.in/api/users?page=2'
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: responseJson.data
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render(){
    return(
        <View style={styles.container}>
          <View style={styles.header}>
            <FontAwesome5 style={styles.menuIcon} name={'bars'} solid/>
            <Text style={styles.headerTitle}>Contacts</Text>
            <FontAwesome5 style={styles.searchIcon} name={'search'} solid/>
         </View>
          <FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
          />
          <TouchableOpacity style={styles.fab}>
            <FontAwesome5 style={styles.fabContent} name={'plus'} solid/>
          </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarImg: {
    width: 90,
    height: 90,
    margin: 5,
    marginLeft: 20,
    borderRadius: 200
  },
  flatList: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 3
  },
  name: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20
  },
  email: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    backgroundColor: '#e95280',
    height: 60,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: -25
  },
  menuIcon: {
    textAlign: 'left',
    marginTop: 15,
    marginLeft: 20,
    fontSize: 25,
    color: '#FFFFFF'
  },
  searchIcon: {
    textAlign: 'right',
    marginTop: -25,
    marginRight: 20,
    fontSize: 25,
    color: '#FFFFFF'
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#e95280',
    borderRadius: 50,
    bottom: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabContent: {
    color: '#FFFFFF',
    fontSize: 20
  }
})