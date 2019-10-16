<template>
  <div class="wrapper" id="compose">
    <div class="center-wrapper">
      <h1 v-if="form.id">Edit a post</h1>
      <h1 v-else>Write a new post</h1>
      <Form :model="form" :label-width="80">
        <FormItem label="Title">
          <Input v-model="form.title" placeholder="A good post starts with a good title" />
        </FormItem>
        <FormItem label="Author">
          <Input v-model="form.author" :placeholder="$auth.account"/>
        </FormItem>
        <FormItem label="Cover">
          <Input v-model="form.cover" placeholder="https://..."/>
        </FormItem>
        <FormItem label="Category">
          <Input v-model="form.category" placeholder="The post should belongs a category"/>
        </FormItem>
        <FormItem label="Content">
          <Input
          type="textarea"
          :autosize="{ minRows: 20 }"
          placeholder="Write something"
          v-model="form.content"
        />
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
  name: 'compose',
  components: {
    Form,
    FormItem,
    Input,
    Button,
  },
  props: {
    id: {
      required: false,
      type: String,
    },
  },
  data() {
    return {
      form: {},
      loading: false,
    };
  },
  methods: {
    async fetchPost() {
      const result = await this.$post.fetchPost(this.id);
      if (result && result.id) {
        this.form = result;
      } else {
        this.resetForm();
      }
    },
    async handleSubmit() {
      this.loading = true;
      if (this.form.id) {
        const result = await this.$post.updatePost(this.form);
        if (result) {
          console.log('success');
          this.$router.push(`/post/${this.form.id}`);
        }
      } else {
        const result = await this.$post.createPost(this.form);
        if (result) {
          console.log('success');
          this.$router.push('/');
        }
      }

      this.loading = false;
    },
    resetForm() {
      this.form = {
        title: '',
        author: this.$auth.account,
        cover: '',
        category: '',
        content: '',
        metadata: JSON.stringify({}),
      };
    },
  },
  mounted() {
    this.resetForm();
    if (this.id) {
      this.fetchPost();
    }
  },
};
</script>

<style lang="scss" scoped>
#compose {
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
    max-width: 600px;
  }
  .actions {
    button {
      margin-right: 20px;
    }
  }
}
</style>
