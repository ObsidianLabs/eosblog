<template>
  <div class="wrapper" id="login">
    <div class="center-wrapper">
      <h1 v-if="$auth.isLogin()">Welcome back, {{ $auth.account }}, redirecting to homepage...</h1>
      <h1 v-else>Login to EOS Blockchain</h1>
      <Form class="form" v-if="!$auth.isLogin()">
        <FormItem label="EOS Account Name">
          <Input
            type="text"
            v-model="form.accountName"
          />
        </FormItem>
        <FormItem label="EOS Private Key" v-if="!$auth.isLoginBefore()">
          <Input type="textarea" v-model="form.privateKey"/>
        </FormItem>
        <FormItem label="Password">
          <Input type="password" v-model="form.password"/>
        </FormItem>
        <FormItem label="Confirm Password" v-if="!$auth.isLoginBefore()">
          <Input type="password" v-model="form.confirmPassword"/>
        </FormItem>
        <FormItem>
          <Button @click="login" :loading="loading" type="primary">Login</Button>
          <Button @click="form = {}" style="margin-left: 8px">Reset</Button>
        </FormItem>
        <a v-if="$auth.isLoginBefore()" @click="showForgetConfirm = true">Forget password?</a>
        <Modal
          v-model="showForgetConfirm"
          title="Are you sure to reset the password?"
          okText="Confirm"
          cancelText="Cancel"
          @on-ok="resetAuth"
          @on-cancel="showForgetConfirm = false">
          <p>Reset password will remove your authorization info.</p>
          <p>You will have to input your account name and private key again</p>
      </Modal>
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
  Modal,
} from 'iview';

export default {
  name: 'login',
  data() {
    return {
      loading: false,
      showForgetConfirm: false,
      form: {
        accountName: this.$auth.account || '',
        privateKey: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  components: {
    Form,
    FormItem,
    Input,
    Button,
    Modal,
  },
  methods: {
    async login() {
      this.loading = true;
      let isLogin = false;
      if (this.$auth.isLoginBefore()) {
        isLogin = await this.$auth.login(this.form.accountName, this.form.password);
      } else if (this.form.password === this.form.confirmPassword) {
        isLogin = await this.$auth.login(this.form.accountName, this.form.password, this.form.privateKey);
      } else {
        // confirm password not match
      }

      if (isLogin) {
        this.$router.push('/');
      } else {
        console.log('failed');
      }
      this.loading = false;
      this.$forceUpdate();
    },
    resetAuth() {
      this.$auth.reset();
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  height: 900px;
  display: flex;
  justify-content: center;
  align-items: center;
  .center-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .form {
    width: 400px;
  }
}
</style>
