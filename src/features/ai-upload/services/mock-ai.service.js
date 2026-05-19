import { MENU_TEMPLATES } from "../mock/menu-templates";

/**
 * High-fidelity Simulated AI Service mapping pipeline timers.
 */
export const mockAIService = {
  /**
   * Simulates file upload progress latency.
   * @param {File} file 
   * @param {function(number): void} onProgress 
   * @returns {Promise<void>}
   */
  uploadFile: (file, onProgress) => {
    return new Promise((resolve, reject) => {
      let progress = 0;
      const speed = 100 / (10 + Math.random() * 15); // Dynamic upload duration
      
      const interval = setInterval(() => {
        progress += speed + Math.random() * 5;
        if (progress >= 100) {
          progress = 100;
          onProgress(100);
          clearInterval(interval);
          resolve();
        } else {
          onProgress(Math.round(progress));
        }
      }, 100);
    });
  },

  /**
   * Simulates character scanning, raw OCR extraction, and category alignments.
   * @param {File} file 
   * @returns {Promise<{ shopName: string, categories: Array }>}
   */
  extractMenu: (file) => {
    return new Promise((resolve) => {
      // Simulate typical AI OCR parser latency
      setTimeout(() => {
        // Select a template randomly so the user experiences variety
        const randIndex = Math.floor(Math.random() * MENU_TEMPLATES.length);
        const template = MENU_TEMPLATES[randIndex];
        
        // Return a deep clone so edits don't mutate our constant templates
        resolve(JSON.parse(JSON.stringify(template)));
      }, 3200);
    });
  }
};
