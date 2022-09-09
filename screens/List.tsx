import React, {useEffect, useState} from "react"
import {View, Text, Alert, Button, Image, Pressable} from "react-native"
import {styles} from '../styles/styles'
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {addTodo, changeTodo, deleteTodo, filterTodos, setTodos} from "../store/slice";
import {Popup} from "../components/Popup";

export default function List() {

    const dispatch = useAppDispatch()

    let todos = useAppSelector(state => state.todos.todos)
    let filterType = useAppSelector(state => state.todos.filterType)
    let [filterTypeString, setFilterTypeString] = useState(filterType)
    useEffect(() => {
        switch (filterType) {
            case ('all'):
                setFilterTypeString(`все задания`)
                return ;
            case ('true'):
                setFilterTypeString(`выполненные задания`)
                return ;
            case ('false'):
                setFilterTypeString(`НЕ выполненные задания`)
                return ;
        }
    }, [filterType])

    useEffect(() => {
        dispatch(setTodos({type: `setup`}))
    }, [])

    const filterAlert = () =>
        Alert.alert(
            "",
            "",
            [
                {
                    text: "Показать все задания",
                    onPress: () => dispatch(filterTodos({type: `all`})),
                },
                {
                    text: "Выполненные",
                    onPress: () => dispatch(filterTodos({type: `true`})),
                },
                {
                    text: "Не выполненные",
                    onPress: () => dispatch(filterTodos({type: `false`})),
                }
            ]
        );

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            {
                (modalVisible)
                    ? <Popup
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        filterType = {filterType}
                    />
                    : <Text></Text>
            }
            <View style={styles.wrapper}>
                <Pressable
                    onPress={filterAlert}
                    style={styles.wrapper__btn_show}
                >
                    <Text
                        style={{color: "rgba(47, 130, 201, 1)"}}
                    >
                        {`Показывать ${filterTypeString}`}
                    </Text>
                </Pressable>

                {
                    (todos.length === 0)
                        ? <Text style={{textAlign: `center`, margin: 24, fontWeight: "500"}}>задач нет</Text>
                        : <View style={styles.wrapper__list}>
                            {
                                todos.map((i: any) => {
                                    return (
                                        <View
                                            key={`${i.title}-item-${i.id}`}
                                            style={styles.wrapper__list__item}
                                        >
                                            <View
                                                style={(i.status)
                                                    ? styles.wrapper__list__item__checkbox_select
                                                    : styles.wrapper__list__item__checkbox
                                                }
                                                onTouchStart={() => {
                                                    dispatch(changeTodo({id: i.id}))
                                                }}
                                            >
                                                {(i.status)
                                                    ? <Text
                                                        style={{
                                                            color: `white`, fontSize: 20, fontStyle: `italic`,
                                                            display: `flex`, alignItems: "center", justifyContent: `center`
                                                        }}
                                                    >V</Text>
                                                    : <Text></Text>
                                                }
                                            </View>

                                            <View
                                                key={`${i.title}-content-${i.id}`}
                                                style={styles.wrapper__list__item__content}
                                            >
                                                <View
                                                    key={`${i.title}-title-${i.id}`}
                                                    style={styles.wrapper__list__item__title}
                                                >
                                                    <Text
                                                        key={`${i.title}-title-text-${i.id}`}
                                                        style={styles.wrapper__list__item__title}
                                                    >
                                                        {i.title}
                                                    </Text>
                                                </View>
                                                <View
                                                    key={`${i.title}-text-${i.id}`}
                                                    style={styles.wrapper__list__item__text}
                                                >
                                                    <Text
                                                        key={`${i.title}-text-text-${i.id}`}
                                                        style={(!i.status) ? {fontSize: 13} : {
                                                            fontSize: 13,
                                                            textDecorationLine: "line-through",
                                                            color: `lightgray`
                                                        }}
                                                    >{i.text}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View
                                                key={`${i.title}-delete-${i.id}`}
                                                style={styles.wrapper__list__item__delete}
                                                onTouchStart={() => {
                                                    dispatch(deleteTodo({id: i.id}))
                                                }}
                                            >
                                                <Image
                                                    style={styles.wrapper__list__item__delete__img}
                                                    source={require("../assets/trash.png")}
                                                />
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                }

                <Pressable
                    style={styles.wrapper__btn_add}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={{color: "white"}}>
                        Добавить
                    </Text>
                </Pressable>
            </View>
        </>
    )
}
