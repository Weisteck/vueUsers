<template>
  <div class="container-fluid">
    <Header @fetch-user="fetchUsers" />

    <Table :users="users" />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Table from '../components/Table.vue';

export default {
  components: { Header, Table },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    fetchUsers(users) {
      this.users = users;
    },
  },
};
</script>
