<template>
    <div class="add">
        <NavBar class="nav" title="发微博" left-text="取消" fixed @click-left="$router.back()">
            <template #right>
                <van-button :loading="loading" color="linear-gradient(to right, #e86b0f, #f3b06b)" round size="small" @click="save">发送</van-button>
            </template>
        </NavBar>
        <main>
            <van-field
                v-model="content"
                autosize
                type="textarea"
                maxlength="9999"
                placeholder="分享新鲜事..."
                show-word-limit
            />
        </main>
        <div class="line"></div>
        <van-field name="img" label="">
            <template #input>
                <van-uploader v-model="fileList" :max-count="9" multiple :max-size="500 * 1024" :after-read="beforeUpload" @oversize="$toast('文件大小不能超过 500kb')" />
            </template>
        </van-field>
    </div>
</template>

<script>
import { NavBar } from 'vant'
import { mapState } from 'vuex'
import { articleRelease } from '@/api'

export default {
    name: 'add',
    components: { NavBar },
    data () {
        return {
            content: '',
            fileList: [],
            loading: false
        }
    },
    computed: {
        ...mapState(['UserInfo'])
    },
    methods: {
        beforeUpload (file) {
            file.status = 'uploading'
            file.message = '上传中...'

            setTimeout(() => {
                file.status = 'success'
                file.message = '上传成功'
            }, 1000)
        },
        async save () {
            this.loading = true
            const data = {
                userId: this.UserInfo.userId,
                wbContent: this.content,
                wbImage: this.fileList.map(i => i.content).join('***')
            }
            if (!data.wbContent && !data.wbImage) {
                return this.$toast('您还未编辑')
            }
            setTimeout(async () => {
                const res = await articleRelease(data)
                if (res.code !== 200) {
                    return this.$toast(res.msg)
                } else {
                    this.$toast('发布成功！')
                    this.$router.back()
                }
                this.loading = false
            }, 2000)
        }
    }
}
</script>

<style lang="less" scoped>
.add {
    width: 100%;
    background: #fff;

    .nav {
        background: #fafbfb;

        /deep/ .van-nav-bar__left {
            padding: 0 12px;

        }

        /deep/ .van-nav-bar__right {
            padding: 0 12px;
            button {
                padding: 0 12px;
                letter-spacing: 2px;
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

    main {
        padding: 46px 0 0;
        min-height: 240px;
        font-size: 14px;
        color: #363636;

        /deep/ .van-field__control {
            word-break: break-all;
        }

        /deep/ .van-field__word-limit {
            color: #969696;
        }
    }

    .line {
        height: 10px;
        background: #f7f8fa;
    }
}
</style>
