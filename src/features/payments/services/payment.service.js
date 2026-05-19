/**
 * Production-ready mock payment gateway service.
 * Simulates Stripe/Razorpay webhook callbacks and UPI deep link routing.
 */
export const paymentService = {
  /**
   * Simulates a UPI intent flow transaction.
   * @param {number} amount 
   * @param {string} upiId 
   * @returns {Promise<{ transactionId: string, status: "SUCCESS" | "FAILED" }>}
   */
  initiateUPIPayment: (amount, upiId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!upiId.includes("@")) {
          reject(new Error("Invalid VPA format. Must contain '@' domain segment."));
        } else {
          resolve({
            transactionId: "TXN-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
            status: "SUCCESS"
          });
        }
      }, 1500);
    });
  },

  /**
   * Simulates PCI-compliant Credit Card tokenization and charge capturing.
   * @param {number} amount 
   * @param {Object} cardDetails 
   * @returns {Promise<{ chargeId: string, status: "SUCCESS" | "DECLINED" }>}
   */
  processCardPayment: (amount, cardDetails) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          chargeId: "CHG-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
          status: "SUCCESS"
        });
      }, 2000);
    });
  }
};
