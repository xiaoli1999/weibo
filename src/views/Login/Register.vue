<template>
    <div class="register">
        <NavBar title="注册" left-text="" left-arrow @click-left="onClickLeft"/>
        <img class="logo" src="../../assets/logo.png" alt=""/>
        <van-form @submit="onSubmit">
            <van-field v-model="username" type="number" name="username" label="手机号" placeholder="请输入手机号" :rules="[{ required: true, message: '手机号必填' }]"/>
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" :rules="[{ required: true, message: '密码不能为空' }]"/>
            <div class="register-btn">
                <van-button round block type="info" :disabled="!username || !password || loading" native-type="submit" :loading="loading" loading-text="注册中...">注册</van-button>
            </div>
            <div class="go-register">已有账号 <span @click="$router.go(-1)">去登录</span></div>
        </van-form>
    </div>
</template>

<script>
import { NavBar } from 'vant'
import { userRegister } from '@/api/login'

export default {
    name: 'Register',
    components: { NavBar },
    data () {
        return {
            username: '',
            password: '',
            loading: false
        }
    },
    methods: {
        async onSubmit (val) {
            this.loading = true
            const data = { userName: val.username, passWord: val.password }
            const { code, msg } = await userRegister(data)
            if (code !== 200) {
                this.$toast.fail(msg)
                this.loading = false
            } else {
                this.loading = false
                this.$toast.success('注册成功！')
                await this.$router.replace('/login')
            }
        },
        onClickLeft () {
            this.$router.go(-1)
        }

    }
}
</script>

<style lang="less" scoped>
.register {
    width: 100%;
    position: relative;

    .logo {
        width: 80px;
        height: auto;
        margin: 80px auto 40px;
    }

    .register-btn {
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
