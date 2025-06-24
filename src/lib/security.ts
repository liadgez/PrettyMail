
import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'span', 'div'],
    ALLOWED_ATTR: ['style', 'class'],
    ALLOW_DATA_ATTR: false
  });
};

/**
 * Validate content length
 */
export const validateContentLength = (content: string, maxLength: number = 50000): boolean => {
  return content.length <= maxLength;
};

/**
 * Sanitize CSS values to prevent CSS injection
 */
export const sanitizeCssValue = (value: string): string => {
  // Remove potentially dangerous characters and patterns
  return value
    .replace(/[<>'"]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/expression\(/gi, '');
};

/**
 * Rate limiting helper (simple implementation)
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  isAllowed(identifier: string, maxRequests: number = 100, windowMs: number = 60000): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!this.requests.has(identifier)) {
      this.requests.set(identifier, []);
    }
    
    const requests = this.requests.get(identifier)!;
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => time > windowStart);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    return true;
  }
}

export const rateLimiter = new RateLimiter();
