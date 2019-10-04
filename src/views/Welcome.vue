
<template>
  <div class="wrapper" id="welcome">
    <div class="center-wrapper">
      <Form class="welcome-form" :model="form" inline>
        <FormItem prop="endpoint">
          <Input
            type="text"
            v-model="form.endpoint"
            :style="{ width: '300px' }"
            placeholder="Endpoint"
            @keyup.native.enter="handleSubmit"
            prefix="ios-link-outline"/>
        </FormItem>
        <FormItem prop="user">
          <Input
            type="text"
            v-model="form.account"
            placeholder="Username"
            @keyup.native.enter="handleSubmit"
            prefix="ios-person-outline"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit">Go</Button>
        </FormItem>
    </Form>
    </div>
  </div>
</template>

<script>
import {
  Form, FormItem, Input, Button,
} from 'iview';

export default {
  name: 'welcome',
  components: {
    Form,
    FormItem,
    Input,
    Button,
  },
  data() {
    return {
      form: {
        endpoint: 'https://eos-studio.api.dfuse.dev',
      },
    };
  },
  methods: {
    handleSubmit() {
      if (this.form.account && this.form.endpoint) {
        localStorage.setItem('account', this.form.account);
        localStorage.setItem('endpoint', this.form.endpoint);
        this.$eos.endpoint = this.form.endpoint;
        this.$auth.account = this.form.account;
        this.$router.replace('/');
      } else {
        localStorage.removeItem('account');
        localStorage.removeItem('endpoint');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 800px;
  .welcome-form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
