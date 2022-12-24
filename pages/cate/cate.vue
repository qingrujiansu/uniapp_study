<template>
  <view>
    <my-search></my-search>
    <view class="scroll-view-container">
      <!-- 左侧视图滚动区域 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height:wh + 'px'}">
        <block v-for="(item , index) in cateList" :key="index">
          <view :class="['left-scroll-view-item',index === active ? 'active' : '']" @click="activeChanged(index)">
            {{item.cat_name}}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧视图滚动区域 -->
      <scroll-view class="right-scroll-view" scroll-y :style="{height:wh + 'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item2 ,index) in cateLevel2" :key="index">
          <view class="cate-lv2-title"> /{{item2.cat_name}}/</view>
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item3,index) in item2.children" :key="index"
              @click="goToGoodsList(item3)">
              <!-- 图片 -->
              <image :src="item3.cat_icon.replace('api-ugo-dev','api-ugo-web')"></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    mixins:[badgeMix],
    data() {
      return {
        //可视区域的窗口高度
        wh: 0,
        cateList: [],
        active: 0,
        //二级分类列表
        cateLevel2: [],
        scrollTop: 0,
      }
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight - 50
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status !== 200) return uni.showMsg()
        this.cateList = res.message
        //为二级分类赋值
        this.cateLevel2 = res.message[0].children
      },
      activeChanged(index) {
        console.log(index);
        this.active = index
        //当发生变化的时候为二级分类重新赋值
        this.cateLevel2 = this.cateList[index].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      goToGoodsList(item3) {
        uni.navigateTo({
          url: '/subPackage/goods_list/goods_list?cid=' + item3.cat_id
        })
      }
    }

  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        line-height: 60px;
        text-align: center;
        background-color: #f7f7f7;
        font-size: 12px;

        &.active {
          background-color: #ffffff;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }
    }
  }

  .cate-lv2-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }

  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;

    .cate-lv3-item {
      width: 33.33%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;

      image {
        width: 60px;
        height: 60px;
      }

      text {
        font-size: 12px;
      }
    }
  }
</style>
