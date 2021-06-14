<template>
  <form
    class="row w-50 mx-auto"
    @submit.prevent="saveUser"
  >
    <div class="col-md-6">
      <img
        :src="user.avatarUrl"
        class="img-fluid"
      >
    </div>
    <div class="col-md-6 text-left">
      <dl>
        <label>Nom :</label>
        <input v-model="user.lastName">
        <label>Prenom :</label>
        <input v-model="user.firstName">
        <label>Anniversaire :</label>
        <input v-model="user.birthDate">
        <label>Telephone :</label>
        <input v-model="user.phone">
        <label>Genre :</label>
        <input v-model="user.gender">
        <label>Detail :</label>
        <textarea v-model="user.details" />
      </dl>
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
    };
  },
  methods: {
    saveUser() {
      this.$emit('submit', this.user);
    },
  },
};
</script>
