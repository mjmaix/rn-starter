import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProps, withTheme } from '../core/ThemeProviderHoc';

const HomeScreen = ({ theme }: ThemeProps) => {
  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={[styles.text, { color: theme.color }]}>HOME</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold'
  }
});

export default withTheme(HomeScreen);
