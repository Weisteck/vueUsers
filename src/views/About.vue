<template>
  <Header @fetchUsers="fetchUsers" />
</template>

<script>
import axios from 'axios';
import Header from '../components/Header.vue';

export default {
  components: {
    Header,
  },

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
