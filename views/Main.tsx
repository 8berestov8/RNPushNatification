import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import Card from '../components/Card';

export const MainScreen = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Main</Text>
        </Card>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  card: {
    height: 200,
    width: '100%',
    backgroundColor: '#f18484',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
