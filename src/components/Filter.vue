<template>
<!--   <div 
    class="filter-container container"
  >
    <button
      class="btn11 waves-effect waves-teal"
      :class="{ 'btn': filterAllTasks, 'btn-flat': !filterAllTasks }"
      @click=filterClear
    >
      All
    </button>
    <button
      class="btn12 waves-effect waves-teal"
      :class="{ 'btn': filterCheckedTasks && !filterAllTasks, 'btn-flat': !filterCheckedTasks || filterAllTasks}"
      @click=filterChecked
    >
      Only checked
    </button>
    <button
      class="btn13 waves-effect waves-teal"
      :class="{ 'btn': !filterCheckedTasks && !filterAllTasks, 'btn-flat': filterCheckedTasks || filterAllTasks}"
      @click=filterNotChecked
    >
      Only not checked
    </button>
    <button
      class="btn21 waves-effect waves-teal"
      :class="{ 'btn': sortTasks, 'btn-flat': !sortTasks }"
      @click=sortRecentFirst
    >
      Recent tasks
    </button>
    <button
      class="btn22 waves-effect waves-teal"
      :class="{ 'btn': !sortTasks, 'btn-flat': sortTasks }"
      @click=sortOlderFirst
    >
      Older tasks
    </button>
  </div> -->
  <!-- <div class="form-container">
    <form action="#" class="form1">
      <p>
        <label @click=filterClear>
          <input name="group1" type="radio" checked />
          <span>All</span>
        </label>
      </p>
      <p>
        <label @click=filterChecked>
          <input name="group1" type="radio" />
          <span>Only checked</span>
        </label>
      </p>
      <p>
        <label @click=filterNotChecked>
          <input name="group1" type="radio"  />
          <span>Only not checked</span>
        </label>
      </p>
    </form>
    <form action="#" class="form2">
      <p>
        <label @click=sortRecentFirst>
          <input name="group2" type="radio" checked />
          <span>Recent tasks</span>
        </label>
      </p>
      <p>
        <label @click=sortOlderFirst>
          <input name="group2" type="radio" />
          <span>Older tasks</span>
        </label>
      </p>
    </form>
  </div> -->
  <div class='dropdown-container'>
    <a class='filter1 dropdown-trigger btn' href='#' data-target='filter1'>
      {{ filterAllTasks ? 'All tasks' : '' }}
      {{ filterCheckedTasks && !filterAllTasks ? 'Only checked' : '' }}
      {{ !filterCheckedTasks && !filterAllTasks ? 'Only not checked' : '' }}
    </a>
  
    <ul id='filter1' class='dropdown-content'>
      <li @click=filterClear><a href="#!">All tasks</a></li>
      <li class="divider" tabindex="-1"></li>
      <li @click=filterChecked><a href="#!">Only checked</a></li>
      <li class="divider" tabindex="-1"></li>
      <li @click=filterNotChecked><a href="#!">Only not checked</a></li>
    </ul>

    <a class='sort1 dropdown-trigger btn' href='#' data-target='sort1'>
      {{ sortTasks ? 'Recent tasks' : 'Older tasks' }}
    </a>
  
    <ul id='sort1' class='dropdown-content'>
      <li @click=sortRecentFirst><a href="#!">Recent tasks</a></li>
      <li class="divider" tabindex="-1"></li>
      <li @click=sortOlderFirst><a href="#!">Older tasks</a></li>
    </ul>
  </div>
        
</template>

<script>
export default {
  props: {
    sortTasks: {
      type: Boolean,
      default: false,
    },
    filterCheckedTasks: {
      type: Boolean,
      default: false,
    },
    filterAllTasks: {
      type: Boolean,
      default: true,
    }
  },

  emits: [
    'filter-clear',
    'filter-not-checked',
    'filter-checked',
    'sort-recent-first',
    'sort-older-first',
  ],

  methods: {
    filterClear() {
      this.$emit('filter-clear');
      
    },

    filterNotChecked() {
      this.$emit('filter-not-checked');
    },

    filterChecked() {
      this.$emit('filter-checked');
    },

    sortRecentFirst() {
      this.$emit('sort-recent-first');
    },

    sortOlderFirst() {
      this.$emit('sort-older-first');
    },
  }
}
</script>

<style scoped>
/* .filter-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  margin-bottom: 20px;
}
.btn11 { 
  grid-area: 1 / 1 / 2 / 3;
  justify-self: center; 
}
.btn12 { 
  grid-area: 1 / 3 / 2 / 5; 
  justify-self: center;
}
.btn13 { 
  grid-area: 1 / 5 / 2 / 7; 
  justify-self: center;
}
.btn21 { 
  grid-area: 2 / 1 / 3 / 4; 
  justify-self: center;
}
.btn22 { 
  grid-area: 2 / 4 / 3 / 7; 
  justify-self: center;
} */

/* .form-container {
  margin-left: -20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 100px;
  grid-row-gap: 0px;
}

.form1 {
  grid-area: 1 / 1 / 2 / 2;
  justify-self: end;
}

.form2 {
  grid-area: 1 / 2 / 2 / 3;
  justify-self: start;
} */
.dropdown-container {
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 0px;
}

.filter1 {
  grid-area: 1 / 1 / 2 / 2;
  justify-self: end;
}

.sort1 {
  grid-area: 1 / 2 / 2 / 3;
  justify-self: start;
}
</style>