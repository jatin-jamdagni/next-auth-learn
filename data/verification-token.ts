import prisma from "@/lib/db";

export const getVerificationToekByEmail = async (email: string) => {
  try {
    const vertificationToken = await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return vertificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationToekByToken = async (token: string) => {
    try {
      const vertificationToken = await prisma.verificationToken.findUnique({
        where: {
          token,
        },
      });
      return vertificationToken;
    } catch (error) {
      return null;
    }
  };
  