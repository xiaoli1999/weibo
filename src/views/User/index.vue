<template>
    <div class="user">
        <header>
            <van-icon color="#303133" size="20" name="setting-o" />
        </header>
        <div class="info">
            <img src="../../assets/user.jpg" alt="" />
            <div class="info-content">
                <div class="info-content-title">你的黎吖</div>
                <div class="info-content-desc">简介：暂无简介</div>
            </div>
        </div>
        <div class="banner">
            <div class="banner-item">
                <div class="banner-item-num">12</div>
                <div class="banner-item-name">微博</div>
            </div>
            <div class="banner-item">
                <div class="banner-item-num">2</div>
                <div class="banner-item-name">关注</div>
            </div>
            <div class="banner-item">
                <div class="banner-item-num">6</div>
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
            <CellGroup inset>
                <Cell title="账号设置" is-link to="/password" />
                <Cell title="个人资料" is-link />
                <Cell title="安全中心" is-link />
                <Cell title="关于微博" is-link />
                <Cell title="版本号"  value="v 0.0.1" />
            </CellGroup>
        </div>

    </div>
</template>

<script>
import { Grid, GridItem, Cell, CellGroup } from 'vant'

export default {
    name: 'User',
    components: { Grid, GridItem, Cell, CellGroup },
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
@import "src/less/layout";
.user {
    background: #f4f4f4;

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

        > img {
            width: 54px;
            height: 54px;
            border-radius: 100%;
            overflow: hidden;
            margin-right: 14px;
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
}
</style>
