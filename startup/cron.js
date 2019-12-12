const cron = require("node-cron");
const admin = require("firebase-admin");
const axios = require("axios");
const config = require("../config");
let nodemailer = require("nodemailer");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { User, Doctor, Answer, Ingredient } = require("../startup/db");
const { generateToday } = require("../helpers/Date");

//TODO: PUSH NOTIFICATIONS CRON JOB
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: config.FCM_PROJECT_ID,
    clientEmail: config.FCM_CLIENT_EMAIL,
    privateKey: config.FCM_PRIVATE_KEY
  }),
  databaseURL: "https://pushnotif-33754.firebaseio.com"
});

const key = config.FCM_SERVER_KEY;
const to = config.FCM_TOKEN;

var notification = {
  title: "Sucks",
  body: "Sucks balls",
  icon:
    "https://icons-for-free.com/iconfiles/png/512/bottle+drink+drop+glass+resolutions+water+icon-1320084094734677285.png"
};

cron.schedule("*/20 * * * * *", async () => {
  try {
    const result = await axios("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization: "key=" + key,
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        notification: notification,
        to: to
      })
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});

//TODO: MAILING CRON JOB
//TODO: 1. second 2. minute 3. hour 4.day of month 5. month 6. day of week
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.MAILER_USER,
    pass: config.MAILER_PASSWORD
  }
});

cron.schedule("00 00 */1 * * 0-6", async () => {
  let users = await User.findAll({
    include: [Doctor]
  });
  console.log(users);
  const userList = users.map(u => u.dataValues);
  userList.forEach(async user => {
    const dailyReport = await Answer.findAll({
      where: {
        answerTime: {
          [Op.substring]: generateToday()
        }
      },
      include: [
        {
          model: User,
          through: {
            attributes: []
          },
          where: {
            id: user.id
          }
        },
        {
          model: Ingredient,
          through: {
            attributes: []
          }
        }
      ]
    });

    console.log(dailyReport);

    const dailyRender =
      dailyReport.length !== 0
        ? dailyReport.map(
            d =>
              `${d.answerTime
                .toString()
                .substring(0, 10)}: ${d.ingredients.reduce((a, b) => {
                return (
                  a +
                  `${b.dataValues.name}${
                    d.ingredients.indexOf(b) !== d.ingredients.length - 1
                      ? ", "
                      : ""
                  }`
                );
              }, "")}`
          )
        : "No Answers Today.";

    let mailOptions = {
      from: config.MAILER_USER,
      to: (user.doctor && user.doctor.dataValues.email) || "shawn@enclave.vn",
      subject: `[Daily Report] ${generateToday()} | ${user.name}`,
      text:
        typeof dailyRender === "string"
          ? "No Answers Today."
          : dailyRender.reduce(
              (a, b) =>
                a +
                `${b}${
                  dailyRender.indexOf(b) !== dailyRender.length - 1 ? " | " : ""
                }`,
              ""
            )
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(
          `Sending Email: ERROR | UserID: ${user.id} | Username: ${user.name} | Email: ${user.email}`
        );
      } else {
        console.log("Email sent successfully!");
      }
    });
  });
});
