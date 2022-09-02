<template>
  <div class="show-more-container container">
    <button 
      class="btn-show-more waves-effect waves-teal btn" 
      @click=show5MoreTasks
      v-if="howManyTasksToShow < tasksList.length "
    >
      Show more
    </button>
    <button 
      class="btn-show-all waves-effect waves-teal btn" 
      @click=showAllTasks
      v-if="howManyTasksToShow < tasksList.length "
    >
      Show all
    </button>
  </div>
</template>

<script>
export default {
  props: {
    howManyTasksToShow: {
      type: Number,
      default: 5,
    },
    tasksList: {
      type: Array,
      default: () => [],
    },
  },

  emits: [
    'show-5-more-tasks',
    'show-all-tasks',
  ],

  methods: {
    show5MoreTasks() {
      this.$emit('show-5-more-tasks');
    },
    showAllTasks() {
      this.$emit('show-all-tasks');
    },
  },
}
</script>

<style scoped>
.show-more-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 0px;
}

.btn-show-more {
  grid-area: 1 / 1 / 2 / 2;
  justify-self: end;
}

.btn-show-all {
  grid-area: 1 / 2 / 2 / 3;
  justify-self: start;
}
</style>