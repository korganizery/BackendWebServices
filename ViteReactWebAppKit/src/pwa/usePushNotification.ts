import { useEffect } from 'react';



// VAPID keys
// VAPID keys
const vapidKeys = {
    publicKey: "BEQwsMaZcjStsv9oZA7qhQHbSprKOpe05XIl_zcqNiDRCPZr-MoZs10Jcz3t8CRfKiaBzKG585TaKQc9iX7gF0U",
    privateKey: "pNEfhZGgE-AI7j8TbXHj1fVgd5bLmz3h2ttCbe90DFo",
};
const vapidPublicKey = vapidKeys.publicKey;

// 请求通知权限
const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
        throw new Error('Notification permission not granted');
    }
};

function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// 订阅推送通知
const subscribeUserToPush = async (registration: ServiceWorkerRegistration) => {
    // const registration = await navigator.serviceWorker.ready;
    // const subscription = await registration.pushManager.subscribe({
    //     userVisibleOnly: true,
    //     applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
    // });

    // // 发送订阅对象到服务器端
    // await fetch('http://localhost:5000/subscribe', {
    //     method: 'POST',
    //     body: JSON.stringify({ subscription }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });

    registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
    }).then((subscription) => {
        console.log('Subscribed successfully:', subscription);
        // 发送订阅信息到服务器
        fetch('/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }).catch((error) => {
        console.error('Error subscribing:', error);
    });
};

const usePushNotification = (registration: ServiceWorkerRegistration) => {
    useEffect(() => {
        const setupPushNotification = async () => {
            try {
                await requestNotificationPermission();
                await subscribeUserToPush(registration);
                console.log('推送通知订阅成功');
            } catch (error) {
                console.error('推送通知订阅失败', error);
            }
        };

        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setupPushNotification();
        }
    }, [registration]);
};

export default usePushNotification;
