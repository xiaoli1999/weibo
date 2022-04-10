<template>
    <div class="footer">
        <van-tabbar :value="active" active-color="#ff8200" router>
            <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/news" icon="friends-o" dot>消息</van-tabbar-item>
            <van-tabbar-item to="/user" icon="friends-o">个人中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data () {
        return {

        }
    },
    computed: {
        active () {
            if (this.$route.name === 'home') {
                return 0
            } else if (this.$route.name === 'news') {
                return 1
            } if (this.$route.name === 'user') {
                return 2
            } else {
                return 0
            }
        }
    }
}
</script>

<style lang="less" scoped>
.footer {
    /deep/ .van-tabbar--fixed {
        max-width: 500px;
        left: 0;
        right: 0;
        margin: 0 auto;
        border-top: 1px solid #eee;
    }
}
</style>
