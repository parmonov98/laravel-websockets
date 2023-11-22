/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: false,
    wsHost: window.location.hostname,
    wsPort: 6001,
    authEndpoint: import.meta.env.VITE_PUSHER_HOST + '/broadcasting/auth',
    // auth: {
    //     headers: {
    //         Authorization: "Bearer " + localStorage.getItem('XSRF-TOKEN'),
    //         Accept: "application/json",

    //     }
    // },
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 7|RYipoqo52HsVpBhu1rj2o0YLmgVpAWF9x6ppIsRz65dce873'
                }

                axios.post('/api/broadcasting/auth',
                    {
                        socket_id: socketId,
                        channel_name: channel.name
                    },
                    {headers: headers}
                )
                    .then(response => {
                        callback(false, response.data);
                    })
                    .catch(error => {
                        callback(true, error);
                    });
            }
        };
    },
    // authorizer: (channel, options) => {
    //     return {
    //         authorize: (socketId, callback) => {
    //             fetch('/api/broadcasting/auth', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Accept: "application/json",
    //                     Authorization: 'Bearer ' + 'yJpdiI6IkFHYkxyUlNZdGE5VlhZYllaMC9naUE9PSIsInZhbHVlIjoiaUl6NlIvU0dTS2VwSzhPeDQzS0tWeTNSUXl2bm4xeGRsS0g3RGZaRU5ITXZaWTh6bGNOWHFST2Y3Yy94ZUVWQzdlcVZmUmgwam5MMDFZWUwvaDkwd1d2b3cxNDdkSEtSL0U4Szl1UUtzcWdCNkh6UXpyTzZFWjdmYUY5czJ6VWsiLCJtYWMiOiI0MmI4NTk5MDM5MmQwYTI5MTMzZTU3NzBhMDYwZTU0ZDUyOTY5NTRkNDU3ZDVkZTlhNjJlNWVlYmE0MDUyZTUwIiwidGFnIjoiIn0%3D',
    //                 },
    //                 body: JSON.stringify({
    //                     socket_id: socketId,
    //                     channel_name: channel.name
    //                 })
    //             })
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     callback(false, data);
    //                 })
    //                 .catch((error) => {
    //                     callback(true, error);
    //                 });
    //         }
    //     };
    // },
    // authorizer: (channel, options) => {
    //     return {
    //         authorize: (socketId, callback) => {
    //             axios.post('/api/broadcasting/auth', {
    //                 socket_id: socketId,
    //                 channel_name: channel.name
    //             })
    //                 .then(response => {
    //                     callback(null, response.data);
    //                 })
    //                 .catch(error => {
    //                     callback(error);
    //                 });
    //         }
    //     };
    // },
    // authorizer: (channel, options) => {
    //     return {
    //         authorize: (socketId, callback) => {
    //             axios.post('/api/broadcasting/auth', {
    //                 socket_id: socketId,
    //                 channel_name: channel.name
    //             })
    //                 .then(response => {
    //                     callback(null, response.data);
    //                 })
    //                 .catch(error => {
    //                     callback(error);
    //                 });
    //         }
    //     };
    // },
});


