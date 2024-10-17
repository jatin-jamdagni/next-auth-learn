import EmailVerification from "@/components/email/email-verification";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificatioinMail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const confirmationLink = `https://3000-idx-next-auth-learngit-1728975951273.cluster-3g4scxt2njdd6uovkqyfcabgo6.cloudworkstations.dev/auth/new-verification?token=${token}`;
  console.log("this is my mial", email);
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
