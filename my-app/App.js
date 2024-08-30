import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withDelay,
  interpolateColor,
} from "react-native-reanimated";
import { View, Button, Text } from "react-native";
import { useEffect, useState } from "react";

export default function AnimatedView(props) {
  // Animación de deslizamiento vertical
  const animationValue = useSharedValue(-200);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: animationValue.value }],
  }));

  // Animación de cambio de color de fondo
  const sv = useSharedValue(0);
  const animatedBgStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      sv.value,
      [0, 1],
      ['#FF0000', '#0000FF'],
      'RGB',
      {
        gamma: 2.2,
      }
    ),
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    
  }));

  

  // Animación de desaparición del título
  const titleOpacityValue = useSharedValue(1);
  const animatedTitleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacityValue.value,
  }));
  [toogleTitle, setToogleTitle] = useState(true);

  // Configuración de animación
  const animationConfig = {
    duration: 900,
  };

  useEffect(() => {
    // Animación de deslizamiento vertical
    animationValue.value = withTiming(0, animationConfig);

    // Animación de cambio de color de fondo
    sv.value = withTiming(1, animationConfig);

    // Retrasar la animación en el momento en el que quieres que se detenga
    const delay = withDelay(500, withTiming(0, animationConfig));

    // Ejecutar la animación retrasada
    sv.value = delay;

    // Función de limpieza para detener la animación
    return () => {
      animationValue.value = -200;
      sv.value = 0;
      titleOpacityValue.value = 1;
    };
  }, []);

  const handlePress = () => {
    // Cambiar de color de fondo
    if (sv.value === 0) {
      sv.value = withTiming(1, animationConfig);
    } else if (sv.value === 1) {
      sv.value = withTiming(0, animationConfig);
    }

    if (toogleTitle) {
      setToogleTitle(false);
      // Desaparecer el título
      titleOpacityValue.value = withTiming(0, animationConfig);


    } else {
      setToogleTitle(true);
      // Aparecer el título
      titleOpacityValue.value = withTiming(1, animationConfig);
    }

  };

  return (
    <Animated.View
  style={animatedBgStyle
  }
>
    <View>

      <Animated.View style={[ animatedStyle, animatedTitleStyle]}>
        <Text style={styles.text}>TÍTULO</Text>
      </Animated.View>

      <Button
        title="INICIO"
        onPress={() => {
          // Acción al presionar el botón
          handlePress();
        }}
      />

   
    </View>
    </Animated.View>
  );
}

const styles = {
  text: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 100,

  },


};