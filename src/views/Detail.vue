<template>
  <div>
    <h1>Detail</h1>
    <p>Voici le detail de l'utilisateur {{ user._id }}</p>
    <div
      v-if="!edit"
      class="row w-50 mx-auto"
    >
      <div class="col-md-6">
        <img
          :src="user.avatarUrl"
          class="img-fluid"
        >
      </div>
      <div class="col-md-6 text-left">
        <dl>
          <dt>Nom :</dt>
          <dd>{{ user.lastName }}</dd>
          <dt>Prenom :</dt>
          <dd>{{ user.firstName }}</dd>
          <dt>Anniversaire :</dt>
          <dd>{{ user.birthDate }}</dd>
          <dt>Age :</dt>
          <dd>{{ user.age }}</dd>
          <dt>Telephone :</dt>
          <dd>{{ user.phone }}</dd>
          <dt>Genre :</dt>
          <dd>{{ user.gender }}</dd>
          <dt>Detail :</dt>
          <dd>
            <p v-html="details" />
          </dd>
        </dl>
      </div>
      <div class="col-md-12">
        <button @click="edit = true">
          Modifier le profil
        </button>
      </div>
    </div>
    <div v-else>
      <Formulaire
        :initial-values="user"
        @submit="updateUser"
      />
      <!--v-on:edit="closeSave"-->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Formulaire from '../components/Formulaire.vue';

export default {
  name: 'Detail',
  components: {
    Formulaire,
  },
  data() {
    return {
      user: {},
      edit: false,
    };
  },
  computed: {
    details() {
      return this.user.details?.replace(new RegExp('\\n', 'gi'), '<br>');
    },
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      const { data: user } = await axios.get(`https://ynov-front.herokuapp.com/api/users/${this.$route.params.id}`);
      this.user = {
        ...user.data,
        age: new Date(
          Date.now() - new Date(user.data.birthDate).getTime(),
        ).getFullYear() - 1970,
      };
    },
    async updateUser(userUpdated) {
      try {
        // eslint-disable-next-line no-underscore-dangle
        await axios.put(`https://ynov-front.herokuapp.com/api/users/${this.$route.params.id}`, userUpdated);
        this.$emit('notification', { type: 'success', message: "L'utilisateur a bien ete modifie" });
        await this.$router.push({ name: 'About' });
      } catch (e) {
        this.$emit('notification', { type: 'danger', message: e.message });
      }
    },
  },
};
</script>
