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
import { mapState } from 'vuex'
import { getHome, attentionUser, articleShare, articlePraise } from '@/api'
export default {
    name: 'Home',
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
                    city: '小米10 Pro',
                    isAttention: false,
                    shareNum: 5,
                    commentNum: 8,
                    praiseNum: 12,
                    isPraise: false
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
                    city: '小米10 Pro',
                    isAttention: false,
                    shareNum: 12,
                    commentNum: 16,
                    praiseNum: 18,
                    isPraise: true
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
                    city: '小米10 Pro',
                    isAttention: false,
                    shareNum: 24,
                    commentNum: 2,
                    praiseNum: 14,
                    isPraise: false
                }
            ]
        }
    },
    computed: {
        ...mapState(['UserInfo'])
    },
    created () {
        this.getHomeList()
    },
    methods: {
        async getHomeList () {
            const { msg, code, data } = await getHome({ userId: this.UserInfo.userId })
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
            await this.getHomeList()
            this.$toast('刷新成功')
            this.refreshLoading = false
        },
        async attention ([id, index]) {
            const query = {
                userId: id, // 暂定为被关注的用户的id
                id: this.UserInfo.userId // 关注的用户的id
            }
            const { code, msg } = await attentionUser(query)
            if (code !== 200) return this.$toast.fail(msg)
            // 做关注取关处理 本来打算只做关注的
            this.list[index].isAttention = !this.list[index].isAttention
            this.$toast(this.list[index].isAttention ? '已关注' : '取消关注')
        },
        async share ([id, index]) {
            const query = {
                wbId: id, // 微博id
                id: this.UserInfo.userId // 用户的id
            }
            const { code, msg } = await articleShare(query)
            if (code !== 200) return this.$toast.fail(msg)
            this.$toast('已转发')
            // TODO 暂不做判断， 后端做判断，已分享既会提示已分享
            this.list[index].shareNum += 1
            this.$toast('已转发')
        },
        async praise ([id, index]) {
            const query = {
                wbId: id, // 微博id
                id: this.UserInfo.userId // 用户的id
            }
            const { code, msg } = await articlePraise(query)
            if (code !== 200) return this.$toast.fail(msg)
            this.list[index].praiseNum = this.list[index].isPraise ? this.list[index].praiseNum-- : this.list[index].praiseNum++
            this.list[index].isPraise = !this.list[index].isPraise
            this.$toast(!this.list[index].isPraise ? '取消点赞' : '点赞成功')
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
