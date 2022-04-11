<template>
    <div class="personal">
        <NavBar title="个人资料" left-text="" left-arrow @click-left="onClickLeft"/>
        <van-form @submit="onSubmit">
            <van-field v-model="username" type="number" name="username" label="手机号" placeholder="请输入手机号" :rules="[{ required: true, message: '手机号必填' }]"/>
        </van-form>
    </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
    name: 'User',
    components: { NavBar },
    data () {
        return {
            username: ''
        }
    },
    created () {

    },
    methods: {
        onClickLeft () {
            this.$router.go(-1)
        },
        async onSubmit (val) {

        }
    }
}
</script>

<style lang="less" scoped>
.personal {
    background: #f4f4f4;
}
</style>
