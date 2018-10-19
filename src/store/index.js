import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import _ from 'lodash';

Vue.use(Vuex);
const serverURL = 'http://localhost:4000';
const store = new Vuex.Store({
  state: {
    boards: [],
    currentBoard: { tasks: []},
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
    },
    CREATE_COLUMN(context, column) {
      context.commit('CREATE_COLUMN', column);
    },
    UPDATE_COLUMN(context, column) {
      context.commit('UPDATE_COLUMN', column);
    },
    DELETE_COLUMN(context, id) {
      context.commit('DELETE_COLUMN', id);
    },
    CREATE_ITEM(context, item) {
      context.commit('CREATE_ITEM', item);
    },
    UPDATE_ITEM(context, item) {
      context.commit('UPDATE_ITEM', item);
    },
    DELETE_ITEM(context, item) {
      context.commit('DELETE_ITEM', item);
    },
  },
  mutations: {
    CREATE_BOARD(state, board) {
      Axios.post(`${serverURL}/boards`, board).then((response) => {
        let createdBoard = {
          id: response.data.id,
          name: response.data.name,
        };
        state.boards.push(createdBoard);
      }, (response) => {
        console.log('error', response);
      });
    },
    GET_BOARDS(state) {
      Axios.get(`${serverURL}/boards`).then(response => {
        state.boards = response.data;
      }, (response) => {
        console.log('error', response);
      });
    },
    UPDATE_BOARD(state, board) {
      Axios.put(`${serverURL}/boards/${board.id}`, board).then(response => {
        state.boards.find((board) => board.id === response.data.id).name = response.date.name
      }, (response) => {
        console.log('error', response);
      });
    },
    DELETE_BOARD(state, id) {
      Axios.delete(`${serverURL}/boards/${id}`).then((response) => {
        state.boards = _.filter(state.boards, board => {
          return board.id !== id
        })
      }, (response) => {
        console.log('error', response);
      })
    },
    GET_BOARD(state, id) {
      Axios.get(`${serverURL}/boards/${id}`).then(response => {
        state.currentBoard = response.data[0]
      }, (response) => {
        console.log('error', response);
      })
    },
    CREATE_COLUMN(state, column) {
      Axios.post(`${serverURL}/columns`, column).then(response => {
        state.currentBoard.columns.push(response.data);
      }, (response) => {
        console.log('error', response);
      });
    },
    UPDATE_COLUMN(state, column) {
      Axios.put(`${serverURL}/columns/${column.id}`, column).then(response => {
        state.currentBoard.columns.find((column) => column.id === response.data.id).name = response.data.name
      }, (response) => {
        console.log('error', response);
      });
    },
    DELETE_COLUMN(state, id) {
      Axios.delete(`${serverURL}/columns/${id}`).then((response) => {
        state.currentBoard.columns = _.filter(state.currentBoard.columns, (column) => {
          return column.id !== id;
        })
      }, (response) => {
        console.log('error', response);
      })
    },
    CREATE_COLUMN(state, column) {
      Axios.post(`${serverURL}/columns`, column).then(response => {
        state.currentBoard.columns.push(response.data);
      }, (response) => {
        console.log('error', response);
      });
    },
    UPDATE_COLUMN(state, column) {
      column.tasks_attributes 
      Axios.put(`${serverURL}/columns/${column.id}`, column).then(response => {
        state.currentBoard.columns.find((column) => column.id === response.data.id).name = response.data.name
      }, (response) => {
        console.log('error', response);
      });
    },
    DELETE_COLUMN(state, id) {
      Axios.delete(`${serverURL}/columns/${id}`).then((response) => {
        state.currentBoard.columns = _.filter(state.currentBoard.columns, (column) => {
          return column.id !== id;
        })
      }, (response) => {
        console.log('error', response);
      })
    },
    CREATE_ITEM(state, task) {
      Axios.post(`${serverURL}/tasks`, task).then(response => {
        let columnToUpdate = state.currentBoard.columns.find((column) => column.id === task.column_id )
        console.log(columnToUpdate)
        columnToUpdate.tasks.push(response.data);
      }, (response) => {
        console.log('error', response);
      });
    },
    UPDATE_ITEM(state, task) {
      Axios.put(`${serverURL}/tasks/${task.id}`, task).then(response => {
        let columnToUpdate = state.currentBoard.columns.find((column) => column.id === task.column_id )
        console.log(columnToUpdate)
        // columnToUpdate.tasks.find((taskToUpdate) => { taskToUpdate.id === response.data.id }) = response.data
      }, (response) => {
        console.log('error', response);
      });
    },
    DELETE_ITEM(state, task) {
      Axios.delete(`${serverURL}/tasks/${task.id}`).then((response) => {
        let columnToUpdate = state.currentBoard.columns.find((column) => column.id === task.column_id )
        console.log(columnToUpdate)
        columnToUpdate.tasks = _.filter(columnToUpdate.tasks, (deletedTask) => {
          return deletedTask.id !== task.id;
        })
      }, (response) => {
        console.log('error', response);
      })
    },
  },
});

export default store;
