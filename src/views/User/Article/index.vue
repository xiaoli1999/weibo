<template>
    <div class="article">
        <NavBar class="nav" title="我的微博" left-text="" left-arrow fixed @click-left="$router.back()"></NavBar>
        <van-pull-refresh v-model="refreshLoading" success-text="我的微博更新成功" @refresh="onRefresh">
            <ArticleList v-if="list && list.length" :list="list" :home="false" />
            <van-empty v-else description="暂无微博" />
        </van-pull-refresh>
    </div>
</template>

<script>
import { NavBar } from 'vant'
import ArticleList from '../../../components/ArticleList'
import { mapState } from 'vuex'
import { getMyArticle } from '@/api'
export default {
    name: 'MyArticle',
    components: { NavBar, ArticleList },
    data () {
        return {
            refreshLoading: false,
            list: [
                {
                    wbId: 1,
                    name: '科技犬建哥',
                    avatar: 'https://tvax2.sinaimg.cn/crop.30.0.1075.1075.180/5657b866ly1fu3arh82mvj20vm0u0who.jpg?KID=imgbed,tva&Expires=1650193490&ssig=t8LgBYUHwI',
                    homePageDisplay: '这叫什么穿搭？ ',
                    imgList: [
                        'https://wx2.sinaimg.cn/orj360/5657b866ly1h11emnkl72j20j60pkk2n.jpg',
                        'https://wx3.sinaimg.cn/orj360/5657b866ly1h11emnw50aj20j60pkqen.jpg',
                        'https://wx3.sinaimg.cn/orj360/5657b866ly1h11emnw50aj20j60pkqen.jpg'
                    ],
                    time: '4-15 15:11',
                    city: '小米10 Pro'
                },
                {
                    wbId: 2,
                    name: '科技犬建哥',
                    avatar: 'https://tvax2.sinaimg.cn/crop.30.0.1075.1075.180/5657b866ly1fu3arh82mvj20vm0u0who.jpg?KID=imgbed,tva&Expires=1650193490&ssig=t8LgBYUHwI',
                    homePageDisplay: '这叫什么穿搭？ ',
                    imgList: [
                        'https://wx2.sinaimg.cn/orj360/5657b866ly1h11emnkl72j20j60pkk2n.jpg',
                        'https://wx2.sinaimg.cn/orj360/5657b866ly1h11emnkl72j20j60pkk2n.jpg',
                        'https://wx3.sinaimg.cn/orj360/5657b866ly1h11emnw50aj20j60pkqen.jpg'
                    ],
                    time: '4-15 15:11',
                    city: '小米10 Pro'
                },
                {
                    wbId: 3,
                    name: '科技犬建哥',
                    avatar: 'https://tvax2.sinaimg.cn/crop.30.0.1075.1075.180/5657b866ly1fu3arh82mvj20vm0u0who.jpg?KID=imgbed,tva&Expires=1650193490&ssig=t8LgBYUHwI',
                    homePageDisplay: '这叫什么穿搭？ ',
                    imgList: [
                        'https://wx2.sinaimg.cn/orj360/5657b866ly1h11emnkl72j20j60pkk2n.jpg',
                        'https://wx3.sinaimg.cn/orj360/5657b866ly1h11emnw50aj20j60pkqen.jpg'
                    ],
                    time: '4-15 15:11',
                    city: '小米10 Pro'
                }
            ]
        }
    },
    computed: {
        ...mapState(['UserInfo'])
    },
    created () {
        this.getMyList()
    },
    methods: {
        async getMyList () {
            const { msg, code, data } = await getMyArticle(this.UserInfo.userId)
            if (code !== 200) return this.$toast.fail(msg)
            data.map(i => {
                i.imgList = i.wbImage.split('***')
                i.avatar = i.userInfo?.headPortrai ?? ''
                i.name = i.userInfo?.nickname ?? ''
                i.time = i.userInfo?.updateTime ?? ''
            })
            this.list = [...data, ...this.list]
        },
        async onRefresh () {
            await this.getMyArticle()
            this.$toast('刷新成功')
            this.refreshLoading = false
        }
    }
}
</script>

<style lang="less" scoped>
.article {
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
