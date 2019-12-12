import Caller from "./APICaller";

module.exports = {
  pushNotif(body) {
    return Caller("https://fcm.googleapis.com/fcm/send", "POST", body);
  }
};
