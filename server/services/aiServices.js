export const generateDescription = async (productName) => {
  // simulate AI thinking time
  await new Promise((resolve) => setTimeout(resolve, 500));

  return `Premium quality ${productName} designed for comfort and style. Perfect choice for everyday use with durable material and modern design.`;
};