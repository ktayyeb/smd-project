import React from "react";
import { Button, SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ChooseDay = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Button
        onPress={() => {
          navigation.navigate("Schedule", {
            term: "Saturday",
          });
        }}
        title="Saturday"
        color="#000000"
      />
      <View style={styles.space} />
      <Button
        onPress={() => {
          navigation.navigate("Schedule", {
            term: "Sunday",
          });
        }}
        title="Sunday"
        color="#000000"
      />
      <View style={styles.space} />
      <Button
        onPress={() => {
          navigation.navigate("Schedule", {
            term: "Monday",
          });
        }}
        title="Monday"
        color="#000000"
      />
      <View style={styles.space} />
      <Button
        onPress={() => {
          navigation.navigate("Schedule", {
            term: "Tuesday",
          });
        }}
        title="Tuesday"
        color="#000000"
      />
      <View style={styles.space} />
      <Button
        onPress={() => {
          navigation.navigate("Schedule", {
            term: "Wednesday",
          });
        }}
        title="Wednesday"
        color="#000000"
      />
      <View style={styles.space} />
      <Button
        onPress={() => {
          navigation.navigate("Schedule", {
            term: "Thursday",
          });
        }}
        title="Thursday"
        color="#000000"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChooseDay;
