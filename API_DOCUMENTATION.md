# CREATSABR API Documentation

## Authentication Endpoints

### Customer Sign Up
- **Endpoint:** `POST /api/auth/signup`
- **Description:** Register a new customer account
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePassword123",
    "name": "John Doe"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Account created successfully",
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
  ```
- **Status Codes:** 201 (Created), 400 (Bad Request), 409 (Conflict - Email exists), 500 (Server Error)

### Customer Login
- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticate customer and receive JWT token
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePassword123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
  ```
- **Status Codes:** 200 (OK), 400 (Bad Request), 401 (Unauthorized), 500 (Server Error)

### Customer Logout
- **Endpoint:** `POST /api/auth/logout`
- **Description:** Logout customer and clear JWT token
- **Authentication:** Required (Customer JWT)
- **Response:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
- **Status Codes:** 200 (OK), 500 (Server Error)

---

## Customer Profile Endpoints

### Get Customer Profile
- **Endpoint:** `GET /api/customer/profile`
- **Description:** Fetch authenticated customer's profile information
- **Authentication:** Required (Customer JWT)
- **Response:**
  ```json
  {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+45 40 40 40 40",
    "country": "DK",
    "addresses": [],
    "reviewCount": 5,
    "createdAt": "2024-01-15T10:30:00Z"
  }
  ```
- **Status Codes:** 200 (OK), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)

### Update Customer Profile
- **Endpoint:** `PUT /api/customer/profile`
- **Description:** Update customer profile information
- **Authentication:** Required (Customer JWT)
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "phone": "+45 40 40 40 40",
    "country": "DK"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Profile updated successfully",
    "user": { ... }
  }
  ```
- **Status Codes:** 200 (OK), 400 (Bad Request), 401 (Unauthorized), 500 (Server Error)

### Get Customer Orders
- **Endpoint:** `GET /api/customer/orders`
- **Description:** Fetch all orders for the authenticated customer
- **Authentication:** Required (Customer JWT)
- **Response:**
  ```json
  {
    "orders": [
      {
        "id": "order-id",
        "orderNumber": "ORD-123456",
        "status": "delivered",
        "paymentStatus": "paid",
        "total": 599.99,
        "createdAt": "2024-01-15T10:30:00Z",
        "items": [ ... ]
      }
    ],
    "total": 1
  }
  ```
- **Status Codes:** 200 (OK), 401 (Unauthorized), 500 (Server Error)

---

## Cart Endpoints

### Get Cart
- **Endpoint:** `GET /api/cart`
- **Description:** Fetch authenticated customer's shopping cart
- **Authentication:** Required (Customer JWT)
- **Response:**
  ```json
  {
    "cart": {
      "id": "cart-id",
      "items": [
        {
          "id": "cart-item-id",
          "productId": "product-id",
          "quantity": 2,
          "product": {
            "id": "product-id",
            "title": "Product Name",
            "price": 199.99,
            "salePrice": 149.99,
            "images": [ ... ],
            "stock": 10
          }
        }
      ],
      "subtotal": 299.98,
      "itemCount": 1
    }
  }
  ```
- **Status Codes:** 200 (OK), 401 (Unauthorized), 500 (Server Error)

### Add Item to Cart
- **Endpoint:** `POST /api/cart`
- **Description:** Add a product to the customer's cart
- **Authentication:** Required (Customer JWT)
- **Request Body:**
  ```json
  {
    "productId": "product-id",
    "quantity": 2
  }
  ```
- **Response:**
  ```json
  {
    "message": "Product added to cart",
    "cart": { ... }
  }
  ```
- **Status Codes:** 200 (OK), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)

### Update Cart Item
- **Endpoint:** `PUT /api/cart`
- **Description:** Update quantity of a cart item
- **Authentication:** Required (Customer JWT)
- **Request Body:**
  ```json
  {
    "cartItemId": "cart-item-id",
    "quantity": 3
  }
  ```
- **Response:**
  ```json
  {
    "message": "Cart item updated",
    "cart": { ... }
  }
  ```
- **Status Codes:** 200 (OK), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)

### Remove Item from Cart
- **Endpoint:** `DELETE /api/cart`
- **Description:** Remove a product from the customer's cart
- **Authentication:** Required (Customer JWT)
- **Request Body:**
  ```json
  {
    "cartItemId": "cart-item-id"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Item removed from cart",
    "cart": { ... }
  }
  ```
- **Status Codes:** 200 (OK), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)

---

## Orders Endpoints

### Create Order
- **Endpoint:** `POST /api/orders`
- **Description:** Create a new order from cart items
- **Authentication:** Required (Customer JWT)
- **Request Body:**
  ```json
  {
    "cartItems": [
      {
        "productId": "product-id",
        "quantity": 2
      }
    ],
    "shippingAddress": {
      "name": "John Doe",
      "street": "Main Street 1",
      "city": "Copenhagen",
      "postalCode": "2100",
      "country": "DK",
      "phone": "+45 40 40 40 40"
    },
    "billingAddress": { ... },
    "paymentMethod": "stripe",
    "discountCode": "SUMMER20"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Order created successfully",
    "order": {
      "id": "order-id",
      "orderNumber": "ORD-123456",
      "total": 299.99,
      "status": "pending",
      "items": [ ... ]
    }
  }
  ```
- **Status Codes:** 201 (Created), 400 (Bad Request), 401 (Unauthorized), 500 (Server Error)

---

## Payment Endpoints

### Create Stripe Payment Session
- **Endpoint:** `POST /api/payment/stripe-session`
- **Description:** Create a Stripe checkout session for an order
- **Authentication:** Required (Customer JWT)
- **Request Body:**
  ```json
  {
    "orderId": "order-id"
  }
  ```
- **Response:**
  ```json
  {
    "sessionId": "cs_live_...",
    "url": "https://checkout.stripe.com/..."
  }
  ```
- **Status Codes:** 200 (OK), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)

### Create MobilePay Payment Session
- **Endpoint:** `POST /api/payment/mobilepay-session`
- **Description:** Create a MobilePay payment session for an order
- **Authentication:** Required (Customer JWT)
- **Request Body:**
  ```json
  {
    "orderId": "order-id"
  }
  ```
- **Response:**
  ```json
  {
    "paymentUrl": "https://...",
    "orderId": "order-id",
    "amount": 299.99,
    "currency": "DKK",
    "reference": "ORD-123456"
  }
  ```
- **Status Codes:** 200 (OK), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)

### Payment Webhook
- **Endpoint:** `POST /api/payment/webhook`
- **Description:** Webhook for Stripe payment events (must be configured in Stripe Dashboard)
- **Webhook Events:**
  - `checkout.session.completed` - Payment successful
  - `checkout.session.async_payment_succeeded` - Async payment success
  - `checkout.session.async_payment_failed` - Async payment failed
  - `charge.refunded` - Payment refunded
- **Security:** Verified using Stripe signature

---

## Discount Endpoints

### Validate Discount Code
- **Endpoint:** `POST /api/discounts/validate`
- **Description:** Validate a discount code and calculate discount amount
- **Request Body:**
  ```json
  {
    "code": "SUMMER20",
    "subtotal": 500.00
  }
  ```
- **Response:**
  ```json
  {
    "valid": true,
    "discount": {
      "code": "SUMMER20",
      "type": "percentage",
      "amount": 20,
      "discountAmount": 100.00
    }
  }
  ```
- **Status Codes:** 200 (OK), 400 (Bad Request), 404 (Not Found), 500 (Server Error)

---

## Address Endpoints

### Get Customer Addresses
- **Endpoint:** `GET /api/addresses`
- **Description:** Fetch all saved addresses for the customer
- **Authentication:** Required (Customer JWT)
- **Response:**
  ```json
  {
    "addresses": [
      {
        "id": "address-id",
        "name": "Home",
        "street": "Main Street 1",
        "city": "Copenhagen",
        "postalCode": "2100",
        "country": "DK",
        "phone": "+45 40 40 40 40",
        "isDefault": true
      }
    ]
  }
  ```
- **Status Codes:** 200 (OK), 401 (Unauthorized), 500 (Server Error)

### Create Address
- **Endpoint:** `POST /api/addresses`
- **Description:** Create a new saved address
- **Authentication:** Required (Customer JWT)
- **Request Body:**
  ```json
  {
    "name": "Home",
    "street": "Main Street 1",
    "city": "Copenhagen",
    "postalCode": "2100",
    "country": "DK",
    "phone": "+45 40 40 40 40",
    "isDefault": true
  }
  ```
- **Response:**
  ```json
  {
    "message": "Address created successfully",
    "address": { ... }
  }
  ```
- **Status Codes:** 201 (Created), 400 (Bad Request), 401 (Unauthorized), 500 (Server Error)

### Update Address
- **Endpoint:** `PUT /api/addresses/:id`
- **Description:** Update a saved address
- **Authentication:** Required (Customer JWT)
- **Parameters:** `id` - Address ID
- **Request Body:** (same as Create Address)
- **Response:**
  ```json
  {
    "message": "Address updated successfully",
    "address": { ... }
  }
  ```
- **Status Codes:** 200 (OK), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)

### Delete Address
- **Endpoint:** `DELETE /api/addresses/:id`
- **Description:** Delete a saved address
- **Authentication:** Required (Customer JWT)
- **Parameters:** `id` - Address ID
- **Response:**
  ```json
  {
    "message": "Address deleted successfully"
  }
  ```
- **Status Codes:** 200 (OK), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)

---

## Review Endpoints

### Create/Update Review
- **Endpoint:** `POST /api/reviews`
- **Description:** Create or update a product review
- **Authentication:** Required (Customer JWT)
- **Request Body:**
  ```json
  {
    "productId": "product-id",
    "rating": 5,
    "title": "Excellent product!",
    "comment": "This product exceeded my expectations..."
  }
  ```
- **Response:**
  ```json
  {
    "message": "Review created successfully",
    "review": { ... }
  }
  ```
- **Status Codes:** 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)

### Get Product Reviews
- **Endpoint:** `GET /api/reviews?productId=:productId`
- **Description:** Get all reviews for a product
- **Query Parameters:** `productId` - Product ID
- **Response:**
  ```json
  {
    "reviews": [ ... ],
    "averageRating": 4.5,
    "totalReviews": 10
  }
  ```
- **Status Codes:** 200 (OK), 400 (Bad Request), 500 (Server Error)

### Delete Review
- **Endpoint:** `DELETE /api/reviews/:id`
- **Description:** Delete a customer's review
- **Authentication:** Required (Customer JWT)
- **Parameters:** `id` - Review ID
- **Response:**
  ```json
  {
    "message": "Review deleted successfully"
  }
  ```
- **Status Codes:** 200 (OK), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)

---

## Error Responses

All endpoints follow a standard error response format:

```json
{
  "error": "Error message describing what went wrong"
}
```

### Common Status Codes
- **400 Bad Request** - Invalid request data or missing required fields
- **401 Unauthorized** - Missing or invalid authentication token
- **404 Not Found** - Resource not found
- **409 Conflict** - Resource already exists (e.g., email already registered)
- **500 Internal Server Error** - Server-side error

---

## Authentication

Most endpoints require a customer JWT token in the `customer_token` cookie. The token is automatically set after login/signup.

**Token Expiry:** 30 days

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

---

## Rate Limiting

Currently, no rate limiting is implemented. For production, consider implementing:
- Per-user rate limits (e.g., 100 requests per minute)
- Per-IP rate limits for auth endpoints
- Endpoint-specific limits (e.g., stricter on payment endpoints)

---

## Environment Variables Required

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
MOBILEPAY_API_KEY=your-key
MOBILEPAY_MERCHANT_ID=your-merchant-id
NEXT_PUBLIC_BASE_URL=https://creatsabr.com
```

---

## Testing the API

### Using cURL:

**Sign Up:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123","name":"John"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123"}' \
  -c cookies.txt
```

**Get Profile:**
```bash
curl http://localhost:3000/api/customer/profile \
  -b cookies.txt
```

---

## Security Considerations

1. **Password Hashing:** Passwords are hashed using bcryptjs with 10 salt rounds
2. **JWT Tokens:** Tokens are stored in httpOnly cookies to prevent XSS attacks
3. **Input Validation:** All inputs are validated and sanitized
4. **Stripe Webhooks:** Verified using Stripe signatures
5. **Authorization:** All customer endpoints verify user ownership of resources

---

## Future Enhancements

1. Rate limiting per user/IP
2. API key authentication for third-party integrations
3. Webhook support for custom integrations
4. Advanced filtering and pagination
5. Bulk operations for admin endpoints
6. Caching with Redis for product lists and reviews
7. Email notifications for order updates
