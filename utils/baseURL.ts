export const baseURL = process.env.VERCEL_URL
  ? "https://" + process.env.VERCEL_URL
  : process.env.NEXT_PUBLIC_VERCEL_URL
  ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
  : "http://localhost:3000";
