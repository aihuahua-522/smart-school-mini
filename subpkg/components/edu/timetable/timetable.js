// subpkg/components/edu/timetable/timetable.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    timetables: {
      type: Array,
      default: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    timetableType: [
      { index: '1', start: '08:00', end: '09:00' },
      { index: '2', start: '08:00', end: '09:00' },
      { index: '3', start: '08:00', end: '09:00' },
      { index: '4', start: '08:00', end: '09:00' },
      { index: '5', start: '08:00', end: '09:00' },
      // { index: '6', name: '' },
      // { index: '7', name: '' },
      // { index: '8', name: '' }
      // { index: '9', name: '' },
      // { index: '10', name: '' },
      // { index: '11', name: '' },
      // { index: '12', name: '' }
    ],
    weeks: {
      title: '10月',
      data: [
        {
          week: '周一',
          date: '10/10'
        },
        {
          week: '周二',
          date: '10/11'
        },
        {
          week: '周三',
          date: '10/10'
        },
        {
          week: '周四',
          date: '10/10'
        },
        {
          week: '周五',
          date: '10/10'
        },
        {
          week: '周六',
          date: '10/10'
        },
        {
          week: '周日',
          date: '10/10'
        },

      ]
    },
    // week: ['一', '二', '三', '四', '五', '六', '日'],

    itemHeight: '100rpx',

    allPalette: [
      '#f05261',
      '#48a8e4',
      '#ffd061',
      '#52db9a',
      '#70d3e6',
      '#52db9a',
      '#3f51b5',
      '#f3d147',
      '#4adbc3',
      '#673ab7',
      '#f3db49',
      '#76bfcd',
      '#b495e1',
      '#ff9800',
      '#8bc34a'
    ],
    mergeData: []
  },

  lifetimes: {
    attached() {
      console.log('attached');
      wx.setNavigationBarTitle({
        title: '第10周',
      })

      this.setData({
        mergeData: this.mergeData()
      })
      console.log(this.data.mergeData);
    },

  },
  pageLifetimes: {
    show() {
      console.log("show...");
      this.computeItemHeight()

    }

  },

  /**
   * 组件的方法列表
   */
  methods: {

    computeItemHeight() {
      // let query = wx.createSelectorQuery();
      // debugger

      // query.select('.row').boundingClientRect(rect => {
      //   console.log(rect);
      //   let clientHeight = rect.height;
      //   let clientWidth = rect.width;
      //   let ratio = 750 / clientWidth;
      //   let height = clientHeight * ratio;
      //   console.log(height);
      // }).exec();
    },
    mergeData() {
      // 为数据标记背景颜色的函数
      let paletteIndex = 0;
      const getBackgroundColor = () => {
        const backgroundColor = this.data.allPalette[paletteIndex];
        paletteIndex++;
        if (paletteIndex >= this.data.allPalette.length) {
          paletteIndex = 0;
        }
        return backgroundColor;
      };

      // 合并
      const listMerge = [];
      this.data.timetables.forEach(function (list, i) {
        if (!listMerge[i]) {
          listMerge[i] = [];
        }
        list.forEach(function (item, index) {
          if (!index) {
            return listMerge[i].push({ name: item, length: 1, backgroundColor: item === '' ? 'none' : getBackgroundColor() });
          }
          if (item === (listMerge[i][index - 1] || {}).name && item) {
            const sameIndex = (listMerge[i][index - 1] || {}).sameIndex;
            if (sameIndex || sameIndex === 0) {
              listMerge[i][sameIndex].length++;
              return listMerge[i].push({ name: item, length: 0, sameIndex: sameIndex });
            }
            listMerge[i][index - 1].length++;
            return listMerge[i].push({ name: item, length: 0, sameIndex: index - 1 });
          } else {
            return listMerge[i].push({ name: item, length: 1, backgroundColor: item === '' ? 'none' : getBackgroundColor() });
          }
        });
      });
      return listMerge;
    },
    todayWeekIndex() {
      let weekIndex = new Date().getDay() - 1;
      if (weekIndex === -1) {
        weekIndex = 6;
      }
      return weekIndex;
    },
    calendarChange(e) {
      this.$emit('calendarChange', e);
    },
    handleCourseClick(course, weekIndex, courseIndex) {
      const data = {
        index: courseIndex + 1,
        length: course.length,
        week: this.week[weekIndex],
        weekIndex: weekIndex,
        name: course.name
      };
      console.log(`星期${data.week}; 第${data.index}节课; 课程名:${data.name}; 课节:${data.length}`);
      console.log(data);
      this.$emit('courseClick', data);
    }
  }
})
