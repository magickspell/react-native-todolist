import React, {useState} from "react";
import {Button, Pressable, View, Text, Alert, Modal, StyleSheet, TextInput} from "react-native";
import {addTodo, filterTodos} from "../store/slice";
import {styles} from '../styles/popup.styles'
import {useAppDispatch} from "../store/hooks";

export const Popup = (props: any) => {
    //const [modalVisible, setModalVisible] = useState(false);

    const dispatch = useAppDispatch()

    let [title, setTitle] = useState(``)
    let [text, setText] = useState(``)

    return (
        <View style={styles.centeredView}>
            <Modal
                //animationType="slide"
                transparent={true}
                //style={styled.popup_wrapper}
                visible={props.modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    props.setModalVisible(!props.modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{fontSize: 20}}>Добавить задание</Text>
                        <Text style={styles.modalText}>Укажите заголовок и задание</Text>
                        <TextInput
                            placeholder={"Заголовок"}
                            placeholderTextColor={"gray"}
                            style={styles.input}
                            onChangeText={setTitle}
                            value={title}
                        />
                        <TextInput
                            placeholder={"Задание"}
                            placeholderTextColor={"gray"}
                            style={styles.input}
                            onChangeText={setText}
                            value={text}
                        />
                        <View style={{display: "flex", flexDirection: "row", justifyContent: "center", width: 300}}>
                            <Button
                                title={"Отмена"}
                                onPress={() => props.setModalVisible(false)}
                                color={"gray"}
                            />
                            <Button
                                title={"Сохранить"}
                                onPress={
                                    () => {
                                        dispatch(addTodo({title: title, text: text}))
                                        dispatch(filterTodos({type: props.filterType}))
                                        props.setModalVisible(false);
                                    }
                                }
                            />
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};
