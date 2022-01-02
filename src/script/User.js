import axios from "axios";
import store from '../store/index'
import * as order from "@/script/Order";


export async function login(token,ticket){
    let user_id;
    let orderid;
    let privilege;
    axios.request(getRequestOptions(`/login/${token}/${ticket}`,"GET"))
        .then((response) => {
            console.log("from axios : "+ response.data);
            console.log(response.data)
            user_id = response.data.user_id;
            orderid = response.data.orderid;
            privilege = response.data.privilege;

        }).catch((error) => {
        console.log(error);
    }).then(function(){
        console.log("from login : ")
        console.log(user_id)
        console.log(orderid)

        store.commit("setUserID",user_id);
        store.commit("setPrivilege",privilege);

        if(orderid === undefined)
            store.commit("setOrderID",'undefined');
        else
            store.commit("setOrderID",orderid);

        if(store.state.products === 'undefined'){
            console.log("products undefined");
            order.getProducts((products) => {
                console.log(JSON.stringify(products))
                store.commit("setProducts",[...products]);
            })
        }

        window.location.href = `${process.env.VUE_APP_CLIENT_URL}/#/`
        console.log("redirecting")

    })
}


export async function getUserId(_callback){
    let user_id = undefined;
    axios.request(getRequestOptions(`/user/id`,"GET"))
        .then((response) => {
            user_id = response.data;
            console.log("from user and request : "+user_id);

        }).catch((error) => {
        console.log(error);
    }).then(() => {
        if(_callback !== undefined)
            _callback(user_id);
    });

}


export function getRequestOptions(path,method){
    return {
        method: method,
        url: `${process.env.VUE_APP_API_URL}/api` + path,
        withCredentials: true,
    };

}

