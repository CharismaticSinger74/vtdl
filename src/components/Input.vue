<template>
  <div class="row">
    <div class="input-field col s10 m7 l5 offset-m2 offset-l3">
      <input 
        id="first_name" 
        type="text" 
        class="validate" 
        v-model="inputValue" 
        @keydown.enter="addTask"
        v-if="!taskEditingMode"
      >
      <label 
        class="active" 
        for="first_name"
      >
        Add task
      </label>

      <input 
        id="first_name" 
        type="text" 
        class="validate" 
        v-model="newTaskText"
        ref="inputForEditing" 
        @keydown.enter="saveEditedTask"
        v-if="taskEditingMode"
      >
      <label 
        class="active" 
        for="first_name"
      >
        Add task
      </label>
    </div>
    <div class="col s1 btn-container">
      <button 
        class="input-btn waves-effect waves-light btn"
        @click="addTask"
        v-if="!taskEditingMode"
      >
        <i class="input-icons large material-icons">add</i>
      </button>

      <button 
        class="input-btn waves-effect waves-light btn"
        @click="saveEditedTask"
        v-else
      >
        <i class="input-icons large material-icons">save</i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newTaskText: {
      type: String,
      default: '',
    },

    taskEditingMode: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'add-task',
    'save-edited-task',
  ],

  computed: {
    inputValue: {
      get() {
        return this.newTaskText;
      }, 

      set(v) {
        this.$emit('update-input-value', v);
      },
    },
  },

  methods: {
    addTask() {
      const newTask = {
        text: this.newTaskText,
      };
      if (this.newTaskText.trim()) {
        this.$emit('add-task', newTask);
      };
    },

    saveEditedTask() {
      const editedTask = {
        text: this.newTaskText,
      };
      if (this.newTaskText.trim()) {
        this.$emit('save-edited-task', editedTask)
      };
    },
  }
}
</script>

<style scoped>
.btn-container {
  margin-top: 20px;
}

.input-icons {
  font-size: 24px;
}

.input-btn {
  margin-left: 15px;
  padding: 0 0.5em;
  border-radius: 4px;
}
</style>