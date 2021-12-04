import axios from "axios";
import store from '../store/index'
import router from '../router/index'


export async function login(token,ticket){
    let user_id;
    axios.request(getRequestOptions(`/login/${token}/${ticket}`,"GET"))
        .then((response) => {
            console.log("from axios : "+ response.data);
            user_id = response.data;
        }).catch((error) => {
        console.log(error);
    }).then(function(){
        console.log("from login : "+user_id)
        store.commit("setUserID",user_id);
        router.push({name:'Home'});
        window.location.href = window.location.href.replace(/login.*/, '')
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


function getRequestOptions(path,method){
    return {
        method: method,
        url: 'http://localhost:3000/api' + path,
        withCredentials: true,
    };

}