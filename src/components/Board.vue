<template>
  <div class="board">
    <h1>{{board.name}}</h1>
    <router-link :to="{ name: 'Boards'}">Back to Boards</router-link>
    <div class="grid-container">
      <div class="grid-item" v-for="column in board.columns">
        <input type="text" @change="updateColumn(column)" v-model="column.name">
        <button @click="deleteColumn(column)">X</button>
        <hr>
        <items :columnId="column.id"></items>
      </div>
      <div class="createColumm grid-item">
        <form class="" @submit.prevent="createColumm()">
          <input type="text" name="name" placeholder="New list column..." v-model="newColumn.name">
          <button type="submit" name="button">Create</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import items from './items'

export default {
  name: 'Board',
  components: {
    items,
  },
  data() {
    return {
      newColumn: {
        name: '',
        board_id: this.$route.params.id
      },
    };
  },
  computed: {
    board: function () {
      return this.$store.state.currentBoard
    },
  },
  beforeCreate: function () {
    this.$store.dispatch('GET_BOARD', this.$route.params.id)
  },
  methods: {
    createColumm () {
      this.$store.dispatch('CREATE_COLUMN', this.newColumn)
    },
    updateColumn (column) {
      this.$store.dispatch('UPDATE_COLUMN', column)
    },
    deleteColumn (column) {
      this.$store.dispatch('DELETE_COLUMN', column.id)
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-container {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 1em;
  padding: 2em;
}

.grid-item {
  grid-column-start: auto;
  grid-column-end: auto;
  border: 1px solid black;
  padding: 1em;
}
</style>
