/**
 * Production-ready mock Kitchen orders pipeline coordinator service.
 * Pre-formatted to fetch active table slips and push state changes to local SSE or WebSockets.
 */
export const ordersService = {
  /**
   * Mock fetching active orders from table logs.
   * @returns {Promise<Array>}
   */
  fetchActiveOrders: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: "#1024", table: "Table 2", items: ["1x Masala Chai", "1x Butter Croissant"], total: 130, status: "pending" },
          { id: "#1025", table: "Table 5", items: ["1x Mango Lassi", "1x Chicken Wrap"], total: 260, status: "preparing" }
        ]);
      }, 800);
    });
  },

  /**
   * Simulates WebSockets/SSE status change trigger.
   * @param {string} orderId 
   * @param {string} status 
   * @returns {Promise<boolean>}
   */
  pushStatusUpdate: (orderId, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`SSE Push: Order ${orderId} shifted status to ${status}`);
        resolve(true);
      }, 500);
    });
  }
};
