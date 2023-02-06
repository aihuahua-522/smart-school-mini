import Message from 'tdesign-miniprogram/message/index';

export const showSuccess = (message) => {

    Message.success({
        context: this,
        offset: [20, 32],
        duration: 5000,
        icon: false,
        content: message,
    });
}


export const showError = (message) => {

    Message.error({
        context: this,
        offset: [20, 32],
        duration: 5000,
        icon: false,
        content: message,
    });
}


export const showInfo = (message) => {

    Message.info({
        context: this,
        offset: [20, 32],
        duration: 5000,
        icon: false,
        content: message,
    });
}


export const showWarning = (message) => {

    Message.warning({
        context: this,
        offset: [20, 32],
        duration: 5000,
        icon: false,
        content: message,
    });
}


