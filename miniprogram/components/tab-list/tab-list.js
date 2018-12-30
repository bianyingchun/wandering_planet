// components/tab-list/tab-list.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    list:{
      type:Array,
      value:[]
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    current_index:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggle_content(event){
      var index  = event.currentTarget.dataset.index;
      this.setData({current_index:index})
    }
  }
})
