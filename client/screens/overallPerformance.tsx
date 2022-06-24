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
  
  const [overall, setOverall] = useState<Overall[]>();
  

  useEffect(() => {
    Promise.all([
      axios.get(`http://192.168.100.25:3000/courseWork/overallPerformance/5555/${cid}/`),
    ]).then(([{ data: overallResults }]) => {
        console.log(overall);
      if (overallResults) setOverall(overallResults);
    });
  }, []);



  console.log(sid);

  console.log(overall);

  const renderItem = ({ item }) => (
    <Card style={{ flex: 1, width: 100 }}>
      <Card.Title style={{ flex: 1 }}>
        Overall Performance: {item.total}%
      </Card.Title>
    </Card>
  );

  return (
    <ImageBackground
      source={require("../assets/Purple-Black-Abstract-4K-Phone-Wallpaper.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <Text style={styles.setFontSizeOne}> Overall Performance </Text>
        <View style={styles.space} />

        <View style={styles.space} />

        <FlatList
          data={overall}
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

  type Overall = {
    total: number;
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
