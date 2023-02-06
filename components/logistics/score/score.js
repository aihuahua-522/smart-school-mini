const data = {
  floor: [
    {
      label: '一层101'
    },
    {
      label: '一层102'
    },
    {
      label: '一层103'
    },
    {
      label: '二层201'
    },
    {
      label: '二层202'
    },
    {
      label: '二层203'
    },
    {
      label: '三层301'
    },
    {
      label: '三层302'
    },
    {
      label: '三层303'
    },
  ],
  areaList: [
    {
      value: '110100',
      label: '浦西校区',
      children: [
        {
          value: "101",
          label: "食堂",
          children: [
            {
              value: "1012",
              label: "一号食堂",
            },
            {
              value: "1013",
              label: "二号食堂"
            }
          ]
        },
        {
          value: "102",
          label: "办公区",
          children: [
            {
              value: "1012",
              label: "一号办公楼",
            },
            {
              value: "1013",
              label: "二号办公楼"
            }
          ]
        },
        {
          value: "101",
          label: "女生园区",
          children: [
            {
              value: "1012",
              label: "女一号楼",
            },
            {
              value: "1013",
              label: "女二号楼"
            },
            {
              value: "1012",
              label: "女三号楼",
            },
          ]
        },
        {
          value: "101",
          label: "教师公寓",
          children: [
            {
              value: "1012",
              label: "公寓一号",
            },
            {
              value: "1013",
              label: "公寓二号"
            }
          ]
        },
        {
          value: "101",
          label: "教学楼",
          children: [
            {
              value: "1012",
              label: "A教学楼",
            },
            {
              value: "1013",
              label: "B教学楼"
            }
          ]
        },
        {
          value: "101",
          label: "男生园区",
          children: [
            {
              value: "1012",
              label: "男一号楼",
            },
            {
              value: "1012",
              label: "男二号楼",
            },
            {
              value: "1012",
              label: "男三号楼",
            }
          ]
        }
      ],
    },
    {
      value: '110100',
      label: '浦西校区',
      children: [
        {
          value: "101",
          label: "食堂",
          children: [
            {
              value: "1012",
              label: "一号食堂",
            },
            {
              value: "1013",
              label: "二号食堂"
            }
          ]
        },
        {
          value: "102",
          label: "办公区",
          children: [
            {
              value: "1012",
              label: "一号办公楼",
            },
            {
              value: "1013",
              label: "二号办公楼"
            }
          ]
        },
        {
          value: "101",
          label: "女生园区",
          children: [
            {
              value: "1012",
              label: "女一号楼",
            },
            {
              value: "1013",
              label: "女二号楼"
            },
            {
              value: "1012",
              label: "女三号楼",
            },
          ]
        },
        {
          value: "101",
          label: "教师公寓",
          children: [
            {
              value: "1012",
              label: "公寓一号",
            },
            {
              value: "1013",
              label: "公寓二号"
            }
          ]
        },
        {
          value: "101",
          label: "教学楼",
          children: [
            {
              value: "1012",
              label: "A教学楼",
            },
            {
              value: "1013",
              label: "B教学楼"
            }
          ]
        },
        {
          value: "101",
          label: "男生园区",
          children: [
            {
              value: "1012",
              label: "男一号楼",
            },
            {
              value: "1012",
              label: "男二号楼",
            },
            {
              value: "1012",
              label: "男三号楼",
            }
          ]
        }
      ],
    },
  ],
};

Component({
  data: {
    options: data.areaList,
    note: '请选择宿舍',
    visible: false,
    floor: data.floor
  },
  methods: {
    skip() {
      wx.navigateTo({
        url: '/subpkg/pages/logistics/scorePage/scorePage',
      })
    },
    showCascader() {
      console.log('showCascader');
      this.setData({ visible: true });
    },
    onChange(e) {

      const { selectedOptions } = e.detail;

      this.setData({
        note: selectedOptions.map((item) => item.label).join('/'),
      });
    },
  },
});
