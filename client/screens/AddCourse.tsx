import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect} from "react";
import { Button } from "react-native-elements";
import axios from "axios";

const AddCourse = () => {
  const [courseName, setCourseName] = useState();
  const [courseID, setCourseID] = useState();
  const [creditHour, setCreditHour] = useState();

  const [assignmentWeight, setAssignmentWeight] = useState();
  const [assignmentBest, setAssignmentBest] = useState();
  const [assignmentNumber, setAssignmentNumber] = useState();

  const [quizWeight, setQuizWeight] = useState();
  const [quizBest, setQuizBest] = useState();
  const [quizNumber, setQuizNumber] = useState();

  const [projectWeight, setProjectWeight] = useState();
  const [projectBest, setProjectBest] = useState();
  const [projectNumber, setProjectNumber] = useState();

  const [midtermWeight, setMidtermWeight] = useState();
  const [midtermBest, setMidtermBest] = useState();
  const [midtermNumber, setMidtermNumber] = useState();

  const [finalWeight, setFinalWeight] = useState();
  const [finalNumber, setFinalNumber] = useState();



  const handleClick = async () => {
    console.log("===============================================================================================================")
    console.log(assignmentBest)
    await axios
      .post("http://192.168.100.11:3000/courseWork/newCourse", {
        sid: 1500,
        cid: Number(courseID),
        title: courseName,
        hours: Number(creditHour),
        assignments: {
          num: Number(assignmentNumber),
          weight: Number(assignmentWeight),
          best: Number(assignmentBest),
        },
        quizzes: {
          num: Number(quizNumber),
          weight: Number(quizWeight),
          best: Number(quizBest),
        },
        midterms: {
          num: Number(midtermNumber),
          weight: Number(midtermWeight),
          best: Number(midtermBest),
        },
        projects: {
          num: Number(projectNumber),
          weight: Number(projectWeight),
          best: Number(projectBest),
        },

        final: {
          num: Number(finalNumber),
          weight: Number(finalWeight),
          best: Number(finalNumber),
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message == undefined) {
          alert("Course Created Successfully!");
        } else {
          alert("Please fill the missing!");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <Text style={styles.setFontSizeOne}> Course Details </Text>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => setCourseName(text)}
            value={courseName}
            placeholder="Name"
            placeholderTextColor="#E0E0E0"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => setCourseID(text)}
            value={courseID}
            placeholder="ID"
            placeholderTextColor="#E0E0E0"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => setCreditHour(text)}
            value={creditHour}
            placeholder="Credit Hour"
            placeholderTextColor="#E0E0E0"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View>
        <Text style={styles.setFontSizeOne}> Assignments </Text>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => setAssignmentWeight(text)}
            value={assignmentWeight}
            placeholder="Weight"
            placeholderTextColor="#E0E0E0"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => setAssignmentBest(text)}
            value={assignmentBest}
            placeholder="Best of"
            placeholderTextColor="#E0E0E0"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => setAssignmentNumber(text)}
            value={assignmentNumber}
            placeholder="No. "
            placeholderTextColor="#E0E0E0"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View>
        <Text style={styles.setFontSizeOne}> Quiz </Text>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => setQuizWeight(text)}
            value={quizWeight}
            placeholder="Weight"
            placeholderTextColor="#E0E0E0"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => setQuizBest(text)}
            value={quizBest}
            placeholder="Best of"
            placeholderTextColor="#E0E0E0"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => setQuizNumber(text)}
            value={quizNumber}
            placeholder="No."
            placeholderTextColor="#E0E0E0"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View>
        <Text style={styles.setFontSizeOne}> Projects </Text>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => setProjectWeight(text)}
            value={projectWeight}
            placeholder="Weight"
            placeholderTextColor="#E0E0E0"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => setProjectBest(text)}
            value={projectBest}
            placeholder="Best of"
            placeholderTextColor="#E0E0E0"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => setProjectNumber(text)}
            value={projectNumber}
            placeholder="No. "
            placeholderTextColor="#E0E0E0"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View>
        <Text style={styles.setFontSizeOne}> Midterm </Text>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => setMidtermWeight(text)}
            value={midtermWeight}
            placeholder="Weight"
            placeholderTextColor="#E0E0E0"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => setMidtermBest(text)}
            value={midtermBest}
            placeholder="Best of"
            placeholderTextColor="#E0E0E0"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => setMidtermNumber(text)}
            value={midtermNumber}
            placeholder="No."
            placeholderTextColor="#E0E0E0"
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text style={styles.setFontSizeOne}> Final </Text>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <TextInput
              style={styles.input}
              onChangeText={(text: string) => setFinalWeight(text)}
              value={finalWeight}
              placeholder="Weight"
              placeholderTextColor="#E0E0E0"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text: string) => setFinalNumber(text)}
              value={finalNumber}
              placeholder="No."
              placeholderTextColor="#E0E0E0"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      <Button title="Submit Course" onPress={handleClick} />
    </ScrollView>
  );
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
    width: 102,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#FFFFFF",
    backgroundColor: "#282828",
    borderRadius: 10,
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

export default AddCourse;
