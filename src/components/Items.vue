<template>
  <div class="">
    <div class="createItem">
      <form class="" @submit.prevent="createItem(columnId)">
        <input type="text" name="name" placeholder="Item name" v-model="newItem.name">
        <textarea name="name" rows="6" cols="20" placeholder="Descripton" v-model="newItem.description"></textarea>
        <button type="submit" name="button">Create</button>
        <hr>
        <draggable class="dragArea" v-model="column.tasks" @change="onChange" :options="{group:'tasks'}">
          <div v-for="task in column.tasks" class="task" :key="task.id">
            <input @change="updateItem(task)" type="text" v-model="task.name">
            <textarea @change="updateItem(task)" v-model="task.description" rows="6" cols="20"></textarea>
            <button @click.prevent="deleteItem(task)">Delete</button>
          </div>
        </draggable>
      </form>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import _ from 'lodash'

export default {
  name: 'ItemList',
  props: ['columnId'],
  components: { draggable },
  data() {
    return {
      newItem: {
        name: '',
        column_id: this.columnId,
        description: '',
      }
    };
  },
  computed: {
    column: function () {
      return this.$store.state.currentBoard.columns.find((column) => column.id === this.columnId)
    },
  },
  methods: {
    createItem (column_id) {
      this.newItem.id = column_id
      this.$store.dispatch('CREATE_ITEM', this.newItem)
    },
    updateItem (item) {
      this.$store.dispatch('UPDATE_ITEM', item)
    },
    deleteItem (item) {
      this.$store.dispatch('DELETE_ITEM', item)
    },
    onChange (event) {
      if (event.added) {
        this.column.tasks.find(task => task.id === event.added.element.id).column_id = this.column.id
      }
      this.column.tasks.forEach((task, index) => task.position = index + 1)
      this.$store.dispatch('UPDATE_COLUMN', this.column)
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .task {
    border: 1px solid black;
    margin: .5em;
    padding: .5em;
  }
  .dragArea {
    min-height: 200px;
    display: block;
  }
</style>
