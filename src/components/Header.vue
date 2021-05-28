<template>
  <div v-if="loading">
    <p>Loading...</p>
  </div>
  <div v-else>
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
              type="text"
              name="search"
              class="form-control"
              placeholder="Rechercher"
            >
          </div>

          <div class="col-md-2">
            <span class="lead">{{ filteredUser.length }} lignes</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      gender: '',
      age: '',
      nonFilteredUsers: [],
      filteredUser: [],
      search: '',
      loading: false,
    };
  },
  computed: {
    searchWords() {
      if (!this.search.length) return [];

      return this.search.toLowerCase().split(' ');
    },
  },
  watch: {
    gender() {
      this.filteredList();
    },
    search() {
      this.filteredList();
    },
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.loading = true;
      axios('https://randomuser.me/api/?results=20').then(
        ({ data: { results } }) => {
          this.loading = false;
          this.nonFilteredUsers = results.map((user) => ({
            age: user.dob.age,
            name: `${user.name.first} ${user.name.last.toUpperCase()}`,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            avatar: user.picture.thumbnail,
          }));

          this.filteredUser = this.nonFilteredUsers;

          this.$emit('fetch-user', this.nonFilteredUsers);
        },
      );
    },

    filteredList() {
      this.filteredUser = this.nonFilteredUsers
        // Recherche
        .filter((user) => this.searchWords.every((word) => user.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(word)))

        // Filtre par genres
        .filter((user) => {
          if (this.gender === '') return true;
          return user.gender === this.gender;
        })

        // Met en gras les resultats recherché
        .map((user) => {
          const nameFormated = this.searchWords.length
            ? user.name.replace(
              new RegExp(this.searchWords.join('|'), 'gi'),
              '<span class="highlight">$&</span>',
            )
            : user.name;

          return {
            ...user,
            nameFormated,
          };
        });

      this.$emit('fetch-user', this.filteredUser);
    },
  },
};
</script>
