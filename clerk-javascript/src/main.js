// import { Clerk } from "@clerk/clerk-js";

// const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// const clerk = new Clerk(clerkPubKey);
// await clerk.load();

// if (clerk.user) {
//   document.getElementById("app").innerHTML = `
//     <div id="user-button"></div>
//   `;

//   const userButtonDiv =
//     document.getElementById("user-button");

//   clerk.mountUserButton(userButtonDiv);
// } else {
//   document.getElementById("app").innerHTML = `
//     <div id="sign-in"></div>
//   `;

//   const signInDiv =
//     document.getElementById("sign-in");

//   clerk.mountSignIn(signInDiv);
// }

import { Clerk } from "@clerk/clerk-js";
import { Resend } from 'resend';

const resend = new Resend('re_KpPpkpF8_FVE447RG1ykE53d6xhgbsLNu');

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const clerk = new Clerk(clerkPubKey);
await clerk.load();

const user = clerk.user;
if (user) {
  const userEmail = user.primaryEmailAddress.emailAddress;
  console.log("Logged-in user email:", userEmail);
  
  try {
    const data = await resend.emails.send({
      from: 'your_email@example.com',
      to: [userEmail], // Send email to the logged-in user's email
      subject: 'Welcome to our app!',
      html: '<strong>Welcome! You are now logged in.</strong>'
    });

    console.log('Email sent:', data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
} else {
  console.log("No user is logged in");
}
