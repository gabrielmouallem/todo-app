import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useTodos} from './src/hooks/useTodos';
import {getDocs} from './src/services/firebase/firebase-service';
import LottieView from 'lottie-react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import space from './src/assets/space.json';
import loading from './src/assets/loading.json';

const App = () => {
  const {todos, loadDataCallback} = useTodos();
  const [load, setload] = useState(false);
  const isConect = useRef(false);
  const animateLottieLoad = useRef(null);

  useEffect(() => {
    loadDataCallback();
    getDocs()
      .then(res => console.log({res}))
      .catch(err => console.log({err}));
  }, []);

  useEffect(() => {
    console.log({todos});
  }, [todos]);

  useEffect(() => {
    if (isConect.current) {
      if (load) {
        animateLottieLoad.current.play(0, 44);
      }
      isConect.current = false;
    } else if (load === true) {
      animateLottieLoad.current.play();
      setTimeout(() => {
        animateLottieLoad.current.reset();
      }, 8000);
      isConect.current = true;
    }
  }, [load]);

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LottieView style={{}} source={space} resizeMode="center" autoPlay loop />
      <View>
        <TouchableOpacity style={{ paddingTop: 70, zIndex: 2}} onPress={() => setload(!load)}>
          <LottieView
            style={styles.sync}
            source={loading}
            autoPlay={false}
            loop={false}
            resizeMode="cover"
            ref={animateLottieLoad}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <FlatListBasics></FlatListBasics>
      </View>
    </SafeAreaView>
  );
};

const FlatListBasics = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {id: '0', todo: 'Estudar React Native'},
          {id: '1', todo: 'Ir ao cinema'},
          {id: '2', todo: 'Assistir Strange Things'},
          {id: '3', todo: 'Comprar laranjas'},
          {id: '4', todo: 'Dar banho no Atila'},
          {id: '5', todo: 'Assitir Quanto mais quente melhor'},
          {id: '6', todo: 'Estudar React Native'},
          {id: '7', todo: 'Ir ao cinema'},
          {id: '8', todo: 'Assistir Strange Things'},
          {id: '9', todo: 'Comprar laranjas'},
          {id: '10', todo: 'Dar banho no Atila'},
          {id: '11', todo: 'Assitir Quanto mais quente melhor'},
        ]}
        renderItem={({item}) => (
          <View style={styles.contentTodo}>
            <Text style={styles.item} keyExtractor={({item}) => item.id}>
              {item.todo}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
const DynamicList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {id: '0', todo: 'Estudar React Native'},
          {id: '1', todo: 'Ir ao cinema'},
          {id: '2', todo: 'Assistir Strange Things'},
          {id: '3', todo: 'Comprar laranjas'},
          {id: '4', todo: 'Dar banho no Atila'},
          {id: '5', todo: 'Assitir Quanto mais quente melhor'},
        ]}
        renderItem={({item}) => (
          <View style={styles.contentTodo}>
            <Text style={styles.item} keyExtractor={({item}) => item.id}>
              {item.todo}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sync: {
    width: 120,
    heigh: 150,
    paddingBottom: 0,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
  },
  contentTodo: {
    backgroundColor: '#8AD5C4',
    height: 50,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
  },
  item: {
    fontSize: 15,
    color: '#103930',
    fontWeight: 'bold',
  },
});

export default App;
