import Schedule from "./screens/Schedule";
import ChooseDay from "./screens/ChooseDay";
import HomeScreen from "./screens/HomeScreen";
import GPACalculator from "./screens/GPACalculator";
import Add_Course from "./screens/AddCourse";
import CourseGrades from "./screens/CourseGrades";
import Transcript from "./screens/Transcript"
import Grades from "./screens/Grades";
import GPA from "./screens/GPA"
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          title: "UNIVERSITY HELPER",
        }}
      />
      <Stack.Screen
        name="ChooseDay"
        component={ChooseDay}
        options={{
          headerShown: true,
          title: "Choose Day",
        }}
      />
      <Stack.Screen
        name="GPACalculator"
        component={GPACalculator}
        options={{
          headerShown: true,
          title: "GPA Calculator & Courses Grades",
        }}
      />
      <Stack.Screen
        name="Schedule"
        component={Schedule}
        options={{
          headerShown: true,
          title: "Schedule",
        }}
      />
      <Stack.Screen
        name="Add_Course"
        component={Add_Course}
        options={{
          headerShown: true,
          title: "Add Course",
        }}
      />
      <Stack.Screen
        name="CourseGrades"
        component={CourseGrades}
        options={{
          headerShown: true,
          title: "Add Course Grades",
        }}
      />
      <Stack.Screen
        name="Grades"
        component={Grades}
        options={{
          headerShown: true,
          title: "Grades",
        }}
      />
      <Stack.Screen
        name="Transcript"
        component={Transcript}
        options={{
          headerShown: true,
          title: "Transcript",
        }}
      />
       <Stack.Screen
        name="GPA"
        component={GPA}
        options={{
          headerShown: true,
          title: "GPA",
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
