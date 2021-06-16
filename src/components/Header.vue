<template>
  <div v-if="loading">
    <p>Loading...</p>
  </div>
  <div v-else>
    <div class="card mb-2 mt-2">
      <div class="card-header p-3">
        <h1>VueJS</h1>
        <div>
          <button
            class="btn btn-primary"
            @click="modal = true"
          >
            Create New Users
          </button>
        </div>
      </div>
      <Modal
        v-if="modal"
        @close="modal = false"
      >
        <template v-slot:body>
          <Formulaire
            initial-values="user"
            @submit="createUser"
          />
        </template>
      </Modal>
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
import Modal from './Modal.vue';
import Formulaire from './Formulaire.vue';

export default {
  name: 'Header',
  components: { Formulaire, Modal },
  data() {
    return {
      gender: '',
      age: '',
      nonFilteredUsers: [],
      filteredUser: [],
      search: '',
      loading: false,
      modal: false,
      user: {},
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
      axios('https://ynov-front.herokuapp.com/api/users').then(
        ({ data: { data } }) => {
          this.loading = false;
          this.nonFilteredUsers = data.map((user) => ({
            // eslint-disable-next-line no-underscore-dangle
            id: user._id,
            age: new Date(Date.now() - new Date(user.birthDate).getTime()).getFullYear() - 1970,
            name: `${user.firstName} ${user.lastName.toUpperCase()}`,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            avatar: user.avatarUrl,
          }));

          this.filteredUser = this.nonFilteredUsers;

          this.$emit('fetch-user', this.nonFilteredUsers);
        },
      );
    },
    async createUSer(userCreated) {
      try {
        await axios.post('https://ynov-front.herokuapp.com/api/users', userCreated);
        this.$emit('notification', {
          type: 'success',
          message: 'Le user a bien ete creee !',
        });
        this.$emit('close');
        this.fetchUsers(userCreated);
      } catch (e) {
        this.$emit('notification', { type: 'danger', message: e.message });
      }
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
