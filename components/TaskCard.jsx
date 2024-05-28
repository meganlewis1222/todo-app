import { StyleSheet, TextInput, View, Pressable, Modal, Text } from "react-native";
import { useContext, useState } from "react";
import TasksContext from "./TasksContext";
import * as SecureStore from 'expo-secure-store';

function TaskCard(props) {

    const tasks = useContext(TasksContext);
    // const tasks = async () => {
    //     const list = await SecureStore.getItemAsync("tasks");
    //     return list;
    // }
    const [editTask, setEditTask] = useState("");

    function handleDelete() {
        const tasksAfterDelete = tasks.filter(task => task !== props.taskToDisplay);
        props.setTasks(tasksAfterDelete);
    }

    function handleEdit() {
        const newTaskList = tasks;
        newTaskList[newTaskList.indexOf(props.taskToDisplay)] = editTask;
        props.setTasks(newTaskList);

    }

    return (
        <View style={[styles.card, props.style,]}>
            <TextInput onChangeText={editedTask => {
                setEditTask(editedTask);
            }} onSubmitEditing={() => handleEdit()} style={styles.font}>{props.taskToDisplay} </TextInput>
            <Pressable onPress={() => handleDelete()} style={styles.delete}><Text style={{ color: 'white', fontWeight: 'bold', }}>Delete</Text></Pressable>
        </View>
    )
}

export default TaskCard

const styles = StyleSheet.create({
    card: {
        padding: 16,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: '#3161B3',
        borderWidth: "3%",
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',
        alignContent: 'center',
    },
    delete: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: 'red',
        position: 'absolute',
        right: '1%',
        bottom: '40%',
        backgroundColor: '#0E2183',

    },
    font: {
        fontSize: '20%',

    }
})