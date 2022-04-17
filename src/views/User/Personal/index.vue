<template>
    <div class="personal">
        <NavBar title="个人资料" left-text="" left-arrow @click-left="onClickLeft"/>
        <div class="desc">填写个人资料</div>
        <van-form class="form" @submit="onSubmit" input-align="right">
            <van-field name="img" label="">
                <template #input>
                    <van-uploader v-model="userInfo.img" :max-count="1" :max-size="1000 * 1024" :after-read="beforeUpload" @oversize="$toast('文件大小不能超过 1M')" />
                </template>
            </van-field>
            <van-field v-model="userInfo.nickname" type="input" name="nickname" maxlength="12" label="昵称" />
            <van-field name="sex" label="单选框">
                <template #input>
                    <van-radio-group v-model="userInfo.sex" direction="horizontal">
                        <van-radio :name="0" checked-color="#ff8200">男</van-radio>
                        <van-radio :name="1" checked-color="#ff8200">女</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field v-model="userInfo.age" type="digit" name="age" label="年龄" />
            <van-field v-model="userInfo.address" type="input" name="address" maxlength="30" label="地址" />
            <van-field v-model="userInfo.hobby" type="input" name="hobby" maxlength="20" label="爱好" />
            <van-field v-model="userInfo.present" rows="2" autosize name="present" label="个人简介" type="textarea" maxlength="50" placeholder="留下点什么..." show-word-limit/>
            <div class="save">
                <van-button round block type="info" :disabled="loading" native-type="submit" :loading="loading" loading-text="保存中...">保存</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { NavBar } from 'vant'
import { mapState } from 'vuex'
import { saveUserInfo } from '@/api/user'

export default {
    name: 'Personal',
    components: { NavBar },
    data () {
        return {
            userInfo: {
                img: [],
                nickname: '',
                sex: '',
                age: '',
                address: '',
                hobby: '',
                present: ''
            },
            loading: false
        }
    },
    mounted () {
        this.userInfo = { ...this.userInfo, ...this.UserInfo }
    },
    computed: {
        ...mapState(['UserInfo'])
    },
    methods: {
        onClickLeft () {
            this.$router.go(-1)
        },
        beforeUpload (file) {
            file.status = 'uploading'
            file.message = '上传中...'

            setTimeout(() => {
                file.status = 'success'
                file.message = '上传成功'
                this.userInfo.img[0].url = this.userInfo.img[0].content
            }, 1000)
        },
        async onSubmit (val) {
                console.log(this.userInfo)
            this.loading = true
            const { code, msg } = await saveUserInfo(val)
            if (code !== 200) {
                this.loading = false
                this.$toast.error('保存失败！')
            } else {
                this.$store.commit('setState', ['UserInfo', this.userInfo])
                this.$toast.success(msg)
                this.loading = false
            }
        }
    }
}
</script>

<style lang="less" scoped>
.personal {
    background: #f4f4f4;

    .desc {
        margin: 20px 10px;
        font-size: 12px;
        color: #999;
        letter-spacing: 1px;
    }

    .form {
        margin: 8px;
        border-radius: 8px;
        overflow: hidden;

        .save {
            margin: 50px 16px 12px;

            Button {
                border: 0;
                background-image: linear-gradient(to right, #e86b0f 0%, #ff8200 99%, #ff8200 100%);
            }
        }

        /deep/ .van-uploader__preview-image {
            width: 60px;
            height: 60px;
            border-radius: 100%;
            overflow: hidden;
        }

        /deep/ .van-uploader__upload {
            width: 60px;
            height: 60px;
            border-radius: 100%;
            overflow: hidden;
        }

        /deep/ .van-uploader__preview {
            width: 60px;
            height: 60px;
            border-radius: 100%;
            overflow: hidden;
        }

        /deep/ .van-uploader__preview-delete {
            border-radius: 100%;
            width: 22px;
            height: 22px;
            right: 8px;
            top: 30px;
            font-size: 14px;
            text-align: center;
            background: rgba(0,0,0,.5);
        }
        /deep/ .van-uploader__preview-delete-icon {
            top: 1px;
            right: 1px;
            font-size: 20px;
            color: #fff;
        }

    }
}
</style>
