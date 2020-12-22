import Axios from "axios"
import firebase from 'firebase/app'
import jwt_decode from "jwt-decode"
const state = {
    userInfor: null,
    userDetail: {}
};
const getters = {
    userInfor: (state) => state.userInfor,
    userInforDetail: (state) => state.userDetail
};
const actions = {
    async fetchUserInforDetail({ commit }) {
        let token = localStorage.ACCOUNT_TOKEN;
        const response = await Axios.get('https://prc391shop.azurewebsites.net/api/v1/auth', {
            headers: {
                "Authorization": `bearer ${token}`
            }
        });
        commit('setUserInforDetail', response.data)
    },
    checkoutCart(_, transaction) {
        let token = localStorage.ACCOUNT_TOKEN;
        return new Promise((resolve, reject) => {
            return Axios.post('https://prc391shop.azurewebsites.net/api/v1/transactions', JSON.stringify(transaction), {
                headers: {
                    "Authorization": `bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                resolve(response)
            }).catch((e) => {
                reject(e)
            })
        })

    },
    updateCurrentInfor(_, currentInfor) {
        let token = localStorage.ACCOUNT_TOKEN;
        return new Promise((resolve, reject) => {
            return Axios.put('https://prc391shop.azurewebsites.net/api/v1/auth', JSON.stringify(currentInfor), {
                headers: {
                    "Authorization": `bearer ${token}`,
                    "Content-Type": "application/json",
                },

            }).then((response) => {
                resolve(response)
            }).catch((e) => {
                reject(e)
            })
        })
    },
    login() {
        console.log('login')
        return new Promise((resolve, reject) => {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(() => {
                    return firebase.auth().currentUser.getIdToken(true)
                }).then((token) => {
                    return Axios.post("https://prc391shop.azurewebsites.net/api/v1/auth/google", {
                        token: token
                    })
                }).then((response) => {
                    console.log(response.data.token)
                    var user = jwt_decode(response.data.token)
                    localStorage.ACCOUNT_TOKEN = response.data.token;
                    user.role = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
                    localStorage.USER = JSON.stringify(user);
                    resolve(user)
                }).catch((e) => {
                    reject(e)
                })
        })
    }
};
const mutations = {
    setUserInfor: (state, userInfor) => (state.userInfor = userInfor),
    setUserInforDetail: (state, userInforDetail) => (state.userDetail = userInforDetail)
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};