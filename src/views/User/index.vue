<template>
    <div class="user">
        <header>
            <van-icon color="#303133" size="20" name="setting-o" @click="$router.push('/user/personal')" />
        </header>
        <div class="info" @click="$router.push('/user/personal')">
            <div class="info-img">
                <img v-if="UserInfo.img && UserInfo.img.length" :src="UserInfo.img[0].content" alt="" />
                <van-icon v-else size="54" color="#c9c9c9" name="smile-o" />
            </div>
            <div class="info-content">
                <div class="info-content-title">{{ UserInfo.nickname ? UserInfo.nickname : '暂无昵称' }}</div>
                <div class="info-content-desc">{{ UserInfo.present ? UserInfo.present : '简介：暂无简介' }} </div>
            </div>
        </div>
        <div class="banner">
            <div class="banner-item">
                <div class="banner-item-num">{{ UserInfo.username ? 12 : 0 }}</div>
                <div class="banner-item-name">微博</div>
            </div>
            <div class="banner-item">
                <div class="banner-item-num">{{ UserInfo.username ? 2 : 0 }}</div>
                <div class="banner-item-name">关注</div>
            </div>
            <div class="banner-item">
                <div class="banner-item-num">{{ UserInfo.username ? 6 : 0 }}</div>
                <div class="banner-item-name">粉丝</div>
            </div>
        </div>
        <div class="main">
            <Grid>
                <GridItem icon="photo-o" text="我的图片" />
                <GridItem icon="medal-o" text="赞/收藏" />
                <GridItem icon="underway-o" text="浏览记录" />
                <GridItem icon="description" text="草稿箱" />
                <GridItem icon="paid" text="我的钱包" />
                <GridItem icon="flower-o" text="创作中心" />
                <GridItem icon="send-gift-o" text="粉丝头条" />
                <GridItem icon="service-o" text="客服" />
            </Grid>
        </div>
        <div class="cells">
            <van-cell-group inset>
                <van-cell title="账号设置" is-link to="/password" />
                <van-cell title="个人资料" is-link to="/user/personal" />
                <van-cell title="安全中心" is-link />
                <van-cell title="关于微博" is-link />
                <van-cell title="版本号"  value="v 0.0.1" />
            </van-cell-group>
        </div>
        <div class="exit">
            <van-button v-if="UserInfo.username" round block type="info" size="small" @click="exit">退出登录</van-button>
            <van-button v-else round block type="info" size="small" @click="$router.push('/login')">去登录</van-button>
        </div>
    </div>
</template>

<script>
import { Grid, GridItem } from 'vant'
import { mapMutations, mapState } from 'vuex'

export default {
    name: 'User',
    components: { Grid, GridItem },
    data () {
        return {

        }
    },
    computed: {
        ...mapState(['UserInfo'])
    },
    created () {

    },
    methods: {
        ...mapMutations(['exit'])
    }
}
</script>

<style lang="less" scoped>
@import "src/less/layout";
.user {
    background: #f4f4f4;
    padding-bottom: 50px;

    header {
        height: 42px;
        padding: 0 8px;
        line-height: 48px;
        text-align: right;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    .info {
        padding: 0 8px;
        display: flex;
        align-items: center;

        .info-img {
            width: 54px;
            height: 54px;
            text-align: center;
            line-height: 54px;
            border-radius: 100%;
            overflow: hidden;
            margin-right: 14px;

            > img {
                width: 100%;
                height: 100%;
            }
        }
        > img {

        }

        .info-content {
            flex: 1;

            .info-content-title {
                max-width: 160px;
                height: 32px;
                line-height: 32px;
                font-size: 16px;
                color: #222;
                font-weight: 600;
                letter-spacing: 1px;
                .test-ellipsis;
            }

            .info-content-desc {
                max-width: 240px;
                height: 22px;
                line-height: 22px;
                font-size: 12px;
                color: #999;
                font-weight: 500;
                .test-ellipsis;
            }
        }
    }

    .banner {
        padding: 0 24px;
        margin-top: 12px;
        height: 58px;
        display: flex;
        align-items: center;
        justify-content: center;

        .banner-item {
            width: 33.33%;
            height: 58px;
            text-align: center;

            .banner-item-num {
                height: 30px;
                line-height: 40px;
                font-size: 14px;
                font-weight: 600;
                color: #323232;
            }
            .banner-item-name {
                height: 28px;
                font-size: 12px;
                color: #999;
            }
        }
    }

    .main {
        margin: 8px;
        border-radius: 8px;
        overflow: hidden;

        /deep/ .van-grid-item__content {
            padding: 12px 8px;
        }
    }

    .cells {
        margin: 8px;

        /deep/ .van-cell {
            position: relative;
            display: flex;
            box-sizing: border-box;
            width: 100%;
            padding: 10px 16px;
            overflow: hidden;
            color: #323233;
            font-size: 14px;
            line-height: 24px;
            background-color: #fff;
        }
    }

    .exit {
        margin: 20px 50px 0;

        Button {
            width: 160px;
            margin: 0 auto;
            border: 0;
            background-image: linear-gradient(to right, #e86b0f 0%, #ff8200 99%, #ff8200 100%);
        }
    }
}
</style>
