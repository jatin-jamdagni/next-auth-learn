// import EmailVerification from "@/components/email/email-verification";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationMail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const confirmationLink = `${process.env.APP_URL}/new-verification?token=${token}`;
    await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: "Confirm your email",
    react: `<p>Click<a href="${confirmationLink}">here</a> to confirm your email.</p>`,
  });

  // console.log("data of verificaiton email:", data);
  // console.log("error of verificaiton email:", error);

  //   if (error) {
  //     return { error: "Not able to send verification email" };
  //   }

  //   return {
  //     success: "Verification email sent!",
  //   };
};
