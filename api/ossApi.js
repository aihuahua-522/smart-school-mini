
import { showError, showSuccess } from "../utils/MessageUtil";
import { bbsDomain } from "./domain";

/*
 * oss文件上传
 * @param {*} systemName 系统名称
 * @param {*} id
 * @param {*} success
 * @param {*} fail
 */
export const ossObject = (systemName, path, successCallback, fail) => {
  wx.showLoading({
    title: '图片上传中',
  })
  console.log('path', path);
  console.log(getApp().globalData.tokenObj);
  wx.uploadFile({
    url: `http://smart-api.jxwazx.cn/system/common/oss/object/${systemName}`,//提交上传信息
    filePath: path,
    name: 'object',
    method: 'POST',
    header: {
      'Authorization': 'Bearer ' + getApp().globalData.tokenObj.access_token,
      'content-type': 'multipart/form-data'
    },
    success: function (res) {
      res = res.data
      wx.hideLoading()
      console.log(JSON.parse(res.data).code);
      if (JSON.parse(res.data).code != 200) {
        showError(JSON.parse(res.data).message)
        return;
      }

      console.log(JSON.parse(res.data).data.objectContent);
      console.log(JSON.parse(res.data).data.objectContent.httpRequest.uri);
      successCallback(JSON.parse(res.data).data.objectContent.httpRequest.uri)
      showSuccess('保存成功！')
    },
    fail() {
      wx.hideLoading()
      showError('网络加载失败')
    }
  })

}
