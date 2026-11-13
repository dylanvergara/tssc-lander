'use server';

import { enrollSrotd } from '../../lib/srotd/subscribe';

export async function enrollSrotdAction(input) {
  return enrollSrotd({
    keyword: input?.keyword,
    firstName: input?.firstName,
    lastName: input?.lastName,
    phone: input?.phone,
    email: input?.email,
    utm: input?.utm,
  });
}
