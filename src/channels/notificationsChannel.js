import { createConsumer } from "@rails/actioncable";

const consumer = createConsumer();

const subscribeToNotifications = (callback) => {
  consumer.subscriptions.create("NotificationsChannel", {
    connected() {
      console.log("Connected to NotificationsChannel!");
    },
    received(data) {
      callback(data);
    },
    disconnected() {
      console.log("Disconnected from NotificationsChannel!");
    },
  });
};

export default subscribeToNotifications;
