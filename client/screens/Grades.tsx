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
import Performance from "../screens/Performance";

const ListScreen2 = () => {
  const route = useRoute<RouteProps>();
  const { sid } = route.params;
  const { cid } = route.params;
  const { type } = route.params;
  const [subject, setSubject] = useState<Subject[]>();
  const navigation = useNavigation();
  var Type = "";
  if (type === 0) {
    Type = "Assignment";
  } else if (type === 1) {
    Type = "Quiz";
  } else if (type === 2) {
    Type = "Midterm";
  } else if (type === 3) {
    Type = "Project";
  } else if (type === 4) {
    Type = "Final";
  }

  console.log(Type);

  console.log(sid);
  console.log(cid);
  console.log(type);

  useEffect(() => {
    Promise.all([
      axios.default.get(
        `http://192.168.113.185:3000/courseWork/allExams/${sid}/${cid}/${type}`
      ),
    ]).then(([{ data: subjectsResults }]) => {
      console.log("haaa", subjectsResults);
      if (subjectsResults) setSubject(subjectsResults);
    });
  }, []);

  const renderItem = ({ item }) => (
    <Card style={{ flex: 1, width: 100 }}>
      <Card.Title style={{ flex: 1 }}>
        {Type} No. {item.num}
      </Card.Title>
      <Card.Divider />

      <Text style={{ marginBottom: 10 }}>
        Grade: {item.grade} / {item.totalGrade}{" "}
      </Text>

    </Card>
  );

  return (
    <ImageBackground
      source={require("../assets/Purple-Black-Abstract-4K-Phone-Wallpaper.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <Text style={styles.setFontSizeOne}> {Type} Grades </Text>
      <View style={styles.container}>
        <View style={styles.space} />

        <FlatList
          data={subject}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />

        <Button
          onPress={() => {
            navigation.navigate("Performance", {
              sid: "5555",
              cid: cid, 
              type: type,
            });
          }}
          title="Get Performance"
          color="#0096FF"
        />
      </View>
    </ImageBackground>
  );

  type RouteParams = {
    sid: string;
    cid: string;
    type: number;
  };

  type RouteProps = {
    params: RouteParams;
    name: string;
    key: string;
  };

  type Subject = {
    _id: string;
    grade: number;
    num: number;
    title: string;
    totalGrade: number;
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
    color: "#FFFFFF",
    fontFamily: "sans-serif-medium",
  },
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
  CardStyle: {
    backgroundColor: "#000000",
  },
});

export default ListScreen2;
