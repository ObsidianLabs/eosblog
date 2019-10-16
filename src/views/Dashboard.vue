<template>
  <div class="wrapper" id="dashboard">
    <div class="center-wrapper">
      <h1>Configure your blog</h1>
      <Form v-model="form" :label-width="120">
        <FormItem label="Blog Name">
          <Input v-model="form.blogname" placeholder="Your blog name" />
        </FormItem>
        <FormItem label="Blog Description">
          <Input v-model="form.description" placeholder="Your blog description" />
        </FormItem>
        <FormItem label="Blog Cover Image">
          <Input v-model="form.cover" placeholder="https://" />
        </FormItem>
        <FormItem class="actions">
          <Button @click="resetForm">Cancel</Button>
          <Button type="primary" @click="handleSubmit" :loading="loading">Submit</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import {
  Form,
  FormItem,
  Input,
  Button,
} from 'iview';

export default {
  name: 'dashboard',
  components: {
    Form,
    FormItem,
    Input,
    Button,
  },
  data() {
    return {
      form: {},
      loading: false,
    };
  },
  methods: {
    async fetchConfig() {
      this.form = await this.$post.fetchConfig() || {};
    },
    async handleSubmit() {
      // TODO
      this.loading = true;
      const result = await this.$post.updateConfig(this.form);
      if (result) {
        console.log('success');
        this.$router.push('/');
      }
      this.loading = false;
    },
    resetForm() {
      this.form = {};
    },
  },
  mounted() {
    this.fetchConfig();
  },
};
</script>

<style lang="scss" scoped>
#dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vw 0;
  h1 {
    text-align: center;
    padding: 3vw 0;
  }
  .center-wrapper {
    display: flex;
    flex-direction: column;
    min-width: 400px;
    max-width: 600px;
  }
  .actions {
    button {
      margin-right: 20px;
    }
  }
}
</style>
