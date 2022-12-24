<template>
  <view>
    <!-- 地址 -->
    <view class="address-button" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
    </view>

    <!-- 渲染收货信息的盒子 -->
    <view class="address-info-box" @click="chooseAddress" v-else>
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：<text>escook</text></view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：<text>138XXXX5555</text></view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx </view>
      </view>
    </view>
    <!-- 边框线 -->
    <view class="address-cross-line">
      <o-divider lineColor="rgba(156,39,176,0.5)"></o-divider>
    </view>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapGetters,
    mapState
  } from 'vuex'
  export default {
    name: "my-address",
    data() {
      return {};
    },
    methods: {
      ...mapMutations('m_user', ['updataAddress']),
      async chooseAddress() {
        const [err, succ] = await uni.chooseAddress().catch((err) => err)
        if (err == null && succ.errMsg === 'chooseAddress:ok') {
          this.updataAddress(succ)
        }
        if (err && err.errMsg === 'chooseAddress:fail auth deny') {
          this.reAuth() // 调用 this.reAuth() 方法，向用户重新发起授权申请
        }
      },
      async reAuth() {
        // 3.1 提示用户对地址进行授权
        const [err2, confirmResult] = await uni.showModal({
          content: '检测到您没打开地址权限，是否去设置打开？',
          confirmText: "确认",
          cancelText: "取消",
        })

        // 3.2 如果弹框异常，则直接退出
        if (err2) return

        // 3.3 如果用户点击了 “取消” 按钮，则提示用户 “您取消了地址授权！”
        if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')

        // 3.4 如果用户点击了 “确认” 按钮，则调用 uni.openSetting() 方法进入授权页面，让用户重新进行授权
        if (confirmResult.confirm) return uni.openSetting({
          // 3.4.1 授权结束，需要对授权的结果做进一步判断
          success: (settingResult) => {
            // 3.4.2 地址授权的值等于 true，提示用户 “授权成功”
            if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
            // 3.4.3 地址授权的值等于 false，提示用户 “您取消了地址授权”
            if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
          }
        })
      }
    },
    computed: {
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addstr'])
    }
  }
</script>

<style lang="scss">
  .address-button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
  }

  .address-info-box {
    font-size: 13px;
    height: 90px;
    display: flex;
    flex-direction: column;
    padding: 5px 5px 0 5px;

    .row1 {
      display: flex;
      justify-content: space-between;

      .row1-right {
        display: flex;
        justify-content: space-between;
      }

    }

    .row2 {
      display: flex;
      align-items: center;
      margin-top: 10px;

      .row2-left {
        white-space: nowrap;
      }
    }
  }

  .address-cross-line {}
</style>
