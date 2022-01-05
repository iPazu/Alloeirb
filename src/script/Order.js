import axios from "axios";
import {getRequestOptions} from "@/script/User";
//import store from '../store/index'
//import router from '../router/index'


export function sendOrder(jsonObject,_then){
    console.log(jsonObject)
    console.log("sending order")
    jsonObject['accessToken'] = localStorage.getItem("accessToken")
    axios.post(`${process.env.VUE_APP_API_URL}/api/order`, jsonObject,
        { headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
        withCredentials: true })
        .then(response => _then(response));
}

export function setRanking(jsonObject,orderId,_then){
    console.log(jsonObject)
    jsonObject['accessToken'] = localStorage.getItem("accessToken")
    axios.post(`${process.env.VUE_APP_API_URL}/api/order/ranking/${orderId}`, jsonObject,{ headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken")
    },
        withCredentials: true })
        .then(response => _then(response));
}
export function getOrder(orderId,_callback){
    console.log(orderId);
    let data;
    axios.request(getRequestOptions(`/order/get/${orderId}`,"GET"))
        .then((response) => {
            data = response.data;
        }).catch((error) => {
        console.log(error);
    }).then(() => {
        if(_callback !== undefined)
            _callback(data);
    });
}
export function cancelOrder(orderId,_callback){
    console.log(orderId);
    let data;
    axios.request(getRequestOptions(`/order/cancel/${orderId}`,"GET"))
        .then((response) => {
            data = response.data;
        }).catch((error) => {
        console.log(error);
    }).then(() => {
        if(_callback !== undefined)
            _callback(data);
    });
}
export function getProducts(_callback){
    let data;
    console.log("Fetching products")
    axios.request(getRequestOptions(`/products`,"GET"))
        .then((response) => {
            data = response.data;
        }).catch((error) => {
        console.log(error);
    }).then(() => {
        if(_callback !== undefined)
            _callback(data);
    });
}

export function fetchOrders(_callback){
    let data;
    console.log("Fetching orders")
    axios.request(getRequestOptions(`/order/fetch`,"GET"))
        .then((response) => {
            data = response.data;
        }).catch((error) => {
        console.log(error);
    }).then(() => {
        if(_callback !== undefined)
            _callback(data);
    });
}

export function acceptOrder(orderId,_callback){
    console.log(orderId);
    let data;
    axios.request(getRequestOptions(`/order/accept/${orderId}`,"GET"))
        .then((response) => {
            data = response.data;
        }).catch((error) => {
        console.log(error);
    }).then(() => {
        if(_callback !== undefined)
            _callback(data);
    });
}
export function acceptCoursier(orderId,_callback){
    console.log(orderId);
    let data;
    axios.request(getRequestOptions(`/order/coursier/${orderId}`,"GET"))
        .then((response) => {
            data = response.data;
        }).catch((error) => {
        console.log(error);
    }).then(() => {
        if(_callback !== undefined)
            _callback(data);
    });
}

export function delivered(orderId,_callback){
    console.log(orderId);
    let data;
    axios.request(getRequestOptions(`/order/delivered/${orderId}`,"GET"))
        .then((response) => {
            data = response.data;
        }).catch((error) => {
        console.log(error);
    }).then(() => {
        if(_callback !== undefined)
            _callback(data);
    });
}