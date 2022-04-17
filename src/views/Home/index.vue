<template>
    <div class="home">
        <NavBar class="nav" title="新鲜事" left-text="" left-arrow fixed >
            <template #left>
                <img src="../../assets/logo.png" alt="">
            </template>
            <template #right>
                <van-icon name="add" size="24" @click="$router.push('/article/add')" />
            </template>
        </NavBar>
        <van-pull-refresh v-model="refreshLoading" success-text="热门微博更新成功" @refresh="onRefresh">
            <ArticleList v-if="list && list.length" :list="list" @attention="attention" @share="share" @praise="praise" />
            <van-empty v-else description="暂无微博" />
        </van-pull-refresh>
    </div>
</template>

<script>
import { NavBar } from 'vant'
import ArticleList from '../../components/ArticleList'
export default {
    name: 'Home',
    components: { NavBar, ArticleList },
    data () {
        return {
            refreshLoading: false,
            list: [
                {
                    id: 1,
                    name: '科技犬建哥',
                    avator: 'https://tvax2.sinaimg.cn/crop.30.0.1075.1075.180/5657b866ly1fu3arh82mvj20vm0u0who.jpg?KID=imgbed,tva&Expires=1650193490&ssig=t8LgBYUHwI',
                    content: '这叫什么穿搭？ ',
                    imgList: [
                        'https://wx2.sinaimg.cn/orj360/5657b866ly1h11emnkl72j20j60pkk2n.jpg',
                        'https://wx3.sinaimg.cn/orj360/5657b866ly1h11emnw50aj20j60pkqen.jpg'
                    ],
                    time: '4-15 15:11',
                    city: '小米10 Pro'
                },
                {
                    id: 1,
                    name: '科技犬建哥',
                    avator: 'https://tvax2.sinaimg.cn/crop.30.0.1075.1075.180/5657b866ly1fu3arh82mvj20vm0u0who.jpg?KID=imgbed,tva&Expires=1650193490&ssig=t8LgBYUHwI',
                    content: '这叫什么穿搭？ ',
                    imgList: [
                        'https://wx2.sinaimg.cn/orj360/5657b866ly1h11emnkl72j20j60pkk2n.jpg',
                        'https://wx3.sinaimg.cn/orj360/5657b866ly1h11emnw50aj20j60pkqen.jpg'
                    ],
                    time: '4-15 15:11',
                    city: '小米10 Pro'
                },
                {
                    id: 1,
                    name: '科技犬建哥',
                    avator: 'https://tvax2.sinaimg.cn/crop.30.0.1075.1075.180/5657b866ly1fu3arh82mvj20vm0u0who.jpg?KID=imgbed,tva&Expires=1650193490&ssig=t8LgBYUHwI',
                    content: '这叫什么穿搭？ ',
                    imgList: [
                        'https://wx2.sinaimg.cn/orj360/5657b866ly1h11emnkl72j20j60pkk2n.jpg',
                        'https://wx3.sinaimg.cn/orj360/5657b866ly1h11emnw50aj20j60pkqen.jpg'
                    ],
                    time: '4-15 15:11',
                    city: '小米10 Pro'
                }
            ],
            query: {
                page: 1
            }
        }
    },
    created () {

    },
    methods: {
        onRefresh () {
            setTimeout(() => {
                this.$toast('刷新成功')
                this.refreshLoading = false
            }, 1000)
        },
        attention ([id, index]) {
            this.$toast('已关注')
        },
        share ([id, index]) {
            this.$toast('已转发')
        },
        praise ([id, index]) {
            this.$toast('点赞成功')
        }
    }
}
</script>

<style lang="less" scoped>
.home {
    width: 100%;

    .nav {
        background: #fafbfb;

        /deep/ .van-nav-bar__left {
            padding: 0 12px;

            img {
                width: 26px;
                height: auto;
            }
        }

        /deep/ .van-nav-bar__right {
            padding: 0 12px;

            .van-icon {
                color: #ff8200 !important;
            }
        }

        /deep/ .van-nav-bar__text {
            color: #222;
        }

        /deep/ .van-nav-bar__title {
            font-size: 16px;
            font-weight: 500;
        }
    }

    /deep/ .van-pull-refresh {
        padding-top: 46px;
        min-height: calc(100vh - 96px);
        background: #fff;
    }
}
</style>
