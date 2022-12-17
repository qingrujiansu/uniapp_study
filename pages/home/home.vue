<template>

  <view>
    <view class="search-box">
      <my-search @goToSearch="goToSearch"></my-search>
    </view>
    <!-- 轮播图区域 -->
    <swiper indicator-dots="ture" interval="3000" duration="1000" circular="ture" autoplay="true">
      <swiper-item v-for="(item) in swiperList" :key="item.goods_id">
        <navigator :url="'/subPackage/goods_detail/goods_detail?goods_id='+item.goods_id" class="swiper-item">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 导航分类区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) in navList" :key="index">
        <image :src="item.image_src" @click="navClickHandler(item)"></image>
      </view>
    </view>
    <!--  楼层区域  -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item1,index) in floorList" :key="index">
        <image :src="item1.floor_title.image_src" mode="" class="floor-title"></image>
        <view class="floor-img-box">
          <!-- 左侧大盒子的图片 -->
          <navigator class="left-img-box" :url="item1.product_list[0].url">
            <image :src="item1.product_list[0].image_src" mode="widthFix"></image>
          </navigator>
          <!-- 右侧大盒子的图片 -->
          <view class="right-img-box">
            <view class="right-img-box-image" v-for="(item2,index) in item1.product_list" :key="index">
              <navigator :url="item2.url">
                <image :src="item2.image_src" v-if="index !== 0 " mode="widthFix"
                  :style="{width:item2.image_width + 'rpx'}"></image>
              </navigator>
            </view>
          </view>

        </view>
      </view>
    </view>
  </view>


</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: [],
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) return uni.$showMsg();
        this.swiperList = res.message
      },
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg();
        this.navList = res.message
      },
      navClickHandler(item) {
        if (item.name == '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status != 200) return uni.$showMsg();
        res.message.forEach(floor => {
          floor.product_list.forEach(item => {
            item.url = '/subPackage/goods_list/goods_list?' + item.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      },
      goToSearch() {
        uni.navigateTo({
          url: '/subPackage/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  swiper {
    height: 350rpx;

    .swiper-item,
    image {
      height: 100%;
      width: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin-top: 10rpx;

    .nav-item image {
      width: 128rpx;
      height: 140rpx;
    }
  }


  .floor-item {
    margin-top: 10rpx;
  }

  .floor-title {
    height: 60rpx;
    width: 100%;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }

  .left-img-box {
    image {
      width: 232rpx;
    }
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

  }
</style>
