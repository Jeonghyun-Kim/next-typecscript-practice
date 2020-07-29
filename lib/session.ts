import { withIronSession } from 'next-iron-session';

export default function withSession(handler: any) {
  console.log('withSession Called!');
  return withIronSession(handler, {
    password: 'ondisplay_secret_min_length_is_32',
    // password: process.env.SECRET_COOKIE_PASSWORD!,
    cookieName: 'next.js/examples/with-iron-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
}
