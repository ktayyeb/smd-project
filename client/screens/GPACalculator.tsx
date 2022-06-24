import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import CourseGrade from "./CourseGrades";
import SelectDropdown from "react-native-select-dropdown";
import Transcript from "../screens/Transcript";

const GPACalculator = () => {
  const Grades = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
  ];
  const navigation = useNavigation();
  const [subject, setSubject] = useState<Subject[]>();
  const [gpaGrade, setGPAGrade] = useState("");

  useEffect(() => {
    Promise.all([
      axios.get(`http://192.168.113.185:3000/courseWork/allCourses/5555/`),
    ]).then(([{ data: subjectsResults }]) => {
      console.log("haaa", subjectsResults);
      if (subjectsResults) setSubject(subjectsResults);
    });
  }, []);

  // const handleGPA = async () => {
  //   console.log(gpaGrade);
  //   await axios
  //     .post("http://192.168.113.185:3000/courseWork/newCourse", {
  //       sid: 1500,
  //         Grade: Number(gpaGrade),
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       if (response.data.message == undefined) {
  //         alert("Grade Submitted!");
  //       } else {
  //         alert("Please Choose a Grade!");
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // };

  const renderItem = ({ item }) => (
    <>
      
      <Button
        style={styles.buttonStyle}
        onPress={() => {
          navigation.navigate("CourseGrades", {
            term: item.title,
            id: item.cid,
          });
        }}
        title={item.title}
        color="#000000"
      />

      <View style={styles.space} />
      <View style={styles.space} />

     

      {/* <Text style={styles.setFontSizeOne}> GPA: {item.GPA} </Text> */}
    </>
  );

  return (
    <ImageBackground
      source={require("../assets/Purple-Black-Abstract-4K-Phone-Wallpaper.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.space} />
      <Text style={styles.setFontSizeOne}> Add a Course </Text>
      <View style={styles.container}>
        <Button
          style={styles.buttonStyle}
          onPress={() => {
            navigation.navigate("Add_Course", {});
          }}
          title="Add"
          color="#000000"
        />
        <View style={styles.space} />
        <Text style={styles.setFontSizeOne}> Courses Added </Text>

        <FlatList
          data={subject}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
         <View style={styles.space} />
      </View>

      <Text style={styles.setFontSizeOne}>Transcript </Text>
      <Button
        onPress={() => {
          navigation.navigate("Transcript", {
            sid: "5555",
          });
        }}
        title="Go To Transcript"
        color="#000000"
      />
    </ImageBackground>
  );

  type Subject = {
    _id: string;
    cid: number;
    title: string;
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
  input: {
    height: 40,
    width: 310,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "white",
    backgroundColor: "#000000",
    borderRadius: 20,
    borderColor: "#404040",
  },
  container: {
    flex: 1,
    justifyContent: "center",
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
    color: "white",
    fontSize: 30, // Define font size here in Pixels
    left: 0,
  },
});

export default GPACalculator;
