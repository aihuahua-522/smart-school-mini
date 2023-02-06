Component({
    properties: {
        question: {
            type: Object,
            value: ""
        },
        disable: {
            type: Boolean,
            value: true
        }

    },
    data: {},

    methods: {
        onChange(event) {
            console.log('radio', event.detail.value);
            this.triggerEvent('change',  event.detail.value)
        },
    }
});
