import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export type TodoState = {
    id: number,
    title: string,
    text: string,
    status: boolean
}

export interface TodosState {
    todos: TodoState[],
    todosDefault: TodoState[],
    filterType: string | "all" | "true" | "false",
}

// initial state for todos
const initialState: TodosState = {
    filterType: `all`,
    todos: [
        {
            id: 1,
            title: `Математика`,
            text: `Стр. 4 , упр. 36 а, б.`,
            status: false
        },
        {
            id: 2,
            title: `Русский язык`,
            text: `Учебник, стр. 4 , упр. 36 а, б.`,
            status: true
        },
        {
            id: 3,
            title: `ИЗО`,
            text: `Подготовить клей, ножницы, вл. салфетки, цветную бумагу, ножницы, шерстняые нитки`,
            status: false
        },
        {
            id: 4,
            title: `Литература`,
            text: `Учебник, стр. 4 , упр. 36 а, б.`,
            status: true
        },
    ],
    todosDefault: []
}

// санки для ассинхронных вызовов
/*export const loginThunk = createAsyncThunk(
    'user/login',
    async (payload: any) => { // payload: any | requestLoginType
        try {
            return await api.method(...payload);
        } catch (e) {
            console.log('REDUX.THUNK error', e)
            throw e
        }
    }
);*/


// slice (редусер и экшены)
export const todosSlice = createSlice({
    name: 'todos', // имя - на что влияет ?
    initialState, // инишл стейт
    // обычные редусеры (синхронные)
    reducers: {
        setTodos: (state, action) => {
            if (action.payload.type === `setup` && state.todosDefault.length === 0) {
                state.todosDefault = state.todos.map(i => i)
            }
        },
        addTodo: (state, action) => {
            let max = 0
            let id: number
            state.todos.map((i) => {
                if (i.id > max) {
                    max = i.id
                }
            })
            id = max + 1
            state.todos.push({id: id, title: action.payload.title, text: action.payload.text, status: false})
            state.todosDefault.push({id: id, title: action.payload.title, text: action.payload.text, status: false})
        },
        changeTodo: (state, action) => {
            console.log(action.payload)
            console.log(state.todos)
            console.log(state.todosDefault)
            const id = action.payload.id
            state.todos.map((i: TodoState) => {
                if (id === i.id) {
                    i.status = !i.status
                }
            })
            state.todosDefault.map((i: TodoState) => {
                if (id === i.id) {
                    i.status = !i.status
                }
            })
        },
        deleteTodo: (state, action) => {
            const id = action.payload.id
            let index: null | number = null
            state.todos.map((v: any, n: any, i: any) => {
                id === v.id ? index = n : ``
            })
            state.todos.splice(index!, 1)
            state.todosDefault.splice(index!, 1)
        },
        filterTodos: (state, action) => {
            let results: any = [] //state.todos.map(i => i)
            console.log(results)
            if (action.payload.type === `all`) {
                results = state.todosDefault.map(i => i)
                state.filterType = "all"
            }
            if (action.payload.type === `true`) {
                state.todosDefault.map((i) => {
                    if (i.status) {
                        results.push(i)
                    }
                })
                state.filterType = "true"
            }
            if (action.payload.type === `false`) {
                state.todosDefault.map((i) => {
                    if (!i.status) {
                        results.push(i)
                    }
                })
                state.filterType = "false"
            }
            console.log(results)
            state.todos = results
        }
    },
    /* thunk reducers */
    extraReducers: (builder) => {
    },
});

export const {setTodos, changeTodo, deleteTodo, filterTodos, addTodo} = todosSlice.actions;
export default todosSlice.reducer;
