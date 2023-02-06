import { ossObject } from "./ossApi";

const { systemDomain } = require("./domain")

const systemName = 'system'

/*
 * oss文件上传
 * @param {*} id
 * @param {*} success
 * @param {*} fail
 */
export const systemFileUpload = (path, successCallback, fail) => {
  console.log('path', path);
  ossObject(systemName, path, successCallback, fail)
}
