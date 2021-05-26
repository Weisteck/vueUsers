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
                type="text"
                name="search"
                class="form-control"
                placeholder="Rechercher"
              >
            </div>

            <div class="col-md-2">
              <span class="lead">{{ filteredList.length }} lignes</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <table
          id="tbl-users"
          class="table table-hover"
        >
          <thead>
            <tr>
              <th />
              <th
                :class="[sortBy === 'name' ? sortDirection : '']"
                @click="sort('name')"
              >
                Nom
              </th>
              <th
                :class="[sortBy === 'email' ? sortDirection : '']"
                @click="sort('email')"
              >
                Email
              </th>
              <th
                :class="[sortBy === 'phone' ? sortDirection : '']"
                @click="sort('phone')"
              >
                Tel
              </th>
              <th
                :class="[sortBy === 'age' ? sortDirection : '']"
                @click="sort('age')"
              >
                Naissance
              </th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in filteredList"
              :key="user.email"
            >
              <td><img :src="user.avatar"></td>
              <td v-html="user.nameFormated" />

              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.age }}</td>
              <td>{{ user.gender }}</td>
            </tr>
          </tbody>
        </table>
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
      sortBy: '',
      sortDirection: 'asc',
      search: '',
    };
  },

  computed: {
    searchWords() {
      if (!this.search.length) return [];

      return this.search.toLowerCase().split(' ');
    },

    filteredList() {
      return (
        this.nonFilteredUsers
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

          // tri par ordre alphabétique
          .sort((p1, p2) => {
            const modifier = this.sortDirection === 'asc' ? 1 : -1;

            if (!this.sortBy) return 0;

            if (typeof p1[this.sortBy] === 'number') return modifier * (p1[this.sortBy] - p2[this.sortBy]);

            return modifier * p1[this.sortBy].localeCompare(p2[this.sortBy]);
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
          })
      );
    },
  },

  methods: {
    sort(sortby) {
      if (sortby === this.sortBy) {
        if (this.sortDirection === 'desc') {
          this.sortBy = '';
          this.sortDirection = 'asc';
          return;
        }

        if (this.sortDirection === 'asc') {
          this.sortDirection = 'desc';
          return;
        }
      }

      this.sortDirection = 'asc';
      this.sortBy = sortby;
    },

    fetchUsers() {
      axios('https://randomuser.me/api/?results=20').then(
        ({ data: { results } }) => {
          this.nonFilteredUsers = results.map((user) => ({
            age: user.dob.age,
            name: `${user.name.first} ${user.name.last.toUpperCase()}`,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            avatar: user.picture.thumbnail,
          }));
        },
      );
    },
  },
};
</script>

<style>
.highlight {
  color: red
}
</style>
