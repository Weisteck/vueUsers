<template>
  <div>
    <h1>Detail</h1>
    <p>Voici le detail de l'utilisateur {{ user._id }}</p>
    <div class="row w-50 mx-auto">
      <div class="col-md-6">
        <img :src="user.avatarUrl">
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
          <dd>{{ user.details }}</dd>
        </dl>
      </div>
    </div>
    <button>Modifier mon profil</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: [],
      loading: false,
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      const { data: user } = await axios(`https://ynov-front.herokuapp.com/api/users/${this.$route.params.id}`);
      this.user = user.data;
      this.user = {
        ...user.data,
        age: new Date(
          Date.now() - new Date(user.data.birthDate).getTime(),
        ).getFullYear() - 1970,
      };
    },
  },
};
</script>
