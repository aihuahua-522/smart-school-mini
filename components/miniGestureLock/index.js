import GestureLock from '../../libs/gestureLock.js';

Component({
  properties: {
    containerWidth: {
      type: Number
    },
    cycleRadius: {
      type: Number
    },
    password: {
      type: Array
    },
    showPassword:''
  },
  data: {
    gestureLock: {}, // 锁对象
    circleArray: [], // 圆对象数组
    lineArray: [], // 已激活锁之间的线段
    activeLine: {}, // 最后一个激活的锁与当前位置之间的线段
    error: false
  },
  methods: {
    onTouchStart(e) {
      this.data.gestureLock.onTouchStart(e);
      this.refesh();
    },

    onTouchMove(e) {
      this.data.gestureLock.onTouchMove(e);
      this.refesh();
    },
    onTouchEnd(e) {
      const checkPoints = this.data.gestureLock.onTouchEnd(e);

      //改造 如果未传递密码 说明是服务端校验
      if (!this.data.password) {
        this.triggerEvent('end', checkPoints);
        return;
      }
      if (checkPoints.join("") == this.data.password.join("")) {
        console.log("密码正确");
        this.refesh();
        this.triggerEvent('end', checkPoints);

      } else {
        console.log("密码错误");
        this.setData({
          error: true
        });
        setTimeout(() => {
          this.refesh();
          this.triggerEvent('end', checkPoints);
        }, 800);
      }
    },
    refesh() {
      this.setData({
        error: false,
        circleArray: this.data.gestureLock.getCycleArray(),
        lineArray: this.data.gestureLock.getLineArray(),
        activeLine: this.data.gestureLock.getActiveLine()
      });
      if (this.data.showPassword){
        console.log(this.data.showPassword)
        //如果传递了手势密码 就只展示
        const gesture = this.data.gestureLock.getCycleArray();
        const showPasswordArr = this.data.showPassword.split(",")
        console.log(showPasswordArr)
        gesture.forEach(res=>{
          if (showPasswordArr.find(temp => temp == res.count) ){
            //模拟触摸事件
            console.log({x:res.x,y:res.y})
            this.data.gestureLock.checkTouch({x:res.x,y:res.y})
          }
        })
        console.log(gesture)
        console.log('this.data.gestureLock.getLineArray()',this.data.gestureLock.getLineArray())
        this.setData({
          circleArray:gesture,
          lineArray: this.data.gestureLock.getLineArray(),
          activeLine: this.data.gestureLock.getActiveLine()
        })
      }
    },
    /**
     * 校验成功
     */
    success() {
      setTimeout(() => {
        this.refesh();
      }, 800);
    },
    /**
     * 校验失败
     */
    fail() {
      this.setData({
        error: true
      });
      setTimeout(() => {
        this.refesh();
      }, 800);
    },
  },
  ready() {
    this.setData({
      gestureLock: new GestureLock(this.data.containerWidth, this.data.cycleRadius)
    });
    this.refesh();
  }
})
