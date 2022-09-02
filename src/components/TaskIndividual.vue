<template>
  <div class="row">
    <div class="task-check-container col s1 offset-m1 offset-l2">

      <button 
        class="task-btn waves-effect waves-teal btn"
        :class="{ 'btn': task.isChecked, 'btn-flat': !task.isChecked }" 
        @click="checkTask(task._id)"
      >
        <i class="task-icons material-icons">check</i>
      </button>
    </div>

    <div class="task-text-container col s6 m6 l4 offset-s1 offset-m0 offset-l0">
      <p 
        class="task-text"
        :class="{ 'task-text-checked': task.isChecked }"
        ref="taskText"
      >
        {{ task.text }}
      </p>
    </div>

    <div class="task-date-container col s1">
      <small> {{ localeDate }} </small>
    </div>

    <div class="task-edit-container col s1">
      <button
        class="task-btn waves-effect waves-teal btn-flat btn"
        @click="editTask(task._id)"
      >
        <i class="task-icons material-icons large">edit</i>
      </button>
      <!-- <button
        class="task-btn waves-effect waves-teal btn-flat btn"
        @click="saveEditedTask(task._id)"
        v-else
      >
        <i class="task-icons material-icons large">save</i>
      </button> -->
    </div>


    <div class="task-delete-container col s1">
      <button 
        class="task-btn waves-effect waves-teal btn-flat btn"
        @click="deleteTask(task._id)"
      >
        <i class="task-icons material-icons large">delete</i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => { },
    },
  },

  emits: [
    'delete-task',
    'check-task',
    'edit-task',
  ],

  computed: {
    localeDate() {
      return new Date(this.task.date).toLocaleDateString();
    },
  },

  methods: {
    deleteTask(id) {
      this.$emit('delete-task', id);
    },

    checkTask(id) {
      this.$emit('check-task', id);
    },

    // focusTaskText() {
    //   this.$refs.taskText.focus();
    //   this.isTaskSaved = false
    // },

    // saveEditedTask(_id) {
    //   const editedTask = {
    //     text: this.$refs.taskText.innerText,
    //   };
    //   this.taskFocused = false;
    //   this.$refs.taskText.blur();
    //   this.$emit('edit-task', _id, editedTask);
    //   this.isTaskSaved = true;
    // },
    editTask(id) {
      const taskText = this.$refs.taskText.innerText
      this.$emit('edit-task', id, taskText)
    },
  },
}

</script>

<style scoped>
.task-text {
  margin: 0;
  font-size: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-text-checked {
  color: gray;
  text-decoration: line-through;
}

.task-icons {
  font-size: 24px;
}

.task-btn {
  border-radius: 4px;
  padding: 0 0.5em;
  margin: 0 0.5em;
}

.task-date-container {
  margin: 7.5px;
}
</style>