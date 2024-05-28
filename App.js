import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, Button, ScrollView, Modal, useWindowDimensions } from 'react-native';
import TaskCard from './components/TaskCard';
import TasksContext from './components/TasksContext';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {

  const { windowHeight, windowWidth } = useWindowDimensions();
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToAdd, setTaskToAdd] = useState("");

  function handleAddTask() {
    let tasksArr = tasks;
    tasksArr.push(taskToAdd);
    setTasks(() => tasksArr);
    // setSecureStore(); // persist tasks to secure storage
    setTaskToAdd(""); // reset task to be added
    setModalVisible(!modalVisible);
  }

  // async function setSecureStore() {
  //   await SecureStore.setItemAsync("tasks", JSON.stringify(tasks));
  //   // console.log(test);
  // }

  // useEffect(() => {
  //   setSecureStore();
  // }, [])


  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0.5,1.5)', 'transparent']}
        style={styles.background}
      />
      <Text style={styles.title}>To-Do</Text>
      <TasksContext.Provider value={tasks}>
        <ScrollView style={{ width: '90%', }}>
          {tasks.map(task => {
            return <TaskCard key={Math.random() * 1000} taskToDisplay={task} setTasks={setTasks} />
          })}
        </ScrollView>
      </TasksContext.Provider>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput placeholder="Enter task here" onChangeText={task => setTaskToAdd(task)} style={styles.input}></TextInput>
            <View style={styles.modalWindowOptions}>
              <Pressable
                style={[styles.button, styles.buttonClose, { marginRight: 10 }]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleAddTask()}>
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpenAddTask,]}
        onPress={() => setModalVisible(true)}>
        <Text style={[styles.textStyle, styles.modalText]}>Add Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: '10%',
    backgroundColor: '#1C2770',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  title: {
    fontSize: '50%',
    fontWeight: "bold",
    padding: '10%',
    color: 'white',
    textAlign: 'center',
  },
  input: {
    borderColor: '#ABD2EF',
    borderWidth: 2,
    height: '60%',
    width: '85%',
    fontSize: '20%',
    textAlign: 'center',
    backgroundColor: 'white',
  },

  addTask: {
    flexDirection: 'row',
    // automaticallyAdjustKeyboardInsets: 'true',

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#C0E4FF',
    borderRadius: 20,
    padding: '5%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: '20%',

  },
  button: {
    borderRadius: 20,
    padding: 10,
    // elevation: 2,
  },
  buttonOpenAddTask: {
    backgroundColor: '#86CBFF',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: '80%',
    height: '8%',
    marginBottom: '1%',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginHorizontal: 10,
  },
  modalText: {
    marginTop: '4%',
    textAlign: 'center',
    fontSize: '20%',
    textAlignVertical: 'center',
  },
  modalWindowOptions: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 0,
  }
});


