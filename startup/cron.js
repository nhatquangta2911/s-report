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
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqYrLUBitqwDcV\n3morN56cuhhgIux65GKh16BsVVxX1VEn+32pg7Q83M4Uf+qR3zfIxetUvh54HWyO\n4glZEsyOANQ7gtlpG6Ox0W9lV5HLtj4/FnwAdEfx0YIBtxP/rR4C3n2mUOhndNko\n2pZevXYWE/0v8LbSJXpF1eHeThijuYu2NE8yEXXPma2/JcupHjTM4al7kIFNJTQH\nbviMrNsNQFpNyBa1iHVIG61G2zrlRo2IpJI/yGd83xWlixDp05oBS5cxDJ8G4MgD\nNiBDbW7V+rgm+0HcCJZfA9OC0OeIQ+5fbFS+Nzem4D93HQhNopqS2qfd7phLSvXU\nr9ZW6y0vAgMBAAECggEABrjDoRHoWbBS5qwSW/JUxwARyBvN7vHefyUfjZvh0NaU\niLbuMLyUndKAnlYxikN0qEPOmXLqoz+Psc9WIfYCrPqU8w8wGvikuct2X3UCYuIz\nxchD2hPYvBVffCvWQD/QBLoRoOqeNBP6ITPp89f50oMnJHCxLpOdCSgJs9+N9maa\n6J3eElWLW/f4Ac6jPkCvwLHGP3qPwCiZap/YvFdE7esLz/tnS+3wcIpt9zzSdeKw\nG/iGweufpITXcreANj/MF7+N0bcZuMPCDMjZKE3QYtxU1g5iX0gtxT4DrElELJAd\ng93IqwlyyilHA/RV2EBi04A84I41TuVbC9nwjwWjyQKBgQDRkysTY4CuHQNj3XAq\n9C0Ke5C+1aYN6HoHqRx5gVqoB+mL/fWXSlOE8sGWziGFyjCizmXqIQRAmgYJbFe7\nRNA6Jy5GdGpBr3X7AMGoM1kO/05uK1fGvcO3mRe4ZY0bcu+klPjVOAjaehvm2y7a\nXlhaVwAMiFAsWfvF50M7MB7TcwKBgQDQISIHiiDsKWJ2MmurPxCsfyybANedcpsy\nYuJJYY1qwlzfX2xigZVBdPZAa9djGDixqYOe47Q7SpGKIJg6TtXhm5ftyEg0tt1v\nfvMxaprbiqVSZ6pCdY61dr3tzSJOZ7Qr//eWXtw7IUvnQcqNuVYoey9LPXYljdTo\nidwUTocoVQKBgQCOJvnP4+0zrKBRC7F6oTcv5hKPLtG8m1Syf4W98Pyx/vPuLet4\nnES8aADhrp3UZwnIVKGSRqTgwNiZabC0aH+pAkyEI5CzTzWCdMfmtDWTU586YRHf\nz3XCwgfx3ofw92wPQbDqx2BR+QOV+lP0cIwTcvGojol7G+oIGc5jhkdSewKBgGzl\niRqMySEHnj7drrwQ6TZ36+zGCgqVVmKMnn1qj0WWoGU3VkxMJL305otaYX21xKQg\nX3+ZAEotf+zXlQ6dBQdgE6QUMMN0EnQt5iyq7I+GAW4WU10miR6lHEb6F8MSO5Dy\nAqcoxu4hQ8eiAssYd94CZgJmDBUmGon456+wTsNpAoGAeYiv5/VjlKRrutENc5Yi\n4Ht6kjyLsCb4oIY3aXWNhGhZHYkaEocYLxyKWfgxkIx39NkJDw6RUDlKR7D9QJYQ\ndTh1NY3YDlQhKaqlePtgHLmBnlmwMwS6/7POO/zz0TMEHn13GIm6N0RgYEiK7RoN\noMXncCW1HHWT5mC8DQFmcFI=\n-----END PRIVATE KEY-----\n".replace(
      /\\n/g,
      "\n"
    )
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

cron.schedule("*/5 * * * * *", async () => {
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
