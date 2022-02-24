import axios from "axios";
import store from '../store/index'
import router from "@/router";


export async function login(token,ticket){
    let user_id;
    let firstname;
    let orderid;
    let privilege;
    let c = true;
    axios.request({
        method: "GET",
        url: `${process.env.VUE_APP_API_URL}/api` + `/login/${token}/${ticket}`,
        withCredentials: true,
    })
        .then((response) => {

            console.log("from axios : "+ response.data);
            console.log(response.data)
            localStorage.setItem('accessToken', response.data.accessToken);
            if(Object.keys(response.data.codeObject).length !== 0){
                for (let key of Object.keys(response.data.codeObject)) {
                    let obj = {}
                    obj[key] = response.data.codeObject[key]
                    store.commit("addCode",obj);
                }

            }
            user_id = response.data.user_id;
            firstname = response.data.firstname;
            orderid = response.data.orderid;
            privilege = response.data.privilege;

        }).catch((error) => {
        console.log(error);
        if(error.response.status === 706){
            c = false;
            router.push({name: 'Forbiden'});
        }
    }).then(function(){
        if(c){
        console.log("from login : ")
        console.log(user_id)
        console.log(orderid)

        store.commit("setUserID",user_id);
        store.commit("setFirstName",firstname);
        store.commit("setPrivilege",privilege);

        if(orderid === undefined)
            store.commit("setOrderID",'undefined');
        else
            store.commit("setOrderID",orderid);



        window.location.href = process.env.VUE_APP_CLIENT_URL
        }


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
export async function addCode(code,_callback){
    let status = undefined;
    console.log("sending code")
    console.log(code)
    axios.request(getRequestOptions(`/user/code/${code}`,"GET"))
        .then((response) => {
            status = response.status;
            console.log("request status"+status);
            console.log(response.data)
            store.commit("addCode",response.data);
            }).catch((error) => {
        status = error.response.status
    }).then(() => {
        if(_callback !== undefined)
            _callback(status);
    });
}

export function getRequestOptions(path,method){
    return {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
        method: method,
        url: `${process.env.VUE_APP_API_URL}/api` + path,
        withCredentials: true,
    };

}

