import { useRoute } from "@react-navigation/native";
import * as axios from "axios";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { View,  StyleSheet, Image, FlatList, Alert, ImageBackground } from "react-native";
import { Text, Card } from "react-native-elements";
import { white } from "react-native-paper/lib/typescript/styles/colors";

const ListScreen2 = () => {
  const route = useRoute<RouteProps>();
  const { term } = route.params;
  const [subject, setSubject] = useState<Subject[]>();

  useEffect(() => {
    Promise.all([
      axios.default.get(`http://192.168.100.11:3000/${term}/`),
    ]).then(([{ data: subjectsResults }]) => {
      console.log("haaa", subjectsResults);
      if (subjectsResults) setSubject(subjectsResults);
    });
  }, []);

  const renderItem = ({ item }) => (
    <Card style={{ flex: 1, width: 100 }}>
      <Card.Title style={{ flex: 1 }}>{item.time}</Card.Title>
      <Card.Divider />

      <Text style={{ marginBottom: 10 }}> {item.name} </Text>

      <Card.Divider />
      <Text style={{ marginBottom: 10 }}> {item.room} </Text>
    </Card>
  );

  return (
    <ImageBackground
      source={require("../assets/Purple-Black-Abstract-4K-Phone-Wallpaper.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
    <View style={styles.container}>
      <View style={styles.space} />
      <Text style={styles.setFontSizeOne}> {term} </Text>
      <View style={styles.space} />

      <FlatList
        data={subject}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
    </ImageBackground>
  );

  type RouteParams = {
    term: string;
  };

  type RouteProps = {
    params: RouteParams;
    name: string;
    key: string;
  };

  type Subject = {
    name: string;
    room: string;
    time: string;
  };
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  setFontSizeOne: {
    fontSize: 30, // Define font size here in Pixels
    left: 0,
    color: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  CardStyle: {
    backgroundColor: "#000000",
  },
});

export default ListScreen2;
