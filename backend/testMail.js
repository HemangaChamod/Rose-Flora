import "dotenv/config";

import { sendEmail } from "./src/lib/mailer.js";

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASSWORD);

await sendEmail({

    to: "chamodrathnawardana@gmail.com",

    subject: "Mail Test",

    html: "<h2>Email service is working successfully.</h2>",

});

console.log("Email sent successfully.");

process.exit();