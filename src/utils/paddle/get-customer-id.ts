import { getServerUser } from '@/utils/auth/session';
import { db } from '@/db';
import { customers } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getCustomerId() {
  const user = await getServerUser();
  if (user?.email) {
    const result = await db
      .select({ customerId: customers.customerId })
      .from(customers)
      .where(eq(customers.email, user.email))
      .limit(1);

    return result[0]?.customerId ?? '';
  }
  return '';
}
