<template>
    <div class="password">
        <NavBar title="更改密码" left-text="返回" left-arrow @click-left="onClickLeft"/>
        <img class="logo" src="../../assets/logo.png" alt=""/>
        <van-form @submit="onSubmit">
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" :rules="[{ required: true, message: '密码不能为空' }]"/>
            <div class="password-btn">
                <van-button round block type="info" :disabled="!password || loading" native-type="submit" :loading="loading" loading-text="更改中...">确认</van-button>
            </div>
            <div class="go-register">如果遇到账号被盗，忘记密码等问题，请前往微博安全中心</div>
        </van-form>
    </div>
</template>

<script>
import { NavBar } from 'vant'
import { userPassword } from '@/api/login'
import { mapState } from 'vuex'
export default {
    name: 'Password',
    components: { NavBar },
    data () {
        return {
            password: '',
            loading: false
        }
    },
    computed: {
        ...mapState(['UserInfo'])
    },
    methods: {
        async onSubmit (val) {
            this.loading = true
            const query = { passWord: val.password, userId: this.UserInfo.userId }
            const { code, msg } = await userPassword(query)
            if (code !== 200) {
                this.$toast.fail(msg)
                this.loading = false
            } else {
                this.$toast.success('更改成功')
                await this.$router.go(-1)
            }
        },
        onClickLeft () {
            this.$router.go(-1)
        }

    }
}
</script>

<style lang="less" scoped>
.password {
    width: 100%;
    position: relative;

    .logo {
        width: 80px;
        height: auto;
        margin: 80px auto 40px;
    }

    .password-btn {
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
        color: #999;

        &:hover {
            color: #696969;
        }
    }
}
</style>
