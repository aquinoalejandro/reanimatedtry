import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withRepeat,
} from "react-native-reanimated";
import { View, Button, Text } from "react-native";
import { useEffect } from "react";

export default function App(props) {
  //Animacion de Deslizamiento Horizontal
  const defaultAnim = useSharedValue(200);
  const animatedDefault = useAnimatedStyle(() => ({
    transform: [{ translateX: defaultAnim.value }],
  }));


  const config = {
    duration: 900,
  };

  
  useEffect(() => {

    defaultAnim.value = withRepeat(
      withTiming(-defaultAnim.value, {
        config,
      }),
      -1,
      true
    );
    
  }, []);


  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "blue", 

      }}
    >
      <Animated.View style={[styles.box, animatedDefault]}>
        <Text style={styles.text}>TITULO</Text>
      </Animated.View>


      <Animated.View    />
      <Button
        title="INICIO"
        onPress={() => {

        }}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  box: {
    height: 80,
    width: 80,
    margin: 20,
    borderWidth: 1,
    borderColor: '#b58df1',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#b58df1',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});