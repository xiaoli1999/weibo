<template>
    <div class="about">
        <NavBar title="关于微博" left-text="" left-arrow @click-left="onClickLeft"/>
        <img src="../../../assets/about.jpg" alt="">
    </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
    name: 'About',
    components: { NavBar },
    data () {
        return {
        }
    },
    methods: {
        onClickLeft () {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less" scoped>
.about {
    background: #f4f4f4;

    > img {
        width: 100vw;
        height: calc(100vh - 46px);
    }
}
</style>
