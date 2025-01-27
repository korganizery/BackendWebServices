import subscribeUser from "./usePushNotification";

export const serviceWorkers = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager.getSubscription().then((subscription) => {
        if (subscription) {
          subscription.unsubscribe().then(() => {
            console.log('Unsubscribed successfully.');
            subscribeUser(registration);
          }).catch((error) => {
            console.error('Error unsubscribing:', error);
          });
        } else {
          subscribeUser(registration);
        }
      });
    });
  }
};
