import mailjet from "node-mailjet";

const mailjetAPI = mailjet.connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

const sendEmail = (messageInfo) => {
  const emails = messageInfo.toEmail.map((email) => ({
    From: { Email: messageInfo.fromEmail, Name: messageInfo.fromName },
    To: [{ Email: email }],
    Subject: messageInfo.subject,
    HtmlPart: messageInfo.text,
  }));

  return mailjetAPI.post("send", { version: "v3.1" }).request({Messages: emails});
};

export async function sendOne(messageInfo) {
  try {
    return await sendEmail(messageInfo);
  } catch (message) {
    return console.error(message);
  }
}
