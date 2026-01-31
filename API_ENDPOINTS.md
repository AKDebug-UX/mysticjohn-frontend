# API Endpoints

## POST /admin/booking-types
**Summary**: Create booking type
**Description**: 
**Tags**: Admin
**Request Body**:
- Content-Type: application/json

---

## GET /admin/booking-types
**Summary**: Get all booking types
**Description**: 
**Tags**: Admin

---

## PUT /admin/booking-types/{typeId}
**Summary**: Update booking type
**Description**: 
**Tags**: Admin
**Parameters**:
- `typeId` (path):  (required)
**Request Body**:
- Content-Type: application/json

---

## DELETE /admin/booking-types/{typeId}
**Summary**: Delete booking type
**Description**: 
**Tags**: Admin
**Parameters**:
- `typeId` (path):  (required)

---

## POST /admin/events
**Summary**: Create event
**Description**: 
**Tags**: Admin
**Request Body**:
- Content-Type: application/json

---

## GET /admin/events
**Summary**: Get all events
**Description**: 
**Tags**: Admin

---

## PUT /admin/events/{eventId}
**Summary**: Update event
**Description**: 
**Tags**: Admin
**Parameters**:
- `eventId` (path):  (required)
**Request Body**:
- Content-Type: application/json

---

## DELETE /admin/events/{eventId}
**Summary**: Delete event
**Description**: 
**Tags**: Admin
**Parameters**:
- `eventId` (path):  (required)

---

## GET /admin/events/{eventId}/tickets
**Summary**: Get event tickets
**Description**: 
**Tags**: Admin
**Parameters**:
- `eventId` (path):  (required)

---

## POST /auth/register
**Summary**: Register a new user
**Description**: 
**Tags**: Auth
**Request Body**:
- Content-Type: application/json

---

## POST /auth/login
**Summary**: Login user
**Description**: 
**Tags**: Auth
**Request Body**:
- Content-Type: application/json

---

## POST /auth/refresh
**Summary**: Refresh access token
**Description**: 
**Tags**: Auth
**Request Body**:
- Content-Type: application/json

---

## POST /auth/forgot-password
**Summary**: Request password reset
**Description**: 
**Tags**: Auth
**Request Body**:
- Content-Type: application/json

---

## POST /auth/reset-password
**Summary**: Reset password with token
**Description**: 
**Tags**: Auth
**Request Body**:
- Content-Type: application/json

---

## POST /auth/change-password
**Summary**: Change password (authenticated user)
**Description**: 
**Tags**: Auth
**Request Body**:
- Content-Type: application/json

---

## GET /auth/profile
**Summary**: Get user profile
**Description**: 
**Tags**: Auth

---

## PUT /auth/profile
**Summary**: Update user profile
**Description**: 
**Tags**: Auth
**Request Body**:
- Content-Type: application/json

---

## POST /bookings
**Summary**: Create a new booking
**Description**: 
**Tags**: Bookings
**Request Body**:
- Content-Type: application/json

---

## GET /bookings/my
**Summary**: Get user's bookings
**Description**: 
**Tags**: Bookings
**Parameters**:
- `upcoming` (query):  

---

## GET /bookings/available-slots
**Summary**: Get available booking slots
**Description**: 
**Tags**: Bookings
**Parameters**:
- `date` (query):  (required)
- `duration` (query):  (required)

---

## DELETE /bookings/{bookingId}
**Summary**: Cancel a booking
**Description**: 
**Tags**: Bookings
**Parameters**:
- `bookingId` (path):  (required)

---

## POST /chat/send
**Summary**: Send message to psychic AI (uses 1 credit)
**Description**: 
**Tags**: AI Chat
**Request Body**:
- Content-Type: application/json

---

## GET /chat/history
**Summary**: Get current conversation history
**Description**: 
**Tags**: AI Chat

---

## GET /chat/conversations
**Summary**: Get all conversations
**Description**: 
**Tags**: AI Chat

---

## POST /chat/new
**Summary**: Start new conversation
**Description**: 
**Tags**: AI Chat

---

## DELETE /chat/conversations/{conversationId}
**Summary**: Delete a conversation
**Description**: 
**Tags**: AI Chat
**Parameters**:
- `conversationId` (path):  (required)

---

## POST /api/community/posts
**Summary**: Create a post
**Description**: 
**Tags**: Community
**Request Body**:
- Content-Type: application/json

---

## GET /api/community/feed
**Summary**: Get community feed
**Description**: 
**Tags**: Community
**Parameters**:
- `page` (query):  
- `limit` (query):  

---

## GET /community/hashtag/{hashtag}
**Summary**: Get posts by hashtag
**Description**: 
**Tags**: Community
**Parameters**:
- `hashtag` (path):  (required)
- `page` (query):  
- `limit` (query):  

---

## POST /api/community/posts/{postId}/like
**Summary**: Like a post
**Description**: 
**Tags**: Community
**Parameters**:
- `postId` (path):  (required)

---

## POST /api/community/posts/{postId}/comment
**Summary**: Add comment to post
**Description**: 
**Tags**: Community
**Parameters**:
- `postId` (path):  (required)
**Request Body**:
- Content-Type: application/json

---

## DELETE /api/community/posts/{postId}
**Summary**: Delete own post
**Description**: 
**Tags**: Community
**Parameters**:
- `postId` (path):  (required)

---

## POST /api/community/posts/{postId}/moderate
**Summary**: Moderate post (admin only)
**Description**: 
**Tags**: Community
**Parameters**:
- `postId` (path):  (required)
**Request Body**:
- Content-Type: application/json

---

## GET /content/horoscope
**Summary**: Get today's horoscope
**Description**: 
**Tags**: Content
**Parameters**:
- `starSign` (query):  (required)

---

## POST /content/horoscope
**Summary**: Create horoscope (admin only)
**Description**: 
**Tags**: Content
**Request Body**:
- Content-Type: application/json

---

## GET /content/horoscopes
**Summary**: Get all horoscopes for today
**Description**: 
**Tags**: Content

---

## GET /content/tarot-today
**Summary**: Get today's tarot card
**Description**: 
**Tags**: Content

---

## GET /content/tarot-cards
**Summary**: Get all tarot cards
**Description**: 
**Tags**: Content

---

## POST /content/tarot-card
**Summary**: Create tarot card (admin only)
**Description**: 
**Tags**: Content
**Request Body**:
- Content-Type: application/json

---

## GET /content/tarot-history
**Summary**: Get user's tarot reading history
**Description**: 
**Tags**: Content
**Parameters**:
- `limit` (query):  

---

## GET /courses
**Summary**: Get all active courses
**Description**: 
**Tags**: Courses
**Parameters**:
- `category` (query):  
- `level` (query):  

---

## POST /courses
**Summary**: Create new course (admin only)
**Description**: 
**Tags**: Courses
**Request Body**:
- Content-Type: application/json

---

## GET /courses/{courseId}
**Summary**: Get course details
**Description**: 
**Tags**: Courses
**Parameters**:
- `courseId` (path):  (required)

---

## PUT /courses/{courseId}
**Summary**: Update course (admin only)
**Description**: 
**Tags**: Courses
**Parameters**:
- `courseId` (path):  (required)
**Request Body**:
- Content-Type: application/json

---

## DELETE /courses/{courseId}
**Summary**: Delete course (admin only)
**Description**: 
**Tags**: Courses
**Parameters**:
- `courseId` (path):  (required)

---

## GET /courses/category/{category}
**Summary**: Get courses by category
**Description**: 
**Tags**: Courses
**Parameters**:
- `category` (path):  (required)

---

## GET /courses/my
**Summary**: Get user's enrolled courses
**Description**: 
**Tags**: Courses

---

## POST /courses/{courseId}/enroll
**Summary**: Enroll in a course
**Description**: 
**Tags**: Courses
**Parameters**:
- `courseId` (path):  (required)

---

## GET /courses/{courseId}/enrolled-count
**Summary**: Get course enrollment count
**Description**: 
**Tags**: Courses
**Parameters**:
- `courseId` (path):  (required)

---

## PATCH /courses/{courseId}/toggle
**Summary**: Toggle course active status (admin only)
**Description**: 
**Tags**: Courses
**Parameters**:
- `courseId` (path):  (required)

---

## GET /credit-packs
**Summary**: Get all active credit packs
**Description**: 
**Tags**: Credit Packs

---

## POST /credit-packs
**Summary**: Create new credit pack (admin only)
**Description**: 
**Tags**: Credit Packs
**Request Body**:
- Content-Type: application/json

---

## GET /credit-packs/{packId}
**Summary**: Get credit pack details
**Description**: 
**Tags**: Credit Packs
**Parameters**:
- `packId` (path):  (required)

---

## PUT /credit-packs/{packId}
**Summary**: Update credit pack (admin only)
**Description**: 
**Tags**: Credit Packs
**Parameters**:
- `packId` (path):  (required)
**Request Body**:
- Content-Type: application/json

---

## DELETE /credit-packs/{packId}
**Summary**: Delete credit pack (admin only)
**Description**: 
**Tags**: Credit Packs
**Parameters**:
- `packId` (path):  (required)

---

## PATCH /credit-packs/{packId}/toggle
**Summary**: Toggle credit pack active status (admin only)
**Description**: 
**Tags**: Credit Packs
**Parameters**:
- `packId` (path):  (required)

---

## POST /events
**Summary**: Create event
**Description**: 
**Tags**: Events
**Request Body**:
- Content-Type: application/json

---

## GET /events
**Summary**: Get events
**Description**: 
**Tags**: Events
**Parameters**:
- `upcoming` (query):  

---

## GET /events/{eventId}
**Summary**: Get event details
**Description**: 
**Tags**: Events
**Parameters**:
- `eventId` (path):  (required)

---

## GET /events/my-tickets
**Summary**: Get user's event tickets
**Description**: 
**Tags**: Events

---

## POST /messages
**Summary**: Send a message (uses credits)
**Description**: 
**Tags**: Messages
**Request Body**:
- Content-Type: application/json

---

## GET /messages
**Summary**: Get all messages (admin only)
**Description**: 
**Tags**: Messages

---

## GET /messages/my
**Summary**: Get user's messages
**Description**: 
**Tags**: Messages

---

## POST /messages/{messageId}/reply
**Summary**: Reply to a message (admin only)
**Description**: 
**Tags**: Messages
**Parameters**:
- `messageId` (path):  (required)
**Request Body**:
- Content-Type: application/json

---

## GET /messages/pending
**Summary**: Get pending messages (admin only)
**Description**: 
**Tags**: Messages

---

## POST /notifications/register
**Summary**: Register device for push notifications
**Description**: 
**Tags**: Notifications
**Request Body**:
- Content-Type: application/json

---

## POST /notifications/unregister
**Summary**: Unregister device from push notifications
**Description**: 
**Tags**: Notifications
**Request Body**:
- Content-Type: application/json

---

## POST /payments/booking-checkout
**Summary**: Create booking checkout session
**Description**: 
**Tags**: Payments
**Request Body**:
- Content-Type: application/json

---

## POST /payments/event-checkout
**Summary**: Create event checkout session
**Description**: 
**Tags**: Payments
**Request Body**:
- Content-Type: application/json

---

## POST /payments/credits-checkout
**Summary**: Create credits checkout session
**Description**: 
**Tags**: Payments
**Request Body**:
- Content-Type: application/json

---

## POST /payments/confirm
**Summary**: Confirm payment with Stripe session ID
**Description**: 
**Tags**: Payments
**Request Body**:
- Content-Type: application/json

---

## GET /payments/my
**Summary**: Get user's payments
**Description**: 
**Tags**: Payments

---

