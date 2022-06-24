import { useRoute } from "@react-navigation/native";
import * as axios from "axios";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  ImageBackground,
  Button,
} from "react-native";
import { Text, Card } from "react-native-elements";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import GPA from "../screens/GPA";

const ListScreen2 = () => {
  const route = useRoute<RouteProps>();
  const { sid } = route.params;
  const [subject, setSubject] = useState<Subject[]>();
  const navigation = useNavigation();

  useEffect(() => {
    Promise.all([
      axios.default.get(
        `http://192.168.113.185:3000/courseWork/allScores/${sid}/`
      ),
    ]).then(([{ data: subjectsResults }]) => {
      console.log("haaa", subjectsResults);
      if (subjectsResults) setSubject(subjectsResults);
    });
  }, []);

  const renderItem = ({ item }) => (
    <Card style={{ flex: 1, width: 100 }}>
      <Card.Title style={{ flex: 1 }}>{item.title}</Card.Title>
      <Card.Divider />

      <Text style={{ marginBottom: 10 }}>Credit Hours: {item.hours} </Text>

      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>Result: {item.result} </Text>

      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>Numeric Grade: {item.numeric} </Text>
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
        <Text style={styles.setFontSizeOne}> Courses Grades</Text>

        <View style={styles.space} />

        <FlatList
          data={subject}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />

        <View style={styles.space} />

        <Button
          onPress={() => {
            navigation.navigate("GPA", {
              sid: "5555",
            });
          }}
          title="Get your GPA"
          color="#0096FF"
        />
      </View>
    </ImageBackground>
  );

  type RouteParams = {
    sid: string;
  };

  type RouteProps = {
    params: RouteParams;
    name: string;
    key: string;
  };

  type Subject = {
    title: string;
    hours: number;
    result: string;
    numeric: number;
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
