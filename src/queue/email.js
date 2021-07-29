const { consume } = require('../helpers/rabbitmq');
const sendEmail = require('../helpers/send-order-email');
const logger = require('../utils/logger');

consume('email', async ({ content }) => {
  try {
    const order = JSON.parse(content.toString());
    logger.info(`Starting queue process for email on order ${order._id}`);

    await sendEmail({ order });
    logger.info(`Delivered email from order ${order._id}`);
  } catch (err) {
    logger.error(err);
  }
});
