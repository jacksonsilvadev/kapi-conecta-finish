const { consume } = require('../helpers/rabbitmq');
const logger = require('../utils/logger');
const generateReport = require('../helpers/generate-report-order');

consume('report', async ({ content }) => {
  try {
    const order = JSON.parse(content.toString());
    logger.info(`Starting queue process for generate report on order ${order._id}`);
    await generateReport({ order });
    logger.info(`Generated report from order ${order._id}`);
  } catch (error) {
    logger.error(error);
  }
});
