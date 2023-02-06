import {get} from "./request";
import {imDomain} from "./domain";

export const imServer = 'ws://124.223.119.72:8899'

/**
 * 请求获取token
 */
export const requestToken = (success, fail) => {
  return get(`${imDomain}/user/token`, {}, success, fail)
}

/**
 * 设用户上线的命令
 * @type {number}
 */
export const onlineCommandType = 0

/**
 * 发送消息的命令 (对应如果是收到 则是服务器发送给小程序的)
 * @type {number}
 */
export const sendMessageCommandType = 1

/**
 * 收到消息 这时候应该要重置所有消息状态
 * @type {number}
 */
export const receiveMessageCommandType = 2

/**
 * 查询消息列表的指令
 * @type {number}
 */
export const selectMessageListCommandType = 3

/**
 * 查询用户详细信息
 * @type {number}
 */
export const selectOneUserDetailCommandType = 4

/**
 * 消息的ack机制
 * @type {number}
 */
export const sendMessageAckCommandType = 5

/**
 * 在详情界面收到消息
 * @type {number}
 */
export const receiveMessageDetailCommandType = 6

/**
 * 构建首次注册上线的请求
 * {
 *     "token": "DdFE55b8-93B3-2f94-748F-E2b451dFd78E",
 *     "commandType": 0
 * }
 * @param token
 */
export const onLineCommandBuild = (token) => {
  return JSON.stringify({
    token,
    commandType: onlineCommandType
  })
}

/**
 * 构建刷新消息的请求
 * @param token
 * @returns {string}
 */
export const getMessageListCommandBuild = () => {
  return JSON.stringify({
    commandType: selectMessageListCommandType
  })
}

/**
 * 构建用于请求消息详情的请求
 * @param userId
 * @returns {string}
 */
export const getMessageDetailCommandBuild = (userId) => {
  return JSON.stringify({
    commandType: selectOneUserDetailCommandType,
    userId
  })
}

/**
 * 构建用于发送消息的请求
 * @param content 内容
 * @param objectUserId 对象用户id
 * @param ackKey ack
 */
export const sendMessageCommandBuild = (content, objectUserId, ackKey) => {
  return JSON.stringify({
    commandType: sendMessageCommandType,
    objectUserId,
    content,
    ackKey
  })
}

/**
 * 构建收到消息(清空未读列表的请求)
 * @param userId
 * @returns {string}
 */
export const receiveMessageCommandTypeBuild = (userId) => {
  return JSON.stringify({
    userId,
    commandType: receiveMessageCommandType
  })
}