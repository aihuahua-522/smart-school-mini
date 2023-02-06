// components/logistics/repair.js
import {
  getRepair, fileUp, requestRoomTree, getRoomTree, logisticsFileUpload
} from '../../../../api/logisticsApi'
import {
  ossObject
} from '../../../../api/activityApi'
import { logisticsStatusKey, getDict } from '../../../../api/dictApi'
import { showError } from "../../../../utils/MessageUtil";
const PICKER_KEY = {
  CUT: 'cut',
  DATE: 'date',
  SITE: 'site',
};
const app = getApp()
Page({
  data: {
    bucketName: '123',
    logisticsStatusKeyType: [],
    param: {
      name: '',
      phone: null,
      orderTime: '',
      roomId: '',
      repairType: '',
      repairQuestion: '',
      repairImage: ''
    },
    cutCurrentValue: '',
    avatarPath: [],
    mode: '',
    datetimeVisible: false,
    datetime: new Date().getTime(),
    datetimeText: '',

    visible: false,
    PICKER_KEY,
    [`${PICKER_KEY.DATE}Visible`]: false,
    [`${PICKER_KEY.SITE}Visible`]: false,
    [`${PICKER_KEY.CUT}Visible`]: false,
    pickerTitle: '',
    //房间树形结构
    roomTree: [],
    [`${PICKER_KEY.DATE}Value`]: [],
    [`${PICKER_KEY.SITE}Value`]: [],
    [`${PICKER_KEY.CUT}Value`]: [],
    roomvisible: false,
    note: ''
  },
  showCascader() {
    this.setData({
      roomvisible: true
    })
  },
  getRepairType() {
    getDict(logisticsStatusKey, (res) => {
      this.setData({
        'logisticsStatusKeyType': res.data.map(item => {
          return {
            label: item.value,
            value: item.key,
          }
        })
      })
    }, () => { })
  },
  // 获取name输入框的值
  nameInput(e) {
    this.setData({
      'param.name': e.detail.value
    })
    console.log(this.data.param.name, 111);
  },
  // 获取phone输入框的值
  numberInput(e) {
    this.setData({
      'param.phone': parseInt(e.detail.value)
    })
    console.log(this.data.param.phone, 222);
  },
  // 预约时间
  showPicker(e) {
    const {
      mode
    } = e?.currentTarget?.dataset;
    this.setData({
      mode,
      [`${mode}Visible`]: true,
    });
  },
  hidePicker() {
    const {
      mode
    } = this.data;
    this.setData({
      [`${mode}Visible`]: false,
    });
  },
  onConfirm(e) {
    const {
      value
    } = e?.detail;
    const {
      mode
    } = this.data;

    console.log('confim', value);

    this.setData({
      [mode]: value,
      [`${mode}Text`]: value,
      'param.orderTime': value + ':00'
    });
    console.log(this.data.param.orderTime, 333);
    this.hidePicker();
  },



  // 选择器点击[位置，类型]
  joinArray(array) {
    return array.join('-');
  },
  onClickPicker(e) {
    const {
      key
    } = e?.currentTarget?.dataset;
    this.setData({
      [`${key}Visible`]: true,
    });
  },
  onColumnChange(e) {
    console.log('picker pick:', e);
  },

  getRoomTree() {
    requestRoomTree((res) => {
      this.setData({
        roomTree: res.data
      })
    }, () => { })
  },
  onPickerChange1(e) {
    const {
      key
    } = e?.currentTarget?.dataset;
    console.log('picker change:', e);
    this.setData({
      [`${key}Visible`]: false,
      [`${key}Value`]: e.detail.value,
      [`${key}CurrentValue`]: this.joinArray(e.detail.value),
      'param.room': parseInt(e.detail.value.slice(-1).toString())
    });
    console.log(this.data.param.room, 888);
  },
  onPickerChange2(e) {
    console.log(e, 'eeeeeeee');
    this.setData({
      cutCurrentValue: e.detail.label[0],
      'param.repairType': e.detail.value[0]
    })
    console.log(this.data.param);
    // const {
    //   key
    // } = e?.currentTarget?.dataset;
    // console.log('picker change:', e);
    // this.setData({
    //   [`${key}Visible`]: false,
    //   [`${key}Value`]: e.detail.value,
    //   [`${key}CurrentValue`]: this.joinArray(e.detail.value),
    //    'param.repairType':e.detail.columns[0].index
    // });
    // console.log(this.data.param.repairType,999);
  },
  onPickerCancel(e) {
    const {
      key
    } = e?.currentTarget?.dataset;
    console.log(e, '取消');
    console.log('picker1 cancel:');
    this.setData({
      [`${key}Visible`]: false,
    });
  },

  // 获取故障描述输入框的值
  questionInput(e) {
    this.setData({
      'param.repairQuestion': e.detail.value
    })
    console.log(this.data.param.repairQuestion, 666);
  },

  // 选择图片
  goChooseImg() {
    // 判断图片是否超过3张
    if (this.data.avatarPath.length >= 3) {
      wx.showToast({
        title: '最多选三张哦~~',
        icon: 'none'
      })
      return
    }
    //添加图片
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {

        console.log(res.tempFilePaths, '1');
        // 判断新增后的数组图片是否超过3张
        if (this.data.avatarPath.length + res.tempFilePaths.length <= 3) {
          // 遍历新增图片到数组中
          res.tempFilePaths.forEach((item) => {
            console.log('开始上传')
            logisticsFileUpload(item, (url) => {
              this.data.avatarPath.push(url)
              // 最新数组
              this.setData({
                avatarPath: this.data.avatarPath,
                'param.repairImage': this.data.avatarPath.join(',')
              })
            }, () => { })
          })

        } else {
          wx.showToast({
            title: '最多选三张哦~~',
            icon: 'none'
          })
          return
        }
      }
    });
  },
  //预览图片
  previewAvatarImage(e) {
    var i = e.currentTarget.dataset.index
    wx.previewImage({
      current: this.data.avatarPath[i],
      urls: this.data.avatarPath
    });
    console.log(this.data.avatarPath[i], 1);
  },
  //删除图片
  removeAvatarImage(e) {
    var i = e.currentTarget.dataset.index
    this.data.avatarPath.splice(i, 1)
    this.setData({
      avatarPath: this.data.avatarPath,
    })
  },
  handelTreeData(arr) {
    if (arr instanceof Array) {
      return arr.map((item) => {
        if (item.children?.length > 0) {
          this.handelTreeData(item.children)
        } else {
          delete item.children
        }
        return item
      })
    } else {
      return arr = []
    }
  },

  // 申请报修
  applyRepair() {
    console.log(this.data.param);
    if (!this.data.param.name) {
      showError('请填写姓名')
      return;
    }
    if (!this.data.param.phone) {
      showError('请填写手机号')
      return;
    }
    if (!this.data.param.orderTime) {
      showError('请填写预计时间')
      return;
    }
    if (!this.data.param.repairImage) {
      showError('请上传图片')
      return;
    }
    if (!this.data.param.roomId) {
      showError('请选择房间')
      return;
    }
    if (!this.data.param.repairType && this.data.param.repairType !== 0) {
      showError('请选择报修类型')
      return;
    }
    getRepair(this.data.param, (res) => {
      this.setData({
        note: '',
        name: '',
        phoneNumber: '',
        datetimeText: '',
        cutCurrentValue: '',
        content: '',
        avatarPath: [],
        param: {
          name: '',
          phone: null,
          orderTime: '',
          roomId: '',
          repairType: '',
          repairQuestion: '',
          repairImage: ''
        },
      })
      wx.showToast({
        title: '申请成功~',
        icon: 'none'
      })
      wx.navigateTo({
        url: '/subpkg/pages/logistics/repair-list/repair-list'
      })
    }, (err) => {
      wx.showToast({
        title: '申请失败~',
        icon: 'none'
      })
    })
  },

  loadUserInfo() {

    console.log(app.globalData.userInfo);
    //加载用户信息 回显姓名和手机号
    this.setData({
      'param.name': app.globalData.userInfo.realName,
      'param.phoneNumber': app.globalData.userInfo.phone,
      'param.roomId': app.globalData.userInfo.roomId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadUserInfo()
    this.getRepairType()
    this.getRoomTree()
    requestRoomTree((res) => {
      const s1 = this.handelTreeData(res.data)
      this.setData({
        bedroom: this.handelTreeData(res.data)
      })
      console.log(res.data, 'room', s1, 's1');
    })
  },
  onRoomChange(e) {
    const { selectedOptions, value } = e.detail;
    this.setData({
      note: selectedOptions?.map((item) => item.label).join('/'),
      'param.roomId': value
    });
    console.log(e.detail);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
