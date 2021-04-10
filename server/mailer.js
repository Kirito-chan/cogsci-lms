import mailjet from "node-mailjet";

const mailjetAPI = mailjet.connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

const sendEmail = (messageInfo) => {
  return mailjetAPI.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: { Email: messageInfo.fromEmail, Name: messageInfo.fromName },
        To: [{ Email: messageInfo.toEmail }],
        Subject: messageInfo.subject,
        TextPart: messageInfo.text,
      },
    ],
  });
};

export async function sendOne(messageInfo) {
  try {
    return await sendEmail(messageInfo);
  } catch (message) {
    return console.error(message);
  }
}
