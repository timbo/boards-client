<template>
  <div class="board">
    <h1>{{board.name}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Board',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  computed: {
    board: function () {
      return this.$store.state.currentBoard
    },
  },
  beforeCreate: function () {
    this.$store.dispatch('GET_BOARD', this.$route.params.id)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
