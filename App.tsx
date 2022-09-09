import React from "react"
import store from "./store/store";
import {Provider} from "react-redux";
import List from "./screens/List";

export default function App() {
    return (
        <Provider store={store}>
            <List/>
        </Provider>
    )
}
