import Axios from "axios"
import firebase from 'firebase';
const state = {
  laptops: [],
  laptopDetail: {},
  searchResult: [],
  listAfterdelete: [],
  manufactories: [],
  uploadValue: null
};
const getters = {
  allLaptops: (state) => state.laptops,
  laptopDetail: (state) => state.laptopDetail,
  searchResultLaptops: (state) => state.searchResult,
  manufactoryList: (state) => state.manufactories
};
const actions = {
  async fetchAllLaptop({ commit }) {
    const response = await Axios.get('https://prc391shop.azurewebsites.net/api/v1/products');
    commit('setAllLaptops', response.data)
  },
  async fetchLaptopDetail({ commit }, id) {
    const response = await Axios.get(`https://prc391shop.azurewebsites.net/api/v1/products/${id}`);
    commit('setLaptopDetail', response.data)
  },
  async fetchLaptopByName({ commit }, seachValue) {
    var params = {
      outOfAmount: localStorage.USER && JSON.parse(localStorage.USER).role === "Admin"
    }
    if (seachValue) params.name = seachValue
    const response = await Axios.get('https://prc391shop.azurewebsites.net/api/v1/products', {params: params});
    commit('setLaptopSearchResult', response.data);

  },
  async fetchListManufactory({ commit }) {
    const response = await Axios.get(`https://prc391shop.azurewebsites.net//api/v1/manufactories`);
    commit('setManufactories', response.data)
  },
  createNewProduct(context, laptopNew) {
    let token = localStorage.ACCOUNT_TOKEN;
    return new Promise((resolve, reject) => {
      var result;
      const storageRef = firebase.storage().ref(`${laptopNew.image.name}`).put(laptopNew.image)
      storageRef.on(`state_changed`, snapshot => {
        context.state.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, error => { console.log(error.message) },
        () => {
          context.state.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            laptopNew.image = url;
          }).then(() => {
            result = new Axios.post(`https://prc391shop.azurewebsites.net/api/v1/products`, JSON.stringify(laptopNew), {
              headers: {
                "Authorization": `bearer ${token}`,
                "Content-Type": "application/json"
              }
            }).then((response) => {
              resolve(response);
            }).catch((e) => {
              reject(e);
            })
          })
        })
      return result;
    })
  },
  updateProductInfor(context, laptopInfor) {
    let token = localStorage.ACCOUNT_TOKEN;
    let id = laptopInfor.productId;
    if (typeof(laptopInfor.image) === "string") {
      return new Promise((resolve, reject) => {
        var result;
        result = new Axios.put(`https://prc391shop.azurewebsites.net/api/v1/products/${id}`, JSON.stringify(laptopInfor), {
          headers: {
            "Authorization": `bearer ${token}`,
            "Content-Type": "application/json"
          }
        }).then((response) => {
          resolve(response);
        }).catch((e) => {
          reject(e);
        })
        return result;
      })
    }
    return new Promise((resolve, reject) => {
      var result;
      const storageRef = firebase.storage().ref(`${laptopInfor.image.name}`).put(laptopInfor.image)
      storageRef.on(`state_changed`, snapshot => {
        context.state.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, error => { console.log(error.message) },
        () => {
          context.state.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            laptopInfor.image = url;
          }).then(() => {
            result = new Axios.put(`https://prc391shop.azurewebsites.net/api/v1/products/${id}`, JSON.stringify(laptopInfor), {
              headers: {
                "Authorization": `bearer ${token}`,
                "Content-Type": "application/json"
              }
            }).then((response) => {
              resolve(response);
            }).catch((e) => {
              reject(e);
            })
          })
        })
      return result;
    })
  },
  deleteProduct(context, id) {
    let token = localStorage.ACCOUNT_TOKEN;
    return new Promise((resolve, reject) => {
      return new Axios.delete(`https://prc391shop.azurewebsites.net/api/v1/products/${id}`, {
        headers: {
          "Authorization": `bearer ${token}`,
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.status === 204 || response.status === 200) {
          var result = context.state.searchResult.filter((item) => (item.productId !== id))
          context.commit("setLaptopSearchResult", result)
        }
        resolve(response)
      }).catch((e) => {
        reject(e)
      });
    })

  },
};
const mutations = {
  setAllLaptops: (state, allLaptops) => (state.laptops = allLaptops),
  setLaptopDetail: (state, laptopDetail) => (state.laptopDetail = laptopDetail),
  setLaptopSearchResult: (state, searchResultLaptops) => (state.searchResult = searchResultLaptops),
  setManufactories: (state, manufactoryList) => (state.manufactories = manufactoryList)
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};