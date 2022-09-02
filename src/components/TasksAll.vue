<template>
  <div v-for="task in tasksListFiltered">
    <TaskIndividual 
      :task="task"
      @delete-task="deleteTask"
      @check-task="checkTask"
      @edit-task="editTask"
    />
  </div>
</template>

<script>

import TaskIndividual from './TaskIndividual.vue';

export default {
  props: {
    tasksListFiltered: {
      type: Array,
      default: () => [],
    }
  },

  emits: [
    'delete-task',
    'check-task',
    'edit-task',
  ],

  components: { 
    TaskIndividual 
  },

  methods: {
    deleteTask(id) {
      this.$emit('delete-task', id);
    },

    checkTask(id) {
      this.$emit('check-task', id);
    },

    editTask(id, taskText) {
      this.$emit('edit-task', id, taskText);
    }
  }
}

</script>

<style>
</style>