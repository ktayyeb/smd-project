import React from "react";
import { Button, SafeAreaView, StyleSheet, View, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ChooseDay = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
    source={require("../assets/Purple-Black-Abstract-4K-Phone-Wallpaper.jpg")}
    resizeMode="cover"
    style={styles.image}
  >
    <SafeAreaView>
      <Button
        onPress={() => {
          navigation.navigate("Schedule", {
            term: "Saturday",
          });
        }}
        title="Saturday"
        color="#0096FF"
       
      />
      <View style={styles.space} />
      <Button
        onPress={() => {
          navigation.navigate("Schedule", {
            term: "Sunday",
          });
        }}
        title="Sunday"
        color="#0096FF"
      />
      <View style={styles.space} />
      <Button
        onPress={() => {
          navigation.navigate("Schedule", {
            term: "Monday",
          });
        }}
        title="Monday"
        color="#0096FF"
      />
      <View style={styles.space} />
      <Button
        onPress={() => {
          navigation.navigate("Schedule", {
            term: "Tuesday",
          });
        }}
        title="Tuesday"
        color="#0096FF"
      />
      <View style={styles.space} />
      <Button
        onPress={() => {
          navigation.navigate("Schedule", {
            term: "Wednesday",
          });
        }}
        title="Wednesday"
        color="#0096FF"
      />
      <View style={styles.space} />
      <Button
        onPress={() => {
          navigation.navigate("Schedule", {
            term: "Thursday",
          });
        }}
        title="Thursday"
        color="#0096FF"
      />
    </SafeAreaView>
    </ImageBackground>
  );
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
});

export default ChooseDay;
