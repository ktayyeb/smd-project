import { StyleSheet, Text, View, FlatList, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-native-elements";
import * as axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';

var today = new Date();
var day = today.getDay();
var dayNumber = today.getDate();
var month = today.getMonth();
var year = today.getFullYear();

console.log(day);
var Day = "Sunday";

if (day === 0) {
  Day = "Sunday";
} else if (day === 1) {
  Day = "Monday";
} else if (day === 2) {
  Day = "Tuesday";
} else if (day === 3) {
  Day = "Wednesday";
} else if (day === 4) {
  Day = "Thursday";
} else if (day === 5) {
  Day = "Friday";
} else if (day === 6) {
  Day = "Saturday";
}

const HomeScreen = () => {
  const [subject, setSubject] = useState<Subject[]>();

  useEffect(() => {
    Promise.all([axios.default.get(`http://192.168.113.185:3000/${Day}/`)]).then(
      ([{ data: subjectsResults }]) => {
        console.log("haaa", subjectsResults);
        if (subjectsResults) setSubject(subjectsResults);
      }
    );
  }, []);

  const renderItem = ({ item }) => (
    <Card>
      <Card.Title style={{ flex: 1 }}>{item.time}</Card.Title>
      <Card.Divider />

      <Text style={{ marginBottom: 10 }}> {item.name} </Text>

      <Card.Divider />
      <Text style={{ marginBottom: 10 }}> {item.room} </Text>
    </Card>
  );

  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../assets/Purple-Black-Abstract-4K-Phone-Wallpaper.jpg')} resizeMode="cover" style={styles.image}>
    <View style={styles.container}>
       
      <View style={styles.space} />
      <Text style={styles.setFontSizeOne}>
        {" "}
        {Day} {dayNumber}/{month}/{year}
      </Text>
      <View style={styles.space} />

      <Button
        style={styles.buttonStyle}
        onPress={() => {
          navigation.navigate("ChooseDay", {});
        }}
        title="Check Schedule for any day"
        color="#000000"
      />
      <View style={styles.space} />
      <Button
        style={styles.buttonStyle}
        onPress={() => {
          navigation.navigate("GPACalculator", {});
        }}
        title="GPA Calculator & Courses Grades"
        color="#000000"
      />
      <View style={styles.space} />

      <Text style={styles.setFontSizeOne}>Schedule For Today</Text>

      <FlatList
        data={subject}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      
    </View>
    </ImageBackground>
  );

  type Subject = {
    name: string;
    room: string;
    time: string;
  };
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center"
  },
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
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100, 
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
    resizeMode: "stretch",
    alignItems: "center",
  },
  searchInput: {
    width: 300,
    height: 40,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    padding: 10,
  },
  setFontSizeOne: {
    fontSize: 30, // Define font size here in Pixels
    left: 0,
    color: '#FFFFFF',
    fontFamily: 'sans-serif-medium'
  },
});

export default HomeScreen;
