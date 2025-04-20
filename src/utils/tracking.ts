export const generateTrackingNumber = (): string => {
  const prefix = "TRK";
  const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
  const timestamp = Date.now().toString().slice(-6);
  return `${prefix}-${randomPart}-${timestamp}`;
};
  