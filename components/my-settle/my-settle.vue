<template>
  <view>
    <view class="settle-box">
      <label @click="checkedFullHandler">
        <radio class="select" color="#c00000" :checked="isFullChecked"> <text>全选</text></radio>
      </label>

      <view class="totle-count">
        合计:<text class="count">￥{{countAllPrice}}</text>
      </view>
      <view class="settle">
        结算({{countCheckedNum}})
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    name: "my-settle",
    data() {
      return {

      };
    },
    methods: {
      ...mapMutations('m_cart', ['checkedFull']),
      checkedFullHandler() {
        this.checkedFull(!this.isFullChecked)
      }
    },
    computed: {
      ...mapGetters('m_cart', ['countCheckedNum', 'total', 'countAllPrice']),
      isFullChecked() {
        return this.countCheckedNum === this.total
      }
    },

  }
</script>

<style lang="scss">
  .settle-box {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: white;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;

    .select {
      display: flex;
      align-items: center;
      font-size: 13px;
    }

    .count {
      color: #c00000;
      font-weight: bold;
    }

    .settle {
      height: 50px;
      background-color: #c00000;
      min-width: 100px;
      line-height: 50px;
      text-align: center;
      color: white;
    }
  }
</style>
