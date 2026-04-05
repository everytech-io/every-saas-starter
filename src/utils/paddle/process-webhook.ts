import {
  CustomerCreatedEvent,
  CustomerUpdatedEvent,
  EventEntity,
  EventName,
  SubscriptionCreatedEvent,
  SubscriptionUpdatedEvent,
} from '@paddle/paddle-node-sdk';
import { db } from '@/db';
import { customers, subscriptions } from '@/db/schema';

export class ProcessWebhook {
  async processEvent(eventData: EventEntity) {
    switch (eventData.eventType) {
      case EventName.SubscriptionCreated:
      case EventName.SubscriptionUpdated:
        await this.updateSubscriptionData(eventData);
        break;
      case EventName.CustomerCreated:
      case EventName.CustomerUpdated:
        await this.updateCustomerData(eventData);
        break;
    }
  }

  private async updateSubscriptionData(eventData: SubscriptionCreatedEvent | SubscriptionUpdatedEvent) {
    const values = {
      subscriptionId: eventData.data.id,
      subscriptionStatus: eventData.data.status,
      priceId: eventData.data.items[0].price?.id ?? '',
      productId: eventData.data.items[0].price?.productId ?? '',
      scheduledChange: eventData.data.scheduledChange?.effectiveAt ?? null,
      customerId: eventData.data.customerId,
    };

    await db
      .insert(subscriptions)
      .values(values)
      .onConflictDoUpdate({
        target: subscriptions.subscriptionId,
        set: {
          subscriptionStatus: values.subscriptionStatus,
          priceId: values.priceId,
          productId: values.productId,
          scheduledChange: values.scheduledChange,
          customerId: values.customerId,
        },
      });
  }

  private async updateCustomerData(eventData: CustomerCreatedEvent | CustomerUpdatedEvent) {
    const values = {
      customerId: eventData.data.id,
      email: eventData.data.email,
    };

    await db
      .insert(customers)
      .values(values)
      .onConflictDoUpdate({
        target: customers.customerId,
        set: { email: values.email },
      });
  }
}
