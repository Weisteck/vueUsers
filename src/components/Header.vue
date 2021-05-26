<template>
  <div class="container-fluid">
    <div>
      <div class="card mb-2 mt-2">
        <div class="card-header p-3">
          <h1>VueJS example</h1>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-2">
              <button
                class="btn btn-primary"
                @click="fetchUsers"
              >
                Fetch all users
              </button>
            </div>

            <div class="col-md-4">
              <select
                id="genders"
                v-model="gender"
                class="form-select"
                name="genders"
              >
                <option value="">
                  All
                </option>
                <option value="male">
                  Male
                </option>
                <option value="female">
                  Female
                </option>
              </select>
            </div>

            <div class="col-md-4">
              <input
                id="search"
                v-model="search"
                class="form-control"
                name="search"
                placeholder="Rechercher"
                type="text"
              >
            </div>

            <div class="col-md-2">
              <span class="lead">{{ filteredList.length }} lines </span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    fetchUsers() {
      this.$emit('fetchUsers');
    }
  }
};
</script>
