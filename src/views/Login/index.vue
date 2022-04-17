<template>
    <div class="login">
        <NavBar title="登录" left-text="" left-arrow @click-left="onClickLeft"/>
        <img class="logo" src="../../assets/logo.png" alt=""/>
        <van-form @submit="onSubmit">
            <van-field v-model="username" type="number" name="username" label="手机号" placeholder="请输入手机号" :rules="[{ required: true, message: '手机号必填' }]"/>
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" :rules="[{ required: true, message: '密码不能为空' }]"/>
            <div class="login-btn">
                <van-button round block type="info" :disabled="!username || !password || loading" native-type="submit" :loading="loading" loading-text="登录中...">登录</van-button>
            </div>
            <div class="go-register" @click="$router.push('/register')">还没有账号？<span >去注册</span></div>
        </van-form>
    </div>
</template>

<script>
import { NavBar } from 'vant'
import { userLogin } from '@/api/login'
import { mapState } from 'vuex'

export default {
    name: 'Login',
    components: { NavBar },
    data () {
        return {
            username: '',
            password: '',
            loading: false
        }
    },
    computed: {
        ...mapState(['UserInfo', 'UserList'])
    },
    methods: {
        async onSubmit (val) {
            this.loading = true
            const query = { userName: val.username, passWord: val.password }
            const { code, msg, data } = await userLogin(query)
            if (code !== 200) {
                this.$toast.fail(msg)
                this.loading = false
            } else {
                this.loading = false
                this.$store.commit('setState', ['UserInfo', data.userinfo])
                this.$store.commit('setState', ['Token', data.token])
                this.$toast.success('登录成功！ ')
                await this.$router.replace('/')
            }
        },
        onClickLeft () {
            this.$router.go(-1)
        }

    }
}
</script>

<style lang="less" scoped>
.login {
    width: 100%;
    position: relative;

    .logo {
        width: 80px;
        height: auto;
        margin: 80px auto 40px;
    }

    .login-btn {
        margin: 30px 16px 12px;

        Button {
            border: 0;
            background-image: linear-gradient(to right, #e86b0f 0%, #ff8200 99%, #ff8200 100%);
        }
    }

    .go-register {
        margin: 0 16px;
        text-align: center;
        font-size: 12px;
        line-height: 20px;

        span {
            color: #ff8200;
            cursor: pointer;

            &:hover {
                color: #e86b0f;
            }
        }
    }
}
</style>
