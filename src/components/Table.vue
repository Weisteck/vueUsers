<template>
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
            v-for="user in sortedUsers"
            :key="user.email"
          >
            <td>
              <router-link :to="{name:'Detail', params:{'id': user.id}}">
                <img
                  :src="user.avatar"
                  class="img-fluid"
                >
              </router-link>
            </td>
            <td v-if="!user.nameFormated">
              {{ user.name }}
            </td>
            <td
              v-else
              v-html="user.nameFormated"
            />
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.age }}</td>
            <td>{{ user.gender }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['users'],
  data() {
    return {
      sortBy: '',
      sortDirection: 'asc',
    };
  },
  computed: {
    sortedUsers() {
      return [...this.users]
        // tri par ordre alphabétique
        .sort((p1, p2) => {
          const modifier = this.sortDirection === 'asc' ? 1 : -1;

          if (!this.sortBy) return 0;

          if (typeof p1[this.sortBy] === 'number') return modifier * (p1[this.sortBy] - p2[this.sortBy]);

          return modifier * p1[this.sortBy].localeCompare(p2[this.sortBy]);
        });
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
  },
};
</script>

<style>
.highlight {
  color: red;
}
</style>
