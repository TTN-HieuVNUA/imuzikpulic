import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Text, View } from 'react-native';

import { Flex } from '../rebass';

function loop(duration: number, value: Animated.Value, from: number, to: number) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(value, {
        toValue: to,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(value, {
        toValue: from,
        duration,
        useNativeDriver: false,
      }),
    ])
  );
}
export const AnimatedEq = (props: { size: number; animated?: boolean }) => {
  const barWidth = Math.round((props.size * 3) / 13);
  const height1Anim = useRef(new Animated.Value(Math.round((props.size * 2) / 4))).current;
  const height2Anim = useRef(new Animated.Value(Math.round((props.size * 4) / 4))).current;
  const height3Anim = useRef(new Animated.Value(Math.round((props.size * 3) / 4))).current;

  useEffect(() => {
    const animation = Animated.parallel([
      loop(400, height1Anim, 2, props.size),
      loop(300, height2Anim, 2, props.size),
      loop(350, height3Anim, 2, props.size),
    ]);
    if (props.animated) {
      /* istanbul ignore next */
      animation.start();

      /* istanbul ignore next */
      return () => {
        animation.stop();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.animated, props.size]);

  return (
    <Flex
      flexDirection="row"
      height={props.size}
      width={props.size}
      alignItems="flex-end"
      justifyContent="space-between">
      <Animated.View
        style={{
          width: barWidth,
          borderRadius: Math.ceil(barWidth / 4),
          height: height1Anim,
          backgroundColor: 'white',
        }}
      />
      <Animated.View
        style={{
          width: barWidth,
          borderRadius: Math.ceil(barWidth / 4),
          height: height2Anim,
          backgroundColor: 'white',
        }}
      />
      <Animated.View
        style={{
          width: barWidth,
          borderRadius: Math.ceil(barWidth / 4),
          height: height3Anim,
          backgroundColor: 'white',
        }}
      />
    </Flex>
  );
};

export const CircleAvatar = (props: { imageUri?: string }) => {
  const [rotationValue, setRotationValue] = useState(new Animated.Value(0));
  useEffect(()=>{
    rotationAnimation();
  },[]);
  const rotationAnimation = () => {
    Animated.loop(
      Animated.timing(rotationValue, {
        toValue: 10000,
        duration: 1000000, useNativeDriver: false,
        easing: Easing.linear
      }),
    ).start();
  };

  const interpolateRotationAnimation = rotationValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0deg", "360deg"],
  });
  return(
    <View>
      <Animated.View
        style={[
          {width: 40,
            height: 40,
            borderRadius:20,
            alignItems:'center',
            justifyContent:'center'},
          { transform: [{ rotate: interpolateRotationAnimation }]}]}
      >
          <Image
            style={{height:40,width:40, borderRadius:20}}
            source={{uri:props.imageUri}}
          />
      </Animated.View>
    </View>
  )
}
