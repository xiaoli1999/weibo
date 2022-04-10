<template>
    <div>
        个人中心
        <div class="" style="margin: 20px 16px;">
            <van-button round block type="info" @click="$router.push('/login')">去登录</van-button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'User',
    data () {
        return {

        }
    },
    created () {

    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.home {
    width: 100%;
}
</style>
