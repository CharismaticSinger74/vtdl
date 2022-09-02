<template>
  <Input 
    :newTaskText="newTaskText"
    :taskEditingMode="taskEditingMode"
    @add-task="addTask"
    @save-edited-task="saveEditedTask"
    @update-input-value="updateInputValue"
  />
  <Filter 
    :sortTasks="sortTasks" 
    :filterCheckedTasks="filterCheckedTasks" 
    :filterAllTasks="filterAllTasks"
    @filter-clear="filterClear" 
    @filter-checked="filterChecked" 
    @filter-not-checked="filterNotChecked"
    @sort-recent-first="sortRecentFirst" 
    @sort-older-first="sortOlderFirst"
  />
  <TasksAll 
    :tasksListFiltered="filterForEditingTask" 
    @delete-task="deleteTask" 
    @check-task="checkTask"
    @edit-task="editTask" 
  />
  <ShowMore
    :howManyTasksToShow="howManyTasksToShow"
    :tasksList="tasksList" 
    @show-5-more-tasks="show5MoreTasks" 
    @show-all-tasks="showAllTasks" 
  />
</template>

<script>
import TaskApi from './domain/TaskApi.js';
import M from 'materialize-css';
import Input from './components/Input.vue';
import TasksAll from './components/TasksAll.vue';
import Filter from './components/Filter.vue';
import ShowMore from './components/ShowMore.vue';

export default {
  name: 'App',
  components: {
    Input,
    TasksAll,
    Filter,
    ShowMore,
  },
  data() {
    return {
      tasksList: [],
      filterAllTasks: true,
      filterCheckedTasks: false,
      sortTasks: true,
      howManyTasksToShow: 10,
      newTaskText: '',
      idOfTheTaskThatEditing: undefined,
      taskEditingMode: false,
    };
  },

  computed: {
    filterTasksList() {
      const filteredTasks = this.tasksList.filter((t) => {
        if (!this.filterAllTasks) {
          return t.isChecked === this.filterCheckedTasks;
        };
        return t;
      });
      return filteredTasks;
    },
    sortTasksList() {
      const s = this.filterTasksList;
      if (this.sortTasks) {
        return s.reverse()
      };
      return s;
    },

    filterHowManyTasksToShow() {
      const a = this.sortTasksList;
      return a.slice(0, this.howManyTasksToShow)
    },
      
    filterForEditingTask() {
      const e = this.filterHowManyTasksToShow.filter((i) => {
        return i._id !== this.idOfTheTaskThatEditing;
      })
      return e;
    },
  },
  mounted() {
    M.AutoInit();
    this.fetchTasks();
  },
  methods: {
    updateInputValue(v) {
      this.newTaskText = v;
    },

    async fetchTasks() {
      try {
        this.tasksList = await TaskApi.fetch();
        console.log('fetchTasks good');
      } catch (e) {
        console.error(e);
      }
    },

    async deleteTask(_id) {
      try {
        await TaskApi.remove(_id);
        this.fetchTasks();
      } catch (e) {
        console.error(e);
      }
    },

    async checkTask(id) {
      try {
        await TaskApi.update(id);
        this.fetchTasks();
      } catch (e) {
        console.error(e);
      }
    },

    async addTask(task) {
      // this.newTaskText = ' ';
      try {
        await TaskApi.create(task);
        M.updateTextFields();
        this.fetchTasks();
        this.newTaskText = '';
      } catch (e) {
        console.error(e);
      }
    },

    // async editTask(id, task) {
    //   try {
    //     await TaskApi.edit(id, task);
    //     M.updateTextFields();
    //     this.fetchTasks();
    //   } catch (e) {
    //     console.error(e)
    //   }
    // },

    editTask(id, task) {
      this.newTaskText = task;
      this.idOfTheTaskThatEditing = id;
      this.taskEditingMode = true;
    },

    async saveEditedTask(task) {
      try {
        await TaskApi.edit(this.idOfTheTaskThatEditing, task);
        M.updateTextFields();
        this.fetchTasks();
        this.idOfTheTaskThatEditing = undefined;
        this.taskEditingMode = false;
        this.newTaskText = '';
      } catch (e) {
        console.error(e)
      }
    },

    filterClear() {
      this.filterAllTasks = true;
    },

    filterChecked() {
      this.filterAllTasks = false;
      this.filterCheckedTasks = true;
    },

    filterNotChecked() {
      this.filterAllTasks = false;
      this.filterCheckedTasks = false;
    },

    sortRecentFirst() {
      this.sortTasks = true;
      this.fetchTasks();
    },

    sortOlderFirst() {
      this.sortTasks = false;
      this.fetchTasks();
    },

    show5MoreTasks() {
      this.howManyTasksToShow += 5
    },

    showAllTasks() {
      this.howManyTasksToShow = this.tasksList.length
    },
  },
}
</script>

<style>
</style>
