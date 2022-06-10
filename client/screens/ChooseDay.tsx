import React, { useState } from "react";
import { useEffect } from "react";
import * as axios from 'axios';
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Schedule from "./Schedule";
import NavOptions from '../components/NavOptions';
import { Title } from "react-native-paper";

const SearchResults = () => {

  const navigation = useNavigation() ; 
  return (
    <SafeAreaView>
      <Button
        onPress={() => {navigation.navigate('Schedule', {
          term : "Saturday"
            });
        }}
        title="Saturday"
        color="#000000"
      />
      <View style={styles.space} /> 
        <Button
        onPress={() => {navigation.navigate('Schedule', {
          term : "Sunday"
            });
        }}
        title="Sunday"
        color="#000000"
      />
      <View style={styles.space} /> 
      <Button
        onPress={() => {navigation.navigate('Schedule', {
          term : "Monday"
        });
      }}
        title="Monday"
        color="#000000"
      />
      <View style={styles.space} /> 
      <Button
        onPress={() => {navigation.navigate('Schedule', {
          term: "Tuesday"
        });
      }}
        title="Tuesday"
        color="#000000"
      />
      <View style={styles.space} /> 
      <Button
        onPress={() => {navigation.navigate('Schedule', {
          term: "Wednesday"
        });
      }}
          title="Wednesday"
          color="#000000"
        />
        <View style={styles.space} /> 
        <Button
        onPress={() => {navigation.navigate('Schedule', {
          term: "Thursday"
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type RouteParams = {
    term: string;
  };
  
  type RouteProps = {
    params: RouteParams
    name: string;
    key: string;
  };
  
type University = {
    name: string;
  }


export default SearchResults