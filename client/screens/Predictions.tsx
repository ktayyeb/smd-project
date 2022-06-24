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
  
  const [subject, setSubject] = useState<Subject[]>();
  const navigation = useNavigation();
  
  console.log(sid);
  console.log(cid);
  

  useEffect(() => {
    Promise.all([
      axios.default.get(
        `http://192.168.100.25:3000/courseWork/maxFinal/${sid}/${cid}/`
      ),
    ]).then(([{ data: subjectsResults }]) => {
      console.log("haaa", subjectsResults);
      if (subjectsResults) setSubject(subjectsResults);
    });
  }, []);

  const renderItem = ({ item }) => (
    <Card style={{ flex: 1, width: 100 }}>
      <Card.Title style={{ flex: 1 }}>
        To get {item.letter} you need:
      </Card.Title>
      <Card.Divider />

      <Text style={{ marginBottom: 10 }}>
        {item.percent}% of the final exam
      </Text>

    </Card>
  );

  return (
    <ImageBackground
      source={require("../assets/Purple-Black-Abstract-4K-Phone-Wallpaper.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <Text style={styles.setFontSizeOne}> Predictions </Text>
      <View style={styles.container}>
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
    sid: string;
    cid: string;
    
  };

  type RouteProps = {
    params: RouteParams;
    name: string;
    key: string;
  };

  type Subject = {
    letter:string;
    percent:number;
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
