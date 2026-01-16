(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
'use client';
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Common API Types
 */ __turbopack_context__.s([]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * API Configuration
 * Base URL for the backend API
 */ __turbopack_context__.s([
    "API_CONFIG",
    ()=>API_CONFIG,
    "getApiUrl",
    ()=>getApiUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_CONFIG = {
    baseURL: ("TURBOPACK compile-time value", "http://localhost:5000") || 'https://mystic-john-server-1.onrender.com',
    timeout: 30000
};
const getApiUrl = (endpoint)=>{
    // Remove leading slash if present to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${API_CONFIG.baseURL}/${cleanEndpoint}`;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiClientError",
    ()=>ApiClientError,
    "apiClient",
    ()=>apiClient,
    "getAuthToken",
    ()=>getAuthToken,
    "removeAuthToken",
    ()=>removeAuthToken,
    "setAuthToken",
    ()=>setAuthToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/config.ts [app-client] (ecmascript)");
;
class ApiClientError extends Error {
    status;
    data;
    constructor(message, status, data){
        super(message), this.status = status, this.data = data;
        this.name = 'ApiClientError';
    }
}
const getAuthToken = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem('auth_token');
};
const setAuthToken = (token)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem('auth_token', token);
};
const removeAuthToken = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.removeItem('auth_token');
};
/**
 * Base API client with common functionality
 */ class ApiClient {
    baseURL;
    constructor(){
        this.baseURL = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].baseURL;
    }
    /**
   * Get headers for API requests
   */ getHeaders(customHeaders) {
        const headers = {
            'Content-Type': 'application/json',
            ...customHeaders
        };
        const token = getAuthToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }
    /**
   * Handle API response
   */ async handleResponse(response) {
        const contentType = response.headers.get('content-type');
        const isJson = contentType?.includes('application/json');
        let data;
        if (isJson) {
            data = await response.json();
        } else {
            data = await response.text();
        }
        if (!response.ok) {
            const error = isJson ? data : {
                error: data || 'An error occurred'
            };
            throw new ApiClientError(error.message || error.error || 'An error occurred', response.status, error);
        }
        return data;
    }
    /**
   * Make a GET request
   */ async get(endpoint, params) {
        let url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])(endpoint);
        if (params) {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value])=>{
                if (value !== undefined && value !== null) {
                    searchParams.append(key, String(value));
                }
            });
            const queryString = searchParams.toString();
            if (queryString) {
                url += `?${queryString}`;
            }
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: this.getHeaders(),
            signal: AbortSignal.timeout(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].timeout)
        });
        return this.handleResponse(response);
    }
    /**
   * Make a POST request
   */ async post(endpoint, data) {
        const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])(endpoint), {
            method: 'POST',
            headers: this.getHeaders(),
            body: data ? JSON.stringify(data) : undefined,
            signal: AbortSignal.timeout(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].timeout)
        });
        return this.handleResponse(response);
    }
    /**
   * Make a PATCH request
   */ async patch(endpoint, data) {
        const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])(endpoint), {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: data ? JSON.stringify(data) : undefined,
            signal: AbortSignal.timeout(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].timeout)
        });
        return this.handleResponse(response);
    }
    /**
   * Make a DELETE request
   */ async delete(endpoint) {
        const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])(endpoint), {
            method: 'DELETE',
            headers: this.getHeaders(),
            signal: AbortSignal.timeout(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].timeout)
        });
        return this.handleResponse(response);
    }
}
const apiClient = new ApiClient();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/auth.api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authApi",
    ()=>authApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
;
;
const authApi = {
    /**
   * Register a new user
   */ register: async (data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/auth/register', data);
        if (response.accessToken) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthToken"])(response.accessToken);
        }
        return response;
    },
    /**
   * Login user
   */ login: async (data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/auth/login', data);
        if (response.accessToken) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthToken"])(response.accessToken);
        }
        return response;
    },
    /**
   * Logout user
   */ logout: async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/auth/logout');
        } finally{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeAuthToken"])();
        }
    },
    /**
   * Refresh access token
   */ refresh: async (data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/auth/refresh', data);
        if (response.accessToken) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthToken"])(response.accessToken);
        }
        return response;
    },
    /**
   * Get current user
   */ getMe: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/auth/me');
    },
    /**
   * Update user profile
   */ updateProfile: async (data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch('/api/auth/profile', data);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/bookings.api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bookingsApi",
    ()=>bookingsApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
;
const bookingsApi = {
    /**
   * Get all active services
   * Backend route: /api/services or /api/ (for backward compatibility)
   * Transforms backend format (_id, durationMins, active) to frontend format (id, duration, isActive)
   */ getServices: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/services');
        // Transform backend format to frontend format
        return response.map((service)=>({
                id: service._id || service.id,
                name: service.name,
                description: service.description,
                price: service.price,
                duration: service.durationMins || service.duration,
                isActive: service.active !== undefined ? service.active : service.isActive
            }));
    },
    /**
   * Get service by ID
   * Backend route: /api/:id (now correctly ordered after specific routes)
   * Transforms backend format to frontend format
   */ getService: async (id)=>{
        const service = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/${id}`);
        return {
            id: service._id || service.id,
            name: service.name,
            description: service.description,
            price: service.price,
            duration: service.durationMins || service.duration,
            isActive: service.active !== undefined ? service.active : service.isActive
        };
    },
    /**
   * Get available time slots
   */ getAvailability: async (serviceId, date)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/availability', {
            serviceId,
            date
        });
    },
    /**
   * Create a new booking
   */ createBooking: async (data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/bookings', data);
    },
    /**
   * Get user's bookings
   * Transforms backend format (_id) to frontend format (id)
   */ getMyBookings: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/bookings/my');
        // Transform backend format to frontend format
        return response.map((booking)=>({
                ...booking,
                id: booking._id || booking.id
            }));
    },
    /**
   * Get booking by ID
   */ getBooking: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/bookings/${id}`);
    },
    /**
   * Update booking
   */ updateBooking: async (id, data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/api/bookings/${id}`, data);
    },
    /**
   * Cancel booking
   */ cancelBooking: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/bookings/${id}/cancel`);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/courses.api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "coursesApi",
    ()=>coursesApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
;
const coursesApi = {
    /**
   * Get all published courses
   */ getCourses: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/courses');
    },
    /**
   * Get course by ID with steps and enrollment status
   */ getCourse: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/courses/${id}`);
    },
    /**
   * Get user's course enrollments with progress
   */ getMyEnrollments: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/enrollments/my');
    },
    /**
   * Update course progress
   */ updateProgress: async (data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/progress', data);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/events.api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eventsApi",
    ()=>eventsApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
;
const eventsApi = {
    /**
   * Get all published events
   */ getEvents: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/events');
    },
    /**
   * Get event by ID with ticket types
   */ getEvent: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/events/${id}`);
    },
    /**
   * Get user's tickets
   */ getMyTickets: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/tickets/my');
    },
    /**
   * Cancel ticket
   */ cancelTicket: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/tickets/${id}/cancel`);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/groups.api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "groupsApi",
    ()=>groupsApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
;
const groupsApi = {
    /**
   * Get all active groups
   */ getGroups: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/groups');
    },
    /**
   * Get group by ID
   */ getGroup: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/groups/${id}`);
    },
    /**
   * Join a group
   */ joinGroup: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/groups/${id}/join`);
    },
    /**
   * Leave a group
   */ leaveGroup: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/groups/${id}/leave`);
    },
    /**
   * Get posts in a group
   */ getGroupPosts: async (groupId)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/groups/${groupId}/posts`);
    },
    /**
   * Create a post in a group
   */ createPost: async (groupId, data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/groups/${groupId}/posts`, data);
    },
    /**
   * Get post by ID with comments
   */ getPost: async (postId)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/posts/${postId}`);
    },
    /**
   * Delete a post
   */ deletePost: async (postId)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/api/posts/${postId}`);
    },
    /**
   * Add a comment to a post
   */ createComment: async (postId, data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/posts/${postId}/comments`, data);
    },
    /**
   * Delete a comment
   */ deleteComment: async (commentId)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/api/comments/${commentId}`);
    },
    /**
   * Add a reaction to a post or comment
   */ addReaction: async (targetType, targetId, type)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/reactions/${targetType}/${targetId}`, {
            type: type || 'like'
        });
    },
    /**
   * Remove a reaction
   */ removeReaction: async (targetType, targetId)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/api/reactions/${targetType}/${targetId}`);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/credits.api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "creditsApi",
    ()=>creditsApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
;
const creditsApi = {
    /**
   * Get all active credit packs
   */ getCreditPacks: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/credit-packs');
    },
    /**
   * Get user's credit balance
   */ getCreditBalance: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/credits/balance');
    },
    /**
   * Get credit transaction history
   */ getCreditTransactions: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/credits/transactions');
    },
    /**
   * Submit multiple questions (1 credit per question)
   */ submitQuestions: async (data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/quick-questions/batch', data);
    },
    /**
   * Get user's questions and replies
   */ getMyQuestions: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/quick-questions/my');
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/checkout.api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkoutApi",
    ()=>checkoutApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
;
const checkoutApi = {
    /**
   * Unified checkout for tickets, courses, or credit packs
   */ checkout: async (data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/checkout', data);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/admin.api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminApi",
    ()=>adminApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
;
const adminApi = {
    /**
   * Get all credit packs (including inactive)
   */ getAllCreditPacks: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/api/admin/credit-packs');
    },
    /**
   * Get credit pack by ID
   */ getCreditPackById: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/admin/credit-packs/${id}`);
    },
    /**
   * Create new credit pack
   */ createCreditPack: async (data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/api/admin/credit-packs', data);
    },
    /**
   * Update credit pack
   */ updateCreditPack: async (id, data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/api/admin/credit-packs/${id}`, data);
    },
    /**
   * Delete credit pack
   */ deleteCreditPack: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/api/admin/credit-packs/${id}`);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/chat.api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "chatApi",
    ()=>chatApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
;
const chatApi = {
    /**
   * Get chat messages for a group
   */ getMessages: async (groupId, options)=>{
        const params = new URLSearchParams();
        if (options?.limit) params.append('limit', options.limit.toString());
        if (options?.before) params.append('before', options.before);
        const query = params.toString();
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/groups/${groupId}/chat/messages${query ? `?${query}` : ''}`);
    },
    /**
   * Send a chat message
   */ sendMessage: async (groupId, data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/groups/${groupId}/chat/messages`, data);
    },
    /**
   * Mark all messages in a group as read
   */ markGroupAsRead: async (groupId)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/groups/${groupId}/chat/read`);
    },
    /**
   * Get unread message count for a group
   */ getUnreadCount: async (groupId)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/groups/${groupId}/chat/unread-count`);
    },
    /**
   * Mark a specific message as read
   */ markMessageAsRead: async (messageId)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/api/chat/messages/${messageId}/read`);
    },
    /**
   * Delete a chat message
   */ deleteMessage: async (messageId)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/api/chat/messages/${messageId}`);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * API Client - Central export for all API services
 *
 * Usage:
 * import { authApi, bookingsApi, coursesApi } from '@/lib/api';
 *
 * const user = await authApi.login({ email, password });
 * const services = await bookingsApi.getServices();
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$auth$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/auth.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/bookings.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$courses$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/courses.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$events$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/events.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/groups.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$credits$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/credits.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$checkout$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/checkout.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$admin$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/admin.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$chat$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/chat.api.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useAuth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$auth$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/auth.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function useAuth() {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Check if user is authenticated on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuth.useEffect": ()=>{
            const checkAuth = {
                "useAuth.useEffect.checkAuth": async ()=>{
                    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
                    if (!token) {
                        setIsLoading(false);
                        return;
                    }
                    try {
                        const currentUser = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$auth$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].getMe();
                        setUser(currentUser);
                    } catch (err) {
                        // Token might be invalid, clear it
                        if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] && err.status === 401) {
                        // Token expired or invalid, user will need to login again
                        }
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["useAuth.useEffect.checkAuth"];
            checkAuth();
        }
    }["useAuth.useEffect"], []);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAuth.useCallback[login]": async (credentials)=>{
            try {
                setError(null);
                setIsLoading(true);
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$auth$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].login(credentials);
                setUser(response.user);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to login. Please try again.';
                setError(errorMessage);
                throw err;
            } finally{
                setIsLoading(false);
            }
        }
    }["useAuth.useCallback[login]"], []);
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAuth.useCallback[register]": async (data)=>{
            try {
                setError(null);
                setIsLoading(true);
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$auth$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].register(data);
                setUser(response.user);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to register. Please try again.';
                setError(errorMessage);
                throw err;
            } finally{
                setIsLoading(false);
            }
        }
    }["useAuth.useCallback[register]"], []);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAuth.useCallback[logout]": async ()=>{
            try {
                setError(null);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$auth$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].logout();
            } catch (err) {
                // Even if logout fails on server, clear local state
                console.error('Logout error:', err);
            } finally{
                setUser(null);
            }
        }
    }["useAuth.useCallback[logout]"], []);
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAuth.useCallback[refresh]": async ()=>{
            try {
                setError(null);
                const currentUser = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$auth$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].getMe();
                setUser(currentUser);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to refresh user data.';
                setError(errorMessage);
                throw err;
            }
        }
    }["useAuth.useCallback[refresh]"], []);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAuth.useCallback[clearError]": ()=>{
            setError(null);
        }
    }["useAuth.useCallback[clearError]"], []);
    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        login,
        register,
        logout,
        refresh,
        clearError
    };
}
_s(useAuth, "ttFSuwTb64fP/Nk/JX1BIFENnKo=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useBookings.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBookings",
    ()=>useBookings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/bookings.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useBookings() {
    _s();
    const [services, setServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [bookings, setBookings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [availability, setAvailability] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchServices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useBookings.useCallback[fetchServices]": async ()=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bookingsApi"].getServices();
                setServices(data);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch services.';
                setError(errorMessage);
            } finally{
                setIsLoading(false);
            }
        }
    }["useBookings.useCallback[fetchServices]"], []);
    const fetchService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useBookings.useCallback[fetchService]": async (id)=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bookingsApi"].getService(id);
                return data;
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch service.';
                setError(errorMessage);
                return null;
            } finally{
                setIsLoading(false);
            }
        }
    }["useBookings.useCallback[fetchService]"], []);
    const fetchAvailability = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useBookings.useCallback[fetchAvailability]": async (serviceId, date)=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bookingsApi"].getAvailability(serviceId, date);
                setAvailability(data);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch availability.';
                setError(errorMessage);
                setAvailability(null);
            } finally{
                setIsLoading(false);
            }
        }
    }["useBookings.useCallback[fetchAvailability]"], []);
    const fetchBookings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useBookings.useCallback[fetchBookings]": async ()=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bookingsApi"].getMyBookings();
                setBookings(data);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch bookings.';
                setError(errorMessage);
            } finally{
                setIsLoading(false);
            }
        }
    }["useBookings.useCallback[fetchBookings]"], []);
    const createBooking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useBookings.useCallback[createBooking]": async (data)=>{
            try {
                setError(null);
                setIsLoading(true);
                const booking = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bookingsApi"].createBooking(data);
                setBookings({
                    "useBookings.useCallback[createBooking]": (prev)=>[
                            booking,
                            ...prev
                        ]
                }["useBookings.useCallback[createBooking]"]);
                return booking;
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to create booking.';
                setError(errorMessage);
                return null;
            } finally{
                setIsLoading(false);
            }
        }
    }["useBookings.useCallback[createBooking]"], []);
    const updateBooking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useBookings.useCallback[updateBooking]": async (id, data)=>{
            try {
                setError(null);
                setIsLoading(true);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bookingsApi"].updateBooking(id, data);
                // Refresh bookings list
                await fetchBookings();
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to update booking.';
                setError(errorMessage);
                throw err;
            } finally{
                setIsLoading(false);
            }
        }
    }["useBookings.useCallback[updateBooking]"], [
        fetchBookings
    ]);
    const cancelBooking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useBookings.useCallback[cancelBooking]": async (id)=>{
            try {
                setError(null);
                setIsLoading(true);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bookingsApi"].cancelBooking(id);
                setBookings({
                    "useBookings.useCallback[cancelBooking]": (prev)=>prev.filter({
                            "useBookings.useCallback[cancelBooking]": (b)=>b.id !== id
                        }["useBookings.useCallback[cancelBooking]"])
                }["useBookings.useCallback[cancelBooking]"]);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to cancel booking.';
                setError(errorMessage);
                throw err;
            } finally{
                setIsLoading(false);
            }
        }
    }["useBookings.useCallback[cancelBooking]"], []);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useBookings.useCallback[clearError]": ()=>{
            setError(null);
        }
    }["useBookings.useCallback[clearError]"], []);
    const clearAvailability = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useBookings.useCallback[clearAvailability]": ()=>{
            setAvailability(null);
        }
    }["useBookings.useCallback[clearAvailability]"], []);
    return {
        services,
        bookings,
        availability,
        isLoading,
        error,
        fetchServices,
        fetchService,
        fetchAvailability,
        fetchBookings,
        createBooking,
        updateBooking,
        cancelBooking,
        clearError,
        clearAvailability
    };
}
_s(useBookings, "euRk+KAa205bUhbZuXNvSPeIMFo=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useCourses.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCourses",
    ()=>useCourses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$courses$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/courses.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useCourses() {
    _s();
    const [courses, setCourses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [enrollments, setEnrollments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchCourses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCourses.useCallback[fetchCourses]": async ()=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$courses$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coursesApi"].getCourses();
                setCourses(data);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch courses.';
                setError(errorMessage);
            } finally{
                setIsLoading(false);
            }
        }
    }["useCourses.useCallback[fetchCourses]"], []);
    const fetchCourse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCourses.useCallback[fetchCourse]": async (id)=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$courses$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coursesApi"].getCourse(id);
                return data;
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch course.';
                setError(errorMessage);
                return null;
            } finally{
                setIsLoading(false);
            }
        }
    }["useCourses.useCallback[fetchCourse]"], []);
    const fetchEnrollments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCourses.useCallback[fetchEnrollments]": async ()=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$courses$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coursesApi"].getMyEnrollments();
                setEnrollments(data);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch enrollments.';
                setError(errorMessage);
            } finally{
                setIsLoading(false);
            }
        }
    }["useCourses.useCallback[fetchEnrollments]"], []);
    const updateProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCourses.useCallback[updateProgress]": async (data)=>{
            try {
                setError(null);
                setIsLoading(true);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$courses$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coursesApi"].updateProgress(data);
                // Refresh enrollments to get updated progress
                await fetchEnrollments();
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to update progress.';
                setError(errorMessage);
                throw err;
            } finally{
                setIsLoading(false);
            }
        }
    }["useCourses.useCallback[updateProgress]"], [
        fetchEnrollments
    ]);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCourses.useCallback[clearError]": ()=>{
            setError(null);
        }
    }["useCourses.useCallback[clearError]"], []);
    return {
        courses,
        enrollments,
        isLoading,
        error,
        fetchCourses,
        fetchCourse,
        fetchEnrollments,
        updateProgress,
        clearError
    };
}
_s(useCourses, "8vB/60AZiENJfDVWjdjFbkRvC8c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useEvents.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEvents",
    ()=>useEvents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$events$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/events.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useEvents() {
    _s();
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tickets, setTickets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEvents.useCallback[fetchEvents]": async ()=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$events$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventsApi"].getEvents();
                setEvents(data);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch events.';
                setError(errorMessage);
            } finally{
                setIsLoading(false);
            }
        }
    }["useEvents.useCallback[fetchEvents]"], []);
    const fetchEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEvents.useCallback[fetchEvent]": async (id)=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$events$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventsApi"].getEvent(id);
                return data;
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch event.';
                setError(errorMessage);
                return null;
            } finally{
                setIsLoading(false);
            }
        }
    }["useEvents.useCallback[fetchEvent]"], []);
    const fetchTickets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEvents.useCallback[fetchTickets]": async ()=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$events$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventsApi"].getMyTickets();
                setTickets(data);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch tickets.';
                setError(errorMessage);
            } finally{
                setIsLoading(false);
            }
        }
    }["useEvents.useCallback[fetchTickets]"], []);
    const cancelTicket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEvents.useCallback[cancelTicket]": async (id)=>{
            try {
                setError(null);
                setIsLoading(true);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$events$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventsApi"].cancelTicket(id);
                setTickets({
                    "useEvents.useCallback[cancelTicket]": (prev)=>prev.filter({
                            "useEvents.useCallback[cancelTicket]": (t)=>t.id !== id
                        }["useEvents.useCallback[cancelTicket]"])
                }["useEvents.useCallback[cancelTicket]"]);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to cancel ticket.';
                setError(errorMessage);
                throw err;
            } finally{
                setIsLoading(false);
            }
        }
    }["useEvents.useCallback[cancelTicket]"], []);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEvents.useCallback[clearError]": ()=>{
            setError(null);
        }
    }["useEvents.useCallback[clearError]"], []);
    return {
        events,
        tickets,
        isLoading,
        error,
        fetchEvents,
        fetchEvent,
        fetchTickets,
        cancelTicket,
        clearError
    };
}
_s(useEvents, "Mo7gYzW0rkjAwy5yRxUOGbBSQ3U=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useGroups.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGroups",
    ()=>useGroups
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/groups.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useGroups() {
    _s();
    const [groups, setGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGroups.useCallback[fetchGroups]": async ()=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].getGroups();
                setGroups(data);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch groups.';
                setError(errorMessage);
            } finally{
                setIsLoading(false);
            }
        }
    }["useGroups.useCallback[fetchGroups]"], []);
    const fetchGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGroups.useCallback[fetchGroup]": async (id)=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].getGroup(id);
                return data;
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch group.';
                setError(errorMessage);
                return null;
            } finally{
                setIsLoading(false);
            }
        }
    }["useGroups.useCallback[fetchGroup]"], []);
    const joinGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGroups.useCallback[joinGroup]": async (id)=>{
            try {
                setError(null);
                setIsLoading(true);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].joinGroup(id);
                // Refresh groups to update membership status
                await fetchGroups();
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to join group.';
                setError(errorMessage);
                throw err;
            } finally{
                setIsLoading(false);
            }
        }
    }["useGroups.useCallback[joinGroup]"], [
        fetchGroups
    ]);
    const leaveGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGroups.useCallback[leaveGroup]": async (id)=>{
            try {
                setError(null);
                setIsLoading(true);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].leaveGroup(id);
                // Refresh groups to update membership status
                await fetchGroups();
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to leave group.';
                setError(errorMessage);
                throw err;
            } finally{
                setIsLoading(false);
            }
        }
    }["useGroups.useCallback[leaveGroup]"], [
        fetchGroups
    ]);
    const fetchGroupPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGroups.useCallback[fetchGroupPosts]": async (groupId)=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].getGroupPosts(groupId);
                setPosts(data);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch posts.';
                setError(errorMessage);
                setPosts([]);
            } finally{
                setIsLoading(false);
            }
        }
    }["useGroups.useCallback[fetchGroupPosts]"], []);
    const createPost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGroups.useCallback[createPost]": async (groupId, data)=>{
            try {
                setError(null);
                setIsLoading(true);
                const post = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].createPost(groupId, data);
                setPosts({
                    "useGroups.useCallback[createPost]": (prev)=>[
                            post,
                            ...prev
                        ]
                }["useGroups.useCallback[createPost]"]);
                return post;
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to create post.';
                setError(errorMessage);
                return null;
            } finally{
                setIsLoading(false);
            }
        }
    }["useGroups.useCallback[createPost]"], []);
    const fetchPost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGroups.useCallback[fetchPost]": async (postId)=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].getPost(postId);
                return data;
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch post.';
                setError(errorMessage);
                return null;
            } finally{
                setIsLoading(false);
            }
        }
    }["useGroups.useCallback[fetchPost]"], []);
    const deletePost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGroups.useCallback[deletePost]": async (postId)=>{
            try {
                setError(null);
                setIsLoading(true);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].deletePost(postId);
                setPosts({
                    "useGroups.useCallback[deletePost]": (prev)=>prev.filter({
                            "useGroups.useCallback[deletePost]": (p)=>p.id !== postId
                        }["useGroups.useCallback[deletePost]"])
                }["useGroups.useCallback[deletePost]"]);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to delete post.';
                setError(errorMessage);
                throw err;
            } finally{
                setIsLoading(false);
            }
        }
    }["useGroups.useCallback[deletePost]"], []);
    const createComment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGroups.useCallback[createComment]": async (postId, data)=>{
            try {
                setError(null);
                setIsLoading(true);
                const comment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].createComment(postId, data);
                // Refresh posts to get updated comments
                const updatedPost = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].getPost(postId);
                if (updatedPost) {
                    setPosts({
                        "useGroups.useCallback[createComment]": (prev)=>prev.map({
                                "useGroups.useCallback[createComment]": (p)=>p.id === postId ? updatedPost : p
                            }["useGroups.useCallback[createComment]"])
                    }["useGroups.useCallback[createComment]"]);
                }
                return comment;
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to create comment.';
                setError(errorMessage);
                return null;
            } finally{
                setIsLoading(false);
            }
        }
    }["useGroups.useCallback[createComment]"], []);
    const deleteComment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGroups.useCallback[deleteComment]": async (commentId)=>{
            try {
                setError(null);
                setIsLoading(true);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].deleteComment(commentId);
            // Note: You may need to refresh the specific post to update comments
            // This is a simplified version
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to delete comment.';
                setError(errorMessage);
                throw err;
            } finally{
                setIsLoading(false);
            }
        }
    }["useGroups.useCallback[deleteComment]"], []);
    const addReaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGroups.useCallback[addReaction]": async (targetType, targetId, type)=>{
            try {
                setError(null);
                setIsLoading(true);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].addReaction(targetType, targetId, type);
                // Refresh posts to get updated reactions
                // This could be optimized to only update the specific post/comment
                if (targetType === 'POST') {
                    const updatedPost = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].getPost(targetId);
                    if (updatedPost) {
                        setPosts({
                            "useGroups.useCallback[addReaction]": (prev)=>prev.map({
                                    "useGroups.useCallback[addReaction]": (p)=>p.id === targetId ? updatedPost : p
                                }["useGroups.useCallback[addReaction]"])
                        }["useGroups.useCallback[addReaction]"]);
                    }
                }
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to add reaction.';
                setError(errorMessage);
                throw err;
            } finally{
                setIsLoading(false);
            }
        }
    }["useGroups.useCallback[addReaction]"], []);
    const removeReaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGroups.useCallback[removeReaction]": async (targetType, targetId)=>{
            try {
                setError(null);
                setIsLoading(true);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].removeReaction(targetType, targetId);
                // Refresh posts to get updated reactions
                if (targetType === 'POST') {
                    const updatedPost = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupsApi"].getPost(targetId);
                    if (updatedPost) {
                        setPosts({
                            "useGroups.useCallback[removeReaction]": (prev)=>prev.map({
                                    "useGroups.useCallback[removeReaction]": (p)=>p.id === targetId ? updatedPost : p
                                }["useGroups.useCallback[removeReaction]"])
                        }["useGroups.useCallback[removeReaction]"]);
                    }
                }
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to remove reaction.';
                setError(errorMessage);
                throw err;
            } finally{
                setIsLoading(false);
            }
        }
    }["useGroups.useCallback[removeReaction]"], []);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGroups.useCallback[clearError]": ()=>{
            setError(null);
        }
    }["useGroups.useCallback[clearError]"], []);
    const clearPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGroups.useCallback[clearPosts]": ()=>{
            setPosts([]);
        }
    }["useGroups.useCallback[clearPosts]"], []);
    return {
        groups,
        posts,
        isLoading,
        error,
        fetchGroups,
        fetchGroup,
        joinGroup,
        leaveGroup,
        fetchGroupPosts,
        createPost,
        fetchPost,
        deletePost,
        createComment,
        deleteComment,
        addReaction,
        removeReaction,
        clearError,
        clearPosts
    };
}
_s(useGroups, "HvZwcXBW3KaOZ0DyOPt19Mo9Ud0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useCredits.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCredits",
    ()=>useCredits
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$credits$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/credits.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useCredits() {
    _s();
    const [creditPacks, setCreditPacks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [balance, setBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchCreditPacks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCredits.useCallback[fetchCreditPacks]": async ()=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$credits$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["creditsApi"].getCreditPacks();
                setCreditPacks(data);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch credit packs.';
                setError(errorMessage);
            } finally{
                setIsLoading(false);
            }
        }
    }["useCredits.useCallback[fetchCreditPacks]"], []);
    const fetchBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCredits.useCallback[fetchBalance]": async ()=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$credits$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["creditsApi"].getCreditBalance();
                setBalance(data);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch credit balance.';
                setError(errorMessage);
            } finally{
                setIsLoading(false);
            }
        }
    }["useCredits.useCallback[fetchBalance]"], []);
    const fetchTransactions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCredits.useCallback[fetchTransactions]": async ()=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$credits$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["creditsApi"].getCreditTransactions();
                setTransactions(data);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch transactions.';
                setError(errorMessage);
            } finally{
                setIsLoading(false);
            }
        }
    }["useCredits.useCallback[fetchTransactions]"], []);
    const submitQuestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCredits.useCallback[submitQuestions]": async (data)=>{
            try {
                setError(null);
                setIsLoading(true);
                const submitted = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$credits$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["creditsApi"].submitQuestions(data);
                setQuestions({
                    "useCredits.useCallback[submitQuestions]": (prev)=>[
                            ...submitted,
                            ...prev
                        ]
                }["useCredits.useCallback[submitQuestions]"]);
                // Refresh balance after spending credits
                await fetchBalance();
                return submitted;
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to submit questions.';
                setError(errorMessage);
                return null;
            } finally{
                setIsLoading(false);
            }
        }
    }["useCredits.useCallback[submitQuestions]"], [
        fetchBalance
    ]);
    const fetchQuestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCredits.useCallback[fetchQuestions]": async ()=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$credits$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["creditsApi"].getMyQuestions();
                setQuestions(data);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch questions.';
                setError(errorMessage);
            } finally{
                setIsLoading(false);
            }
        }
    }["useCredits.useCallback[fetchQuestions]"], []);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCredits.useCallback[clearError]": ()=>{
            setError(null);
        }
    }["useCredits.useCallback[clearError]"], []);
    return {
        creditPacks,
        balance,
        transactions,
        questions,
        isLoading,
        error,
        fetchCreditPacks,
        fetchBalance,
        fetchTransactions,
        submitQuestions,
        fetchQuestions,
        clearError
    };
}
_s(useCredits, "G3ZqM2mSB9jbNdAmJ8jyxmQil7g=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useCheckout.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCheckout",
    ()=>useCheckout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$checkout$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/checkout.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useCheckout() {
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const checkout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCheckout.useCallback[checkout]": async (data)=>{
            try {
                setError(null);
                setIsLoading(true);
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$checkout$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkoutApi"].checkout(data);
                return response;
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to complete checkout.';
                setError(errorMessage);
                return null;
            } finally{
                setIsLoading(false);
            }
        }
    }["useCheckout.useCallback[checkout]"], []);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCheckout.useCallback[clearError]": ()=>{
            setError(null);
        }
    }["useCheckout.useCallback[clearError]"], []);
    return {
        isLoading,
        error,
        checkout,
        clearError
    };
}
_s(useCheckout, "yPeNPSFwaB7oL91ielTyNKg2CDc=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useAdminCredits.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAdminCredits",
    ()=>useAdminCredits
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$admin$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/admin.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useAdminCredits() {
    _s();
    const [creditPacks, setCreditPacks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchAllCreditPacks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdminCredits.useCallback[fetchAllCreditPacks]": async ()=>{
            try {
                setError(null);
                setIsLoading(true);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$admin$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adminApi"].getAllCreditPacks();
                setCreditPacks(data);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch credit packs.';
                setError(errorMessage);
            } finally{
                setIsLoading(false);
            }
        }
    }["useAdminCredits.useCallback[fetchAllCreditPacks]"], []);
    const createCreditPack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdminCredits.useCallback[createCreditPack]": async (data)=>{
            try {
                setError(null);
                setIsLoading(true);
                const newPack = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$admin$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adminApi"].createCreditPack(data);
                setCreditPacks({
                    "useAdminCredits.useCallback[createCreditPack]": (prev)=>[
                            newPack,
                            ...prev
                        ]
                }["useAdminCredits.useCallback[createCreditPack]"]);
                return newPack;
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to create credit pack.';
                setError(errorMessage);
                return null;
            } finally{
                setIsLoading(false);
            }
        }
    }["useAdminCredits.useCallback[createCreditPack]"], []);
    const updateCreditPack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdminCredits.useCallback[updateCreditPack]": async (id, data)=>{
            try {
                setError(null);
                setIsLoading(true);
                const updatedPack = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$admin$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adminApi"].updateCreditPack(id, data);
                setCreditPacks({
                    "useAdminCredits.useCallback[updateCreditPack]": (prev)=>prev.map({
                            "useAdminCredits.useCallback[updateCreditPack]": (pack)=>pack.id === id ? updatedPack : pack
                        }["useAdminCredits.useCallback[updateCreditPack]"])
                }["useAdminCredits.useCallback[updateCreditPack]"]);
                return updatedPack;
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to update credit pack.';
                setError(errorMessage);
                return null;
            } finally{
                setIsLoading(false);
            }
        }
    }["useAdminCredits.useCallback[updateCreditPack]"], []);
    const deleteCreditPack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdminCredits.useCallback[deleteCreditPack]": async (id)=>{
            try {
                setError(null);
                setIsLoading(true);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$admin$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adminApi"].deleteCreditPack(id);
                setCreditPacks({
                    "useAdminCredits.useCallback[deleteCreditPack]": (prev)=>prev.filter({
                            "useAdminCredits.useCallback[deleteCreditPack]": (pack)=>pack.id !== id
                        }["useAdminCredits.useCallback[deleteCreditPack]"])
                }["useAdminCredits.useCallback[deleteCreditPack]"]);
                return true;
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to delete credit pack.';
                setError(errorMessage);
                return false;
            } finally{
                setIsLoading(false);
            }
        }
    }["useAdminCredits.useCallback[deleteCreditPack]"], []);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdminCredits.useCallback[clearError]": ()=>{
            setError(null);
        }
    }["useAdminCredits.useCallback[clearError]"], []);
    return {
        creditPacks,
        isLoading,
        error,
        fetchAllCreditPacks,
        createCreditPack,
        updateCreditPack,
        deleteCreditPack,
        clearError
    };
}
_s(useAdminCredits, "hqCtHRwZ7IQuxEMPzBDqL0wdwno=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useChat.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChat",
    ()=>useChat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$chat$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/chat.api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function useChat() {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [unreadCount, setUnreadCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentGroupIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Initialize socket connection
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useChat.useEffect": ()=>{
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
            if (!token) return;
            const API_URL = ("TURBOPACK compile-time value", "http://localhost:5000") || 'http://localhost:5000';
            const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(`${API_URL}/chat`, {
                auth: {
                    token: token
                },
                transports: [
                    'websocket',
                    'polling'
                ]
            });
            socketRef.current = socket;
            socket.on('connect', {
                "useChat.useEffect": ()=>{
                    setIsConnected(true);
                }
            }["useChat.useEffect"]);
            socket.on('disconnect', {
                "useChat.useEffect": ()=>{
                    setIsConnected(false);
                }
            }["useChat.useEffect"]);
            socket.on('new-message', {
                "useChat.useEffect": (data)=>{
                    setMessages({
                        "useChat.useEffect": (prev)=>{
                            // Avoid duplicates
                            if (prev.some({
                                "useChat.useEffect": (m)=>m.id === data.message.id
                            }["useChat.useEffect"])) {
                                return prev;
                            }
                            return [
                                ...prev,
                                data.message
                            ];
                        }
                    }["useChat.useEffect"]);
                    // Update unread count if not in current group
                    if (currentGroupIdRef.current !== data.message.groupId) {
                        setUnreadCount({
                            "useChat.useEffect": (prev)=>prev + 1
                        }["useChat.useEffect"]);
                    }
                }
            }["useChat.useEffect"]);
            socket.on('error', {
                "useChat.useEffect": (data)=>{
                    setError(data.message);
                }
            }["useChat.useEffect"]);
            return ({
                "useChat.useEffect": ()=>{
                    socket.disconnect();
                    socketRef.current = null;
                }
            })["useChat.useEffect"];
        }
    }["useChat.useEffect"], []);
    const joinGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[joinGroup]": (groupId)=>{
            if (socketRef.current && socketRef.current.connected) {
                socketRef.current.emit('join-group', groupId);
                currentGroupIdRef.current = groupId;
            }
        }
    }["useChat.useCallback[joinGroup]"], []);
    const leaveGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[leaveGroup]": ()=>{
            if (socketRef.current && currentGroupIdRef.current) {
                socketRef.current.emit('leave-group', currentGroupIdRef.current);
                currentGroupIdRef.current = null;
            }
        }
    }["useChat.useCallback[leaveGroup]"], []);
    const fetchMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[fetchMessages]": async (groupId, options)=>{
            try {
                setError(null);
                setIsLoading(true);
                // Join the group room
                joinGroup(groupId);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$chat$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatApi"].getMessages(groupId, options);
                setMessages(data);
                // Mark as read after loading
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$chat$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatApi"].markGroupAsRead(groupId);
                setUnreadCount(0);
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch messages.';
                setError(errorMessage);
            } finally{
                setIsLoading(false);
            }
        }
    }["useChat.useCallback[fetchMessages]"], [
        joinGroup
    ]);
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[sendMessage]": async (groupId, data)=>{
            try {
                setError(null);
                // Send via socket for real-time delivery
                if (socketRef.current && socketRef.current.connected) {
                    socketRef.current.emit('send-message', {
                        groupId,
                        ...data
                    });
                } else {
                    // Fallback to REST API if socket not connected
                    const message = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$chat$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatApi"].sendMessage(groupId, data);
                    setMessages({
                        "useChat.useCallback[sendMessage]": (prev)=>[
                                ...prev,
                                message
                            ]
                    }["useChat.useCallback[sendMessage]"]);
                }
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to send message.';
                setError(errorMessage);
                throw err;
            }
        }
    }["useChat.useCallback[sendMessage]"], []);
    const markAsRead = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[markAsRead]": async (groupId)=>{
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$chat$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatApi"].markGroupAsRead(groupId);
                setUnreadCount(0);
                // Also emit via socket
                if (socketRef.current && socketRef.current.connected) {
                    socketRef.current.emit('mark-read', {
                        groupId
                    });
                }
            } catch (err) {
                const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to mark messages as read.';
                setError(errorMessage);
            }
        }
    }["useChat.useCallback[markAsRead]"], []);
    const fetchUnreadCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[fetchUnreadCount]": async (groupId)=>{
            try {
                const { count } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$chat$2e$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatApi"].getUnreadCount(groupId);
                setUnreadCount(count);
            } catch (err) {
                // Silently fail for unread count
                console.error('Failed to fetch unread count:', err);
            }
        }
    }["useChat.useCallback[fetchUnreadCount]"], []);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[clearError]": ()=>{
            setError(null);
        }
    }["useChat.useCallback[clearError]"], []);
    const clearMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[clearMessages]": ()=>{
            setMessages([]);
            leaveGroup();
        }
    }["useChat.useCallback[clearMessages]"], [
        leaveGroup
    ]);
    return {
        messages,
        isLoading,
        error,
        isConnected,
        unreadCount,
        fetchMessages,
        sendMessage,
        markAsRead,
        fetchUnreadCount,
        clearError,
        clearMessages
    };
}
_s(useChat, "TOYUVYqyr/TNLpqF4EyLlkp7w9A=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * React Hooks for API Integration
 *
 * These hooks provide a clean interface for using the API client in React components.
 * Each hook manages its own loading states, error handling, and data.
 *
 * Usage:
 * import { useAuth, useBookings, useCourses } from '@/lib/hooks';
 *
 * const { user, login, logout, isLoading } = useAuth();
 * const { bookings, fetchBookings, createBooking } = useBookings();
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useAuth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useBookings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useBookings.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useCourses.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useEvents.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useGroups$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useGroups.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCredits$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useCredits.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCheckout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useCheckout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAdminCredits$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useAdminCredits.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useChat.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuthContext",
    ()=>useAuthContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/hooks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useAuth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: auth,
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/AuthContext.tsx",
        lineNumber: 28,
        columnNumber: 10
    }, this);
}
_s(AuthProvider, "YuJWYXaKIY31b1y7U6yy3IXSxQA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = AuthProvider;
function useAuthContext() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}
_s1(useAuthContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/contexts/Providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/theme-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/AuthContext.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        attribute: "class",
        defaultTheme: "dark",
        enableSystem: true,
        disableTransitionOnChange: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProvider"], {
            children: children
        }, void 0, false, {
            fileName: "[project]/contexts/Providers.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/contexts/Providers.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_f1af2725._.js.map