// components/logistics/repair.js
const PICKER_KEY = {
  CITY: 'city',
  YEAR_SEASONS: 'yearSeasons',
  DATE: 'date',
};
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    mode: '',
    datetimeVisible: false,
    datetime: new Date('2022-11-27').getTime(),
    datetimeText: '',

    visible: false,
    PICKER_KEY,
    [`${PICKER_KEY.DATE}Visible`]: false,
    [`${PICKER_KEY.YEAR_SEASONS}Visible`]: false,
    pickerTitle: '',
    school: [
      { label: '天工校区(三校)', value: '天工校区(三校)' },
      { label: '仙女湖校区(四校)', value: '仙女湖校区(四校)' },
    ],
    building: Array.from(new Array(12), (_, index) => ({
      label: `${index + 1}栋`,
      value: `${index + 1}栋`,
    })),
    bedroom: [
      { label: '101', value: '101' },
      { label: '102', value: '102' },
      { label: '103', value: '103' },
      { label: '104', value: '104' },
      { label: '201', value: '201' },
      { label: '202', value: '202' },
      { label: '301', value: '301' },
      { label: '402', value: '402' },
    ],
    // bedroom: Array.from(new Array(31), (_, index) => ({ label: `${index + 1}日`, value: index + 1 })),

    [`${PICKER_KEY.YEAR_SEASONS}Value`]: [],
    [`${PICKER_KEY.DATE}Value`]: [],
  },

  /**
   * 组件的方法列表
   */

  methods: {
    showPicker(e) {
      const { mode } = e?.currentTarget?.dataset;
      this.setData({
        mode,
        [`${mode}Visible`]: true,
      });
    },
    hidePicker() {
      const { mode } = this.data;
      this.setData({
        [`${mode}Visible`]: false,
      });
    },
    onConfirm(e) {
      const { value } = e?.detail;
      const { mode } = this.data;
  
      console.log('confim', value);
  
      this.setData({
        [mode]: value,
        [`${mode}Text`]: value,
      });
  
      this.hidePicker();
    },


    joinArray(array) {
      return array.join('-');
    },

    onClickPicker(e) {
      const { key } = e?.currentTarget?.dataset;

      this.setData({
        [`${key}Visible`]: true,
      });
    },

    onColumnChange(e) {
      console.log('picker pick:', e);
    },

    onPickerChange(e) {
      const { key } = e?.currentTarget?.dataset;
      console.log('picker change:', e.detail);
      this.setData({
        [`${key}Visible`]: false,
        [`${key}Value`]: e.detail.value,
        [`${key}CurrentValue`]: this.joinArray(e.detail.value),
      });
    },
    onPickerCancel(e) {
      const { key } = e?.currentTarget?.dataset;
      console.log(e, '取消');
      console.log('picker1 cancel:');
      this.setData({
        [`${key}Visible`]: false,
      });
    },
  },
})
