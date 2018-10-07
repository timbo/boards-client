import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import _ from 'lodash';

Vue.use(Vuex);
const serverURL = 'http://localhost:3000';
const store = new Vuex.Store({
  state: {
    boards: [],
    currentBoard: {},
  },
  actions: {
    CREATE_BOARD(context, board) {
      context.commit('CREATE_BOARD', board);
    },
    GET_BOARDS(context) {
      context.commit('GET_BOARDS');
    },
    UPDATE_BOARD(context, board) {
      context.commit('UPDATE_BOARD', board);
    },
    DELETE_BOARD(context, id) {
      context.commit('DELETE_BOARD', id);
    },
    GET_BOARD(context, id) {
      context.commit('GET_BOARD', id);
    }
  },
  mutations: {
    CREATE_BOARD(state, board) {
      Axios.post(`${serverURL}/boards`, board).then((response) => {
        let createdBoard = {
          id: response.data.id,
          name: response.data.name
        }
        state.boards.push(createdBoard)
      }, response => {
        console.log('error', response)
      });
    },
    GET_BOARDS (state) {
      Axios.get(`${serverURL}/boards`).then(response => {
        state.boards = response.data;
      }, response => {
        console.log('error', response)
      });
    },
    UPDATE_BOARD (state, board) {
      console.log(board)
      Axios.put(`${serverURL}/boards/${board.id}`, board).then(response => {
        state.boards.find((board) => board.id === response.data.id).name = response.date.name
      }, response => {
        console.log('error', response)
      });
    },
    DELETE_BOARD (state, id) {
      Axios.delete(`${serverURL}/boards/${id}`).then(response => {
        state.boards = _.filter(state.boards, board => {
          return board.id !== id
        })
      }, response => {
        console.log('error', response);
      })
    },
    GET_BOARD (state, id) {
      Axios.get(`${serverURL}/boards/${id}`).then(response => {
        state.currentBoard = response.data
      }, response => {
        console.log('error', response);
      })
    }
  }
})

export default store;
