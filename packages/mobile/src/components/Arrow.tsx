import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
//

const BaseArrow = ({ rotationStyle }: { rotationStyle: any }) => {
  return (
    <View style={[styles.root, rotationStyle]}>
      <View style={styles.box}>
      <SimpleLineIcons name="menu" size={16} color="black"style={{transform: [{rotate: '90deg'}]}} />
      </View>
    </View>
  );
 
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  box:{
    width: 35,
    height: 25,
    backgroundColor: '#38EF7D',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0
  },
  rootRight: {
    transform: [{ rotate: '180deg' }],
  },
  rootLeft: {
    transform: [{ rotate: '0deg' }],
  },
  arrow: {
    position: 'absolute',
    height: 7,
    width: 2,
    backgroundColor: 'black',
  },
  top: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    bottom: '49%',
  },
  bottom: {
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    top: '49%',
  },
});

export const Left = (props: any) => <BaseArrow {...props} rotationStyle={styles.rootLeft} />;

export const Right = (props: any) => <BaseArrow {...props} rotationStyle={styles.rootRight} />;
