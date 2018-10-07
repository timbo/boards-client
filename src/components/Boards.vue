<template>
  <div class="boards">
    <h1>Create a new board!</h1>
    <div v-for="board in boards">
      <div><router-link :to="{ path: `board/${board.id}`}" >{{ board.name }}</router-link> <button v-on:click="deleteBoard(board.id)">x</button></div>
      <input @change="updateBoard(board)" v-model="board.name"></input>
    </div>
    <button v-on:click="createBoard()">Create a board +</button>
    <input v-model="name"></input>
  </div>
</template>

<script>
export default {
  name: 'Boards.name',
  data() {
    return {
      name: '',
    };
  },
  computed: {
    boards: function () {
      return this.$store.state.boards;
    },
  },
  beforeCreate: function () {
    this.$store.dispatch('GET_BOARDS')
  },
  methods: {
    createBoard() {
      this.$store.dispatch('CREATE_BOARD', { name: this.name });
    },
    updateBoard(board) {
      this.$store.dispatch('UPDATE_BOARD', board)
    },
    deleteBoard(id) {
      this.$store.dispatch('DELETE_BOARD', id)
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
