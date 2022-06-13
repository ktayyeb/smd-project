import { Image, SafeAreaView, StyleSheet, Text, TextInput, View, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import NavOptions from '../components/NavOptions';
import {  Card , Button, Icon } from "react-native-elements";
import * as axios from "axios";
import ChooseDay from '../screens/ChooseDay'
import { useNavigation, useRoute } from "@react-navigation/native";


const HomeScreen = () => {


  const renderItem = ({ item }) => (
    
    <Card>
      <Card.Title style={{flex:1}}>{item.time}
     
      </Card.Title>
      <Card.Divider />

      <Text style={{ marginBottom: 10,}}> {item.name}  </Text>
     
      <Card.Divider />
      <Text style={{ marginBottom: 10,}}> {item.room}  </Text>
    </Card>


  );

  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
     <Button style={styles.buttonStyle}
        onPress={() => {navigation.navigate('Add_Course', {
          });
        }}
        title="Add Course"
        color="#000000"
      />
       <View style={styles.space} /> 
       <Button
        title="Get GPA"
        color="#000000"
      />

    </View>
  );

  
}


const styles = StyleSheet.create({
   space: {
    width: 20, // or whatever size you need
    height: 20,
    },
  input: {
    height: 40,
    width: 310,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "white",
    backgroundColor: "#282828",
    borderRadius: 20,
    borderColor: "#404040",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tinyLogo: {
    width: 210,
    height: 70,
    padding: 10, 
  },
  buttonStyle: {
    marginHorizontal: 20,
    marginTop: 5,
    textDecorationColor: "blue",
    alignItems: "center",
  },
  view: {
    margin: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center'
},
searchInput: {
  width: 300,
  height: 40,
  backgroundColor: '#fff',
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 15,
  fontSize: 16,
  padding: 10, 
},
});

export default HomeScreen