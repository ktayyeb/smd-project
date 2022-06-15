import { useRoute } from "@react-navigation/native";
import * as axios from "axios";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  ImageBackground,
} from "react-native";
import { Text, Card } from "react-native-elements";
import { white } from "react-native-paper/lib/typescript/styles/colors";

const ListScreen2 = () => {
  const route = useRoute<RouteProps>();
  const { sid } = route.params;
  const { cid } = route.params;
  const { type } = route.params;
  const [subject, setSubject] = useState<Subject[]>();

  var Type = "";

  if (type === 0) {
    Type = "Assignment Grades";
  } else if (type === 1) {
    Type = "Quiz Grades";
  } else if (type === 2) {
    Type = "Midterm Grades";
  } else if (type === 3) {
    Type = "Project Grades";
  } else if (type === 4) {
    Type = "Final Grades";
  }

  useEffect(() => {
    Promise.all([
      axios.default.get(
        `http://192.168.100.11:3000/courseWork/assessments/${sid}/${cid}/${type}`
      ),
    ]).then(([{ data: subjectsResults }]) => {
     
      if (subjectsResults) setSubject(subjectsResults);
    });
  }, []);


  const renderItem = ({ item }) => (
    <Card style={{ flex: 1, width: 100 }}>
      <Card.Title style={{ flex: 1 }}> Assignment {item.num}</Card.Title>
      <Card.Divider />

      <Text style={{ marginBottom: 10 }}>
        {" "}
        {item.grade} / {item.totalGrade}{" "}
      </Text>
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
        <Text style={styles.setFontSizeOne}> {Type} </Text>
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
    _id: string;
    cid: number;
    title: string;
    grade: number;
    totalGrade: number;
    num: number;
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
