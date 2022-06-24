import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Card } from "react-native-elements";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";
import Grades from "../screens/Grades";

const AddCourse = () => {
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

  // const handleGrade = async () => {
  //   console.log(gpaGrade);
  //   await axios
  //     .post("http://192.168.100.25:3000/courseWork/newCourse", {
  //       sid: 5555,
  //       Grade: Number(gpaGrade),
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

  const [gpaGrade, setGPAGrade] = useState("");

  const [assignmentGrade, setAssignmentGrade] = useState();
  const [assignmentTotalGrade, setAssignmentTotalGrade] = useState();

  const [quizGrade, setQuizGrade] = useState();
  const [quizTotalGrade, setQuizTotalGrade] = useState();

  const [projectGrade, setProjectGrade] = useState();
  const [projectTotalGrade, setProjectTotalGrade] = useState();

  const [midtermGrade, setMidtermGrade] = useState();
  const [midtermTotalGrade, setMidtermTotalGrade] = useState();

  const [finalGrade, setFinalGrade] = useState();
  const [finalTotalGrade, setFinalTotalGrade] = useState();

  const [gradeObtained, setGradeObtained] = useState("");

  const route = useRoute<RouteProps>();
  const { term } = route.params;
  const { id } = route.params;
  const [subject, setSubject] = useState<Subject[]>();
  

  useEffect(() => {
    Promise.all([axios.get(`http://192.168.100.25:3000/${term}/`)]).then(
      ([{ data: subjectsResults }]) => {
        if (subjectsResults) setSubject(subjectsResults);
      }
    );
  }, []);

  useEffect(() => {
    Promise.all([
      axios.get(`http://192.168.100.25:3000/courseWork/allCourses/5555/`),
    ]).then(([{ data: subjectsResults }]) => {
      if (subjectsResults) setSubject(subjectsResults);
    });
  }, []);

  useEffect(() => {
    Promise.all([axios.get(`http://192.168.100.25:3000/${id}/`)]).then(
      ([{ data: subjectsResults }]) => {
        if (subjectsResults) setSubject(subjectsResults);
      }
    );
  }, []);

  

  



  const handleAssignment = async () => {
    console.log(assignmentTotalGrade);
    await axios
      .post("http://192.168.100.25:3000/courseWork/assessment", {
        sid: 5555,
        cid: id,
        grade: Number(assignmentGrade),
        totalGrade: Number(assignmentTotalGrade),
        type: 0,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message == undefined) {
          alert("Assignment Grade Submitted!");
        } else if (
          response.data.message === "You inserted all of your assessments here!"
        ) {
          alert("You inserted all of your assignments !");
        } else {
          alert("Please fill the missing fields!");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleQuiz = async () => {
    console.log(assignmentTotalGrade);
    await axios
      .post("http://192.168.100.25:3000/courseWork/assessment", {
        sid: 5555,
        cid: id,
        grade: Number(quizGrade),
        totalGrade: Number(quizTotalGrade),
        type: 1,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message == undefined) {
          alert("Quiz Grade Submitted!");
        } else if (
          response.data.message === "You inserted all of your assessments here!"
        ) {
          alert("You inserted all of your quizez !");
        } else {
          alert("Please fill the missing fields!");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleProject = async () => {
    console.log(assignmentTotalGrade);
    await axios
      .post("http://192.168.100.25:3000/courseWork/assessment", {
        sid: 5555,
        cid: id,
        grade: Number(projectGrade),
        totalGrade: Number(projectTotalGrade),
        type: 3,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message == undefined) {
          alert("Project Grade Submitted!");
        } else if (
          response.data.message === "You inserted all of your assessments here!"
        ) {
          alert("You inserted all of your projects !");
        } else {
          alert("Please fill the missing fields!");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleMidterm = async () => {
    console.log(assignmentTotalGrade);
    await axios
      .post("http://192.168.100.25:3000/courseWork/assessment", {
        sid: 5555,
        cid: id,
        grade: Number(midtermGrade),
        totalGrade: Number(midtermTotalGrade),
        type: 2,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message == undefined) {
          alert("Midterm Grade Submitted!");
        } else if (
          response.data.message === "You inserted all of your assessments here!"
        ) {
          alert("You inserted all of your midterms!");
        } else {
          alert("Please fill the missing fields!");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleFinal = async () => {
    console.log(assignmentTotalGrade);
    await axios
      .post("http://192.168.100.25:3000/courseWork/assessment", {
        sid: 5555,
        cid: id,
        grade: Number(finalGrade),
        totalGrade: Number(finalTotalGrade),
        type: 4,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message == undefined) {
          alert("Final Grade Submitted!");
        } else if (
          response.data.message === "You inserted all of your assessments here!"
        ) {
          alert("You already inserted your final !");
        } else {
          alert("Please fill the missing fields!");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleGradeObtainted = async () => {
    console.log(gradeObtained);
    await axios
      .post("http://192.168.100.25:3000/courseWork/finalGrade", {
        sid: 5555,
        cid: id,
        result: gradeObtained,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message == undefined) {
          alert("Grade Submitted!");
        } else if (
          response.data.message === "Please complete filling your course work"
        ) {
          alert("Please complete filling your course work");
        } else {
          alert("The final grade for this course has been added before!");
        }
      })
      .catch((error) => console.log(error));
  };

  const renderItem = ({ item }) => (
    <Card style={{ flex: 1, width: 100 }}>
      <Card.Title style={{ flex: 1 }}>
        Overall Performance: {item.total}%
      </Card.Title>
    </Card>
  );

  const navigation = useNavigation();

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.setFontSizeTwo}> {term} Grades </Text>
        <View>
          <Text style={styles.setFontSizeOne}> Assignment </Text>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <TextInput
              style={styles.input}
              onChangeText={(text: string) => setAssignmentGrade(text)}
              value={assignmentGrade}
              placeholder="Grade"
              placeholderTextColor="#E0E0E0"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text: string) => setAssignmentTotalGrade(text)}
              value={assignmentTotalGrade}
              placeholder="Total Grade"
              placeholderTextColor="#E0E0E0"
              keyboardType="numeric"
            />
          </View>
          <Button
            style={styles.smallButton}
            title="Submit Assignment"
            onPress={handleAssignment}
          />
          <View style={styles.space} />
          <Button
            onPress={() => {
              navigation.navigate("Grades", {
                sid: "5555",
                cid: id,
                type: 0,
              });
            }}
            title="Check Assignment Grade"
            color="#000000"
          />
        </View>
        <View>
          <Text style={styles.setFontSizeOne}> Quiz </Text>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <TextInput
              style={styles.input}
              onChangeText={(text: string) => setQuizGrade(text)}
              value={quizGrade}
              placeholder="Grade"
              placeholderTextColor="#E0E0E0"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text: string) => setQuizTotalGrade(text)}
              value={quizTotalGrade}
              placeholder="Total Grade"
              placeholderTextColor="#E0E0E0"
              keyboardType="numeric"
            />
          </View>
          <Button
            style={styles.smallButton}
            title="Submit Quiz"
            onPress={handleQuiz}
          />
          <View style={styles.space} />
          <Button
            onPress={() => {
              navigation.navigate("Grades", {
                sid: "5555",
                cid: id,
                type: 1,
              });
            }}
            title="Check Quiz Grades"
            color="#000000"
          />
        </View>
        <View>
          <Text style={styles.setFontSizeOne}> Project </Text>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <TextInput
              style={styles.input}
              onChangeText={(text: string) => setProjectGrade(text)}
              value={projectGrade}
              placeholder="Grade"
              placeholderTextColor="#E0E0E0"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text: string) => setProjectTotalGrade(text)}
              value={projectTotalGrade}
              placeholder="Total Grade"
              placeholderTextColor="#E0E0E0"
              keyboardType="numeric"
            />
          </View>
          <Button
            style={styles.smallButton}
            title="Submit Project"
            onPress={handleProject}
          />
          <View style={styles.space} />
          <Button
            onPress={() => {
              navigation.navigate("Grades", {
                sid: "5555",
                cid: id,
                type: 3,
              });
            }}
            title="Check Project Grades"
            color="#000000"
          />
        </View>
        <View>
          <Text style={styles.setFontSizeOne}> Midterm </Text>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <TextInput
              style={styles.input}
              onChangeText={(text: string) => setMidtermGrade(text)}
              value={midtermGrade}
              placeholder="Grade"
              placeholderTextColor="#E0E0E0"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text: string) => setMidtermTotalGrade(text)}
              value={midtermTotalGrade}
              placeholder="Total Grade"
              placeholderTextColor="#E0E0E0"
              keyboardType="numeric"
            />
          </View>
          <Button
            style={styles.smallButton}
            title="Submit Midterm"
            onPress={handleMidterm}
          />
          <View style={styles.space} />
          <Button
            onPress={() => {
              navigation.navigate("Grades", {
                sid: "5555",
                cid: id,
                type: 2,
              });
            }}
            title="Check Midterm Grades"
            color="#000000"
          />
        </View>
        <View>
          <Text style={styles.setFontSizeOne}> Final </Text>

          <View style={styles.space} />
          <Button
            onPress={() => {
              navigation.navigate("Grades", {
                sid: "5555",
                cid: id,
                type: 4,
              });
            }}
            title="Check Final Grade"
            color="#000000"
          />
        </View>
        <View>
          <Text style={styles.setFontSizeOne}> Grade Obtained </Text>
          <View style={{ flexDFirection: "row", flex: 1 }}>
            <TextInput
              style={styles.input}
              onChangeText={(text: string) => setGradeObtained(text)}
              value={gradeObtained}
              placeholder="Enter Letter"
              placeholderTextColor="#E0E0E0"
            />
          </View>
          <Button
            style={styles.smallButton}
            title="Submit Grade Obtained"
            onPress={handleGradeObtainted}
          />
          <View style={styles.space} />
        </View>
        
        <View>
          <Text style={styles.setFontSizeOne}> Overall Performance </Text>
          <View style={styles.space} />
        </View>
        <Button
            style={styles.smallButton}
            title="Check Overall performance"
            onPress={() => {
              navigation.navigate("OverallPerformance", {
                sid: "5555",
                cid: id,
              });
            }}
          />

      <View>
          <Text style={styles.setFontSizeOne}> final Grade Predictions </Text>
          <View style={styles.space} />
        </View>
        <Button
            style={styles.smallButton}
            title="Check Predictions"
            onPress={() => {
              navigation.navigate("Predictions", {
                sid: "5555",
                cid: id,
              });
            }}
          />

        <View style={styles.space} />
      </ScrollView>
    </>
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
    width: 150,
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
  smallButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 100,
    height: 40,
    width: 100,
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
  setFontSizeTwo: {
    fontSize: 25, // Define font size here in Pixels
    left: 0,
    color: "#0000FF",
  },
});

export default AddCourse;
