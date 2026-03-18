// Shared business hours logic — used by Header, Footer, and any page
// that needs to display open/closed status.
//
// Server-side: import { isBusinessOpen, getStatusText } from '../utils/business-hours';
// Client-side: use the inlined <script> helper via updateBusinessStatus()

import { siteConfig } from '../config';

export function isBusinessOpen(): boolean {
  const hour = new Date().getHours();
  return hour >= siteConfig.hours.open && hour < siteConfig.hours.close;
}

export function getStatusText(): { text: string; icon: string; available: boolean } {
  if (isBusinessOpen()) {
    return { text: 'Available Now', icon: '✅', available: true };
  }
  return { text: 'Call Tomorrow 9AM', icon: '🌙', available: false };
}

/**
 * Client-side script to inject into pages that need real-time status updates.
 * Call this from an Astro component's <script> tag or inline it.
 *
 * Elements must have these IDs:
 *  - data-business-status: the container element
 *  - data-business-status-icon: the icon span (optional)
 *  - data-business-status-text: the text span
 */
export const businessHoursClientScript = `
function updateAllBusinessStatus() {
  var hour = new Date().getHours();
  var isOpen = hour >= ${siteConfig.hours.open} && hour < ${siteConfig.hours.close};
  var elements = document.querySelectorAll('[data-business-status]');
  elements.forEach(function(el) {
    var iconEl = el.querySelector('[data-business-status-icon]');
    var textEl = el.querySelector('[data-business-status-text]');
    if (textEl) {
      textEl.textContent = isOpen ? 'OPEN NOW' : '9AM - 9PM';
    }
    if (iconEl) {
      iconEl.textContent = isOpen ? '✅' : '🌙';
    }
    el.style.color = isOpen ? 'var(--aurora-green)' : 'var(--solar-orange)';
  });
}
updateAllBusinessStatus();
setInterval(updateAllBusinessStatus, 60000);
`;
