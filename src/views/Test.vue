<template>
  <div>
    <h1>TEST</h1>
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
    axios.get('/api/test')
      .then((res) => {
        this.data = res.data.message;
      });
  },
};
</script>
