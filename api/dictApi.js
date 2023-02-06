import { get, post } from "./request"
const { extensionDomain } = require("./domain")

/**
 * 活动类型
 */
export const activityTpeKey = 'extension_activity_type'

/**
 * 活动状态
 */
export const activityStatusKey = 'activity_status'


/**
 * 故障类型
 */
export const logisticsStatusKey = 'fault_type'


/**
 * 充值方式
 */
export const logisticsElectricRechargeSource = 'electric_recharge_source'


export const KEY_dynamicType = 'dynamic_type'

/**
 * 请求获取数据字典
 * @param {*} key 
 * @param {*} success 
 * @param {*} fail 
 */
export const getDict = (key, success, fail) => {
  return get(`${extensionDomain}/common/dict/${key}`, {}, success, fail)
}
/**
 * 获取数据字典
 * @param dictKey
 * @param itemKey
 * @returns {*}
 */
export const getDictValue = (dictList, itemKey) => {
  return dictList.find((item) => {
    return item.key === itemKey
  })?.value
}


/**
 * 数据字典到options的转换器
 */
export const dictConvert = {
  'label': 'value',
  'value': 'key'
}


/**
 * 转换字典
 * @param {*} data 
 */
export const doDictConvert = (data) => {
  return data.map(item => {
    return {
      label: item.value,
      value: item.key
    }
  })
}
