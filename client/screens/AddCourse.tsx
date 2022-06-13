import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import NavOptions from "../components/NavOptions";
import { Card, Button, Icon } from "react-native-elements";
import  axios from "axios";
import ChooseDay from "../screens/ChooseDay";
import { useNavigation, useRoute } from "@react-navigation/native";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState<Subject[]>();
  const [text, onChangeText] = useState("");
//   const [, onChangeText] = React.useState("Useless Text");
  const [courseID, setCourseID] = useState(""); 
  const [creditHour, setCreditHour] = React.useState(null);
  const [assignmentWeight, setAssignmentWeight] = React.useState(null);
  const [assignmentBest, setAssignmentBest] = React.useState(null);
  const [assignmentNumber, setAssignmentNumber] = React.useState(null);

  const [quizWeight, setQuizWeight] = React.useState(null);
  const [quizBest, setQuizBest] = React.useState(null);
  const [quizNumber, setQuizNumber] = React.useState(null);

  const [projectWeight, setProjectWeight] = React.useState(null);
  const [projectBest, setProjectBest] = React.useState(null);
  const [projectNumber, setProjectNumber] = React.useState(null);

  const [midtermWeight, setMidtermWeight] = React.useState(null);
  const [midtermBest, setMidtermBest] = React.useState(null);
  const [midtermNumber, setMidtermNumber] = React.useState(null);

  const [finalWeight, setFinalWeight] = React.useState(null);
  const [finalBest, setFinalBest] = React.useState(null);

  const api = axios.create({
    baseURL: `http://localhost:3000/courseWork`
})
 
 
 const createCourse = async () =>{ 
     console.log("ya khaled ya 3alamy")
     let res = await api .post('/newCourse',{cid:Number(courseID)});
     console.log(res); 
 }; 


 const handleClick = async () => {
  
  console.log("ay zeft");
  console.log(courseID);
  await axios.post('http://192.168.100.25:3000/courseWork/newCourse', { cid: Number(courseID)})
  .then(response => console.log(response.data)).catch(error => console.log(error));
};


 const handleId = (e: { target: { value: any; }; }) => {
  setCourseID(e.target.value)
  console.log(e.target.value)

 }

 





  const renderItem = ({ item }) => (
    <Card>
      <Card.Title style={{ flex: 1 }}>{item.time}</Card.Title>
      <Card.Divider />

      <Text style={{ marginBottom: 10 }}> {item.name} </Text>

      <Card.Divider />
      <Text style={{ marginBottom: 10 }}> {item.room} </Text>
    </Card>
  );

  // (newCourseID: number) => {setCourseID(newCourseID); console.log(newCourseID)}

  const navigation = useNavigation();

  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <Text style={styles.setFontSizeOne}> Course Details </Text>
        <View style={{ flexDirection: "row", flex: 1 }}>
            <TextInput
            style={styles.input}
            onChangeText={ (text: string) => setCourseID(text)}
            value={courseID}
            placeholder="useless placeholder"
            keyboardType="numeric"
            />
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => console.log(text)}
            value={text}
          />

          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
      </View>

      <View>
        <Text style={styles.setFontSizeOne}> Assignments </Text>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />

          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
      </View>

      <View>
        <Text style={styles.setFontSizeOne}> Quiz </Text>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />

          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
      </View>

      <View>
        <Text style={styles.setFontSizeOne}> Projects </Text>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />

          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
      </View>

      <View>
        <Text style={styles.setFontSizeOne}> Midterm </Text>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>

        <View>
          <Text style={styles.setFontSizeOne}> Final </Text>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
            />
          </View>
        </View>
      </View>

      <Button
        title="Press me"
        onPress={handleClick}
      />


    </ScrollView>
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
  scrollView: {
    marginHorizontal: 20,
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  input: {
    height: 40,
    width: 100,
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
    // marginHorizontal: 16,
    // alignItems: 'stretch',
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
  },
});

export default HomeScreen;
