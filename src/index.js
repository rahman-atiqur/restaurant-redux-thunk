import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// import { createStore } from "redux";
import { Provider } from "react-redux";

const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk").default;

// 1. states
// 2. actions
// 3. reducers
// 4. store

// constants
const GET_MENU_CATEGORIES_REQUEST = "GET_MENU_CATEGORIES_REQUEST";
const GET_MENU_CATEGORIES_SUCCESS = "GET_MENU_CATEGORIES_SUCCESS";
const GET_MENU_CATEGORIES_FAILED = "GET_MENU_CATEGORIES_FAILED";
const GET_ALL_ITEMS_SUCCESS = "GET_ALL_ITEMS_SUCCESS";

const API_URL_CATEGORIES = "https://stream-restaurant-menu-svc.herokuapp.com/category";
const API_URL_ALL_ITEMS = "http://stream-restaurant-menu-svc.herokuapp.com/item?category=";

// 1. states -  initial states
const initialStates = {
    category: [],
    categories: [],
    menuItems: [],
    allItems: [],
    isLoading: false,
    error: null,
};

// 2. action -fetching data
const getCategoriesRequest = () => {
    return {
        type: GET_MENU_CATEGORIES_REQUEST,
    };
};
const getCategoriesSuccess = (categories) => {
    return {
        type: GET_MENU_CATEGORIES_SUCCESS,
        payload: categories,
    };
};
const getCategoriesFailed = (error) => {
    return {
        type: GET_MENU_CATEGORIES_FAILED,
        payload: error,
    };
};
const getAllItemsSuccess = (allItems) => {
    return {
        type: GET_ALL_ITEMS_SUCCESS,
        payload: allItems,
    };
};

// 3. reducer - action-type, payload
const reducer = (state = initialStates, action) => {
    const newState = { ...state };
    switch (action.type) {
        case "GET_MENU_CATEGORIES_REQUEST":
            return {
                ...newState,
                isLoading: true,
            };
        case "GET_MENU_CATEGORIES_SUCCESS":
            return {
                ...newState,
                isLoading: false,
                categories: action.payload,
            };
        case "GET_MENU_CATEGORIES_FAILED":
            return {
                ...newState,
                isLoading: false,
                error: action.payload,
            };
        case "GET_MENU_ITEMS_SUCCESS":
            return {
                ...newState,
                isLoading: false,
                menuItems: action.payload,
            };
        case "GET_MENU_CATEGORY_NAME":
            return {
                ...newState,
                isLoading: false,
                category: action.payload,
            };
        case "GET_ALL_ITEMS_SUCCESS":
            return {
                ...newState,
                isLoading: false,
                allItems: action.payload,
            };

        default:
            return newState;
    }
};

// async action creator
const fetchData = () => {
    return (dispatch) => {
        dispatch(getCategoriesRequest());

        axios
            .all([axios.get(API_URL_CATEGORIES), axios.get(API_URL_ALL_ITEMS)])
            .then(
                axios.spread((result1, result2) => {
                    const categories = result1.data;
                    const allItems = result2.data;
                    dispatch(getCategoriesSuccess(categories));
                    dispatch(getAllItemsSuccess(allItems));
                })
            )
            .catch((error) => {
                const errMsg = error.message;
                dispatch(getCategoriesFailed(errMsg));
            });
    };
};

// 4. store - creating store
// const store = createStore(reducer);
// ----------- using THUNK ------------
const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => {
    store.getState();
});

// 5. dispatch
store.dispatch(fetchData());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <Provider store={store}>
            <App />
        </Provider>
    </>
);

reportWebVitals();
