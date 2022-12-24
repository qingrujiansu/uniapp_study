import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters('m_cart',['total'])
  },
  onShow(){
    this.setTabBar()
  },
  watch:{
    total(){
      this.setTabBar()
    }
  },
  methods:{
    setTabBar(){
      uni.setTabBarBadge({
        index:2,
        text:this.total+''
      })
    }
  }
}