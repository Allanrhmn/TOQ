export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "")
    .substring(0, 255);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.toLowerCase());
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
}

export function validatePostalCode(postalCode: string, country: string): boolean {
  const patterns: Record<string, RegExp> = {
    DK: /^\d{4}$/,
    SE: /^\d{5}$/,
    NO: /^\d{4}$/,
    DE: /^\d{5}$/,
    US: /^\d{5}(-\d{4})?$/,
    GB: /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i,
  };

  const pattern = patterns[country.toUpperCase()];
  if (!pattern) {
    return true;
  }

  return pattern.test(postalCode);
}

export function validateStockQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity > 0 && quantity <= 10000;
}

export function validatePrice(price: number): boolean {
  return price > 0 && price <= 999999.99;
}

export function validateRating(rating: number): boolean {
  return Number.isInteger(rating) && rating >= 1 && rating <= 5;
}

export function validateDiscountAmount(amount: number, type: string): boolean {
  if (type === "percentage") {
    return amount > 0 && amount <= 100;
  }
  return amount > 0 && amount <= 999999.99;
}

export function validateOrderStatus(status: string): boolean {
  const validStatuses = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "refunded",
  ];
  return validStatuses.includes(status);
}

export function validatePaymentStatus(status: string): boolean {
  const validStatuses = ["unpaid", "paid", "failed", "refunded"];
  return validStatuses.includes(status);
}

export function validatePaymentMethod(method: string): boolean {
  const validMethods = ["stripe", "mobilepay", "bank_transfer", "cash"];
  return validMethods.includes(method.toLowerCase());
}

export function validateCountryCode(code: string): boolean {
  const countries = ["DK", "SE", "NO", "DE", "US", "GB", "FR", "IT", "ES", "NL"];
  return countries.includes(code.toUpperCase());
}

export function validateJson(json: string): boolean {
  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
}

export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeInput(value);
    } else if (typeof value === "number" || typeof value === "boolean") {
      sanitized[key] = value;
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === "string" ? sanitizeInput(item) : item
      );
    } else if (value === null) {
      sanitized[key] = null;
    }
  }

  return sanitized as T;
}

export function validateRequiredFields(
  obj: Record<string, any>,
  fields: string[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const field of fields) {
    if (!obj[field] || (typeof obj[field] === "string" && !obj[field].trim())) {
      errors.push(`${field} is required`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
