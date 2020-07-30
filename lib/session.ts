import { withIronSession } from 'next-iron-session';

export default function withSession(handler: any) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD!,
    cookieName: 'next.js/examples/with-iron-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
}
