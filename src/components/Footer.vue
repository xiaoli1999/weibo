<template>
    <div class="footer">
        <van-tabbar v-model="active" active-color="#ff8200" @change="onChange" router>
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
            active: 0
        }
    },
    methods: {
        onChange (i) {
            this.active = i
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
