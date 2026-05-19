export const billingService = {
  /**
   * Builds a structured tax compliance invoice model.
   * @param {Object} order 
   * @returns {Object} GST tax receipt specifications
   */
  generateInvoice: (order) => {
    const subtotal = order.total;
    const gstRate = 0.05; // 5% GST
    const baseAmount = Math.round(subtotal / (1 + gstRate));
    const gstAmount = subtotal - baseAmount;

    return {
      invoiceId: "INV-" + order.id.replace("#", ""),
      date: new Date().toLocaleDateString(),
      customerName: order.customer,
      tableNumber: order.table,
      items: order.items,
      baseAmount,
      gstAmount,
      grandTotal: subtotal,
      taxBreakdown: {
        cgst: gstAmount / 2,
        sgst: gstAmount / 2
      }
    };
  },

  /**
   * Mock utility simulating receipt downloading or printing.
   * @param {Object} invoice 
   * @returns {Promise<boolean>}
   */
  printThermalReceipt: (invoice) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Thermal print job sent to Cafe Aroma billing desk:", invoice);
        resolve(true);
      }, 1000);
    });
  }
};
