import { Caveat, Inter } from 'next/font/google';

/**
 * SROTD typefaces. This is the only place they are chosen.
 *
 * Values use Caveat: loose handwritten print with a slight rightward slant,
 * and a 600/700 weight that stays readable in white on a dark photo.
 * Nanum Pen Script is the other face that was considered. Its Latin is a
 * thinner, more upright pen line and only ships at weight 400, so it fades
 * into a dark background. To switch, replace Caveat with Nanum_Pen_Script
 * and set weight to '400' (that family has no bold).
 *
 * Labels, the headline, and the signup use Inter.
 */
export const srotdHand = Caveat({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-srotd-hand',
  adjustFontFallback: true,
});

export const srotdSans = Inter({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  variable: '--font-srotd-sans',
  adjustFontFallback: true,
});
