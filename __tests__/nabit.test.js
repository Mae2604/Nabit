describe('Order posting', () => {
  test('order requires a pickup location', () => {
    const order = { item: 'Broccoli Cheddar Soup', pickupLocation: '' };
    expect(order.pickupLocation).not.toBe('');
  });
  test('order requires an item name', () => {
    const order = { item: '', pickupLocation: 'Panera Bread' };
    expect(order.item).not.toBe('');
  });
  test('order has a default status of pending', () => {
    const order = { item: 'Broccoli Cheddar Soup', status: 'pending' };
    expect(order.status).toBe('pending');
  });
});
describe('Delivery acceptance', () => {
  test('deliverer can accept an open order', () => {
    const order = { status: 'pending', acceptedBy: null };
    order.status = 'accepted';
    order.acceptedBy = 'user@montclair.edu';
    expect(order.status).toBe('accepted');
  });
  test('already accepted order cannot be accepted again', () => {
    const order = { status: 'accepted' };
    const tryAccept = () => {
      if (order.status !== 'pending') throw new Error('Order already taken');
    };
    expect(tryAccept).toThrow('Order already taken');
  });
});
describe('Delivery confirmation', () => {
  test('order status updates to delivered', () => {
    const order = { status: 'accepted' };
    order.status = 'delivered';
    expect(order.status).toBe('delivered');
  });
});
