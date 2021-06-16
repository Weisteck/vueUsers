<template>
  <div>
    <h1>TEST pour DAVID</h1>
    <div>{{ data }}</div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: '',
    };
  },
  created() {
    axios.get('http://localhost:5000/api/test')
      .then((res) => {
        this.data = res.data.message;
      });
  },
};
</script>
