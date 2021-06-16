<template>
  <form
    class="row w-50 mx-auto"
    @submit.prevent="saveUser"
  >
    <div class="col-md-6">
      <img
        :src="user.avatarUrl || baseImage"
        alt="profile"
        class="img-fluid"
      >
    </div>
    <div class="col-md-6 text-left">
      <div>
        <label for="lastName">Nom :</label>
        <input
          id="lastName"
          v-model="user.lastName"
        >
      </div>
      <div>
        <label for="firstName">Prenom :</label>
        <input
          id="firstName"
          v-model="user.firstName"
        >
      </div>
      <div>
        <label for="email">Email :</label>
        <input
          id="email"
          v-model="user.email"
        >
      </div>
      <div>
        <label for="birthDate">Anniversaire :</label>
        <input
          id="birthDate"
          v-model="user.birthDate"
          type="date"
        >
      </div>
      <div>
        <label for="mobilePhone">Telephone :</label>
        <input
          id="mobilePhone"
          v-model="user.phone"
          type="tel"
        >
      </div>
      <div>
        <label for="gender">Genre :</label>
        <input
          id="gender"
          v-model="user.gender"
        >
      </div>
      <div>
        <label for="detail">Detail :</label>
        <textarea
          id="detail"
          v-model="user.details"
        />
      </div>
      <div>
        <label for="urlImage">Image URL :</label>
        <input
          id="urlImage"
          v-model="user.avatarUrl"
        >
      </div>
    </div>
    <div class="col-md-12">
      <button type="submit">
        Sauvegarder
      </button>
    </div>
  </form>
</template>

<script>

export default {
  name: 'Formulaire',
  props: ['initialValues'],
  data() {
    return {
      user: this.initialValues,
      baseImage: 'https://sumaleeboxinggym.com/wp-content/uploads/2018/06/Generic-Profile-1600x1600.png',
    };
  },
  methods: {
    saveUser() {
      this.$emit('submit', this.user);
    },
  },
};
</script>
