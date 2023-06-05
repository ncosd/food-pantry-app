import { setup } from '@storybook/vue3';
import Confidentiality from '@/components/Confidentiality.vue';

export default {
    title: 'components/Confidentiality',
    component: Confidentiality,
    tags: ['autodocs'],
    render: (args) => ({
        components: {
            Confidentiality,
        },
        setup() {
            return {
                ...args,
            };
        },
        template: '<confidentiality />',
    }),
    parameters: {
        layout: 'fullscreen',
    },
};

export const Today = {
    args: {
        'Signature of Staff Member/Volunteer': '',
        'Date': '',
        'Printed Name': '',
    },
};
