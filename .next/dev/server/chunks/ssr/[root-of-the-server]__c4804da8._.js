module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/components/theme-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
}),
"[project]/lib/api/types.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Common API Types
 */ __turbopack_context__.s([]);
;
}),
"[project]/lib/api/config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
const API_CONFIG = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    timeout: 30000
};
const getApiUrl = (endpoint)=>{
    // Remove leading slash if present to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${API_CONFIG.baseURL}/${cleanEndpoint}`;
};
}),
"[project]/lib/api/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/config.ts [app-ssr] (ecmascript)");
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
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
};
const setAuthToken = (token)=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
};
const removeAuthToken = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
};
/**
 * Base API client with common functionality
 */ class ApiClient {
    baseURL;
    constructor(){
        this.baseURL = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].baseURL;
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
        let url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(endpoint);
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
            signal: AbortSignal.timeout(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].timeout)
        });
        return this.handleResponse(response);
    }
    /**
   * Make a POST request
   */ async post(endpoint, data) {
        const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(endpoint), {
            method: 'POST',
            headers: this.getHeaders(),
            body: data ? JSON.stringify(data) : undefined,
            signal: AbortSignal.timeout(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].timeout)
        });
        return this.handleResponse(response);
    }
    /**
   * Make a PATCH request
   */ async patch(endpoint, data) {
        const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(endpoint), {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: data ? JSON.stringify(data) : undefined,
            signal: AbortSignal.timeout(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].timeout)
        });
        return this.handleResponse(response);
    }
    /**
   * Make a DELETE request
   */ async delete(endpoint) {
        const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApiUrl"])(endpoint), {
            method: 'DELETE',
            headers: this.getHeaders(),
            signal: AbortSignal.timeout(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].timeout)
        });
        return this.handleResponse(response);
    }
}
const apiClient = new ApiClient();
}),
"[project]/lib/api/auth.api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authApi",
    ()=>authApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
;
;
const authApi = {
    /**
   * Register a new user
   */ register: async (data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post('/api/auth/register', data);
        if (response.accessToken) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setAuthToken"])(response.accessToken);
        }
        return response;
    },
    /**
   * Login user
   */ login: async (data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post('/api/auth/login', data);
        if (response.accessToken) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setAuthToken"])(response.accessToken);
        }
        return response;
    },
    /**
   * Logout user
   */ logout: async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post('/api/auth/logout');
        } finally{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeAuthToken"])();
        }
    },
    /**
   * Refresh access token
   */ refresh: async (data)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post('/api/auth/refresh', data);
        if (response.accessToken) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setAuthToken"])(response.accessToken);
        }
        return response;
    },
    /**
   * Get current user
   */ getMe: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get('/api/auth/me');
    }
};
}),
"[project]/lib/api/bookings.api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bookingsApi",
    ()=>bookingsApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
;
const bookingsApi = {
    /**
   * Get all active services
   * Backend route: bookingRoutes mounted at /api with router.get('/')
   * This resolves to /api/ (note trailing slash)
   */ getServices: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get('/api/');
        return response;
    },
    /**
   * Get service by ID
   * Backend route: /api/:id (now correctly ordered after specific routes)
   */ getService: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/${id}`);
    },
    /**
   * Get available time slots
   */ getAvailability: async (serviceId, date)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get('/api/availability', {
            serviceId,
            date
        });
    },
    /**
   * Create a new booking
   */ createBooking: async (data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post('/api/bookings', data);
    },
    /**
   * Get user's bookings
   */ getMyBookings: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get('/api/bookings/my');
    },
    /**
   * Get booking by ID
   */ getBooking: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/bookings/${id}`);
    },
    /**
   * Update booking
   */ updateBooking: async (id, data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/api/bookings/${id}`, data);
    },
    /**
   * Cancel booking
   */ cancelBooking: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/bookings/${id}/cancel`);
    }
};
}),
"[project]/lib/api/courses.api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "coursesApi",
    ()=>coursesApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
;
const coursesApi = {
    /**
   * Get all published courses
   */ getCourses: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get('/api/courses');
    },
    /**
   * Get course by ID with steps and enrollment status
   */ getCourse: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/courses/${id}`);
    },
    /**
   * Get user's course enrollments with progress
   */ getMyEnrollments: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get('/api/enrollments/my');
    },
    /**
   * Update course progress
   */ updateProgress: async (data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post('/api/progress', data);
    }
};
}),
"[project]/lib/api/events.api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eventsApi",
    ()=>eventsApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
;
const eventsApi = {
    /**
   * Get all published events
   */ getEvents: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get('/api/events');
    },
    /**
   * Get event by ID with ticket types
   */ getEvent: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/events/${id}`);
    },
    /**
   * Get user's tickets
   */ getMyTickets: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get('/api/tickets/my');
    },
    /**
   * Cancel ticket
   */ cancelTicket: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/tickets/${id}/cancel`);
    }
};
}),
"[project]/lib/api/groups.api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "groupsApi",
    ()=>groupsApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
;
const groupsApi = {
    /**
   * Get all active groups
   */ getGroups: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get('/api/groups');
    },
    /**
   * Get group by ID
   */ getGroup: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/groups/${id}`);
    },
    /**
   * Join a group
   */ joinGroup: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/groups/${id}/join`);
    },
    /**
   * Leave a group
   */ leaveGroup: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/groups/${id}/leave`);
    },
    /**
   * Get posts in a group
   */ getGroupPosts: async (groupId)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/groups/${groupId}/posts`);
    },
    /**
   * Create a post in a group
   */ createPost: async (groupId, data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/groups/${groupId}/posts`, data);
    },
    /**
   * Get post by ID with comments
   */ getPost: async (postId)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/posts/${postId}`);
    },
    /**
   * Delete a post
   */ deletePost: async (postId)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].delete(`/api/posts/${postId}`);
    },
    /**
   * Add a comment to a post
   */ createComment: async (postId, data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/posts/${postId}/comments`, data);
    },
    /**
   * Delete a comment
   */ deleteComment: async (commentId)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].delete(`/api/comments/${commentId}`);
    },
    /**
   * Add a reaction to a post or comment
   */ addReaction: async (targetType, targetId, type)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/api/reactions/${targetType}/${targetId}`, {
            type: type || 'like'
        });
    },
    /**
   * Remove a reaction
   */ removeReaction: async (targetType, targetId)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].delete(`/api/reactions/${targetType}/${targetId}`);
    }
};
}),
"[project]/lib/api/credits.api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "creditsApi",
    ()=>creditsApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
;
const creditsApi = {
    /**
   * Get all active credit packs
   */ getCreditPacks: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get('/api/credit-packs');
    },
    /**
   * Get user's credit balance
   */ getCreditBalance: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get('/api/credits/balance');
    },
    /**
   * Get credit transaction history
   */ getCreditTransactions: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get('/api/credits/transactions');
    },
    /**
   * Submit multiple questions (1 credit per question)
   */ submitQuestions: async (data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post('/api/quick-questions/batch', data);
    },
    /**
   * Get user's questions and replies
   */ getMyQuestions: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get('/api/quick-questions/my');
    }
};
}),
"[project]/lib/api/checkout.api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkoutApi",
    ()=>checkoutApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
;
const checkoutApi = {
    /**
   * Unified checkout for tickets, courses, or credit packs
   */ checkout: async (data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post('/api/checkout', data);
    }
};
}),
"[project]/lib/api/admin.api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminApi",
    ()=>adminApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
;
const adminApi = {
    /**
   * Get all credit packs (including inactive)
   */ getAllCreditPacks: async ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get('/api/admin/credit-packs');
    },
    /**
   * Get credit pack by ID
   */ getCreditPackById: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/api/admin/credit-packs/${id}`);
    },
    /**
   * Create new credit pack
   */ createCreditPack: async (data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post('/api/admin/credit-packs', data);
    },
    /**
   * Update credit pack
   */ updateCreditPack: async (id, data)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/api/admin/credit-packs/${id}`, data);
    },
    /**
   * Delete credit pack
   */ deleteCreditPack: async (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].delete(`/api/admin/credit-packs/${id}`);
    }
};
}),
"[project]/lib/api/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$auth$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/auth.api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/bookings.api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$courses$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/courses.api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$events$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/events.api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/groups.api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$credits$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/credits.api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$checkout$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/checkout.api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$admin$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/admin.api.ts [app-ssr] (ecmascript)");
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
}),
"[project]/lib/hooks/useAuth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$auth$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/auth.api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function useAuth() {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Check if user is authenticated on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkAuth = async ()=>{
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
            if (!token) {
                setIsLoading(false);
                return;
            }
            try {
                const currentUser = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$auth$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"].getMe();
                setUser(currentUser);
            } catch (err) {
                // Token might be invalid, clear it
                if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] && err.status === 401) {
                // Token expired or invalid, user will need to login again
                }
            } finally{
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (credentials)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$auth$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"].login(credentials);
            setUser(response.user);
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to login. Please try again.';
            setError(errorMessage);
            throw err;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (data)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$auth$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"].register(data);
            setUser(response.user);
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to register. Please try again.';
            setError(errorMessage);
            throw err;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$auth$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"].logout();
        } catch (err) {
            // Even if logout fails on server, clear local state
            console.error('Logout error:', err);
        } finally{
            setUser(null);
        }
    }, []);
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            const currentUser = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$auth$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"].getMe();
            setUser(currentUser);
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to refresh user data.';
            setError(errorMessage);
            throw err;
        }
    }, []);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setError(null);
    }, []);
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
}),
"[project]/lib/hooks/useBookings.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBookings",
    ()=>useBookings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/bookings.api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function useBookings() {
    const [services, setServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [bookings, setBookings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [availability, setAvailability] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchServices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bookingsApi"].getServices();
            setServices(data);
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch services.';
            setError(errorMessage);
        } finally{
            setIsLoading(false);
        }
    }, []);
    const fetchService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bookingsApi"].getService(id);
            return data;
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch service.';
            setError(errorMessage);
            return null;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const fetchAvailability = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (serviceId, date)=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bookingsApi"].getAvailability(serviceId, date);
            setAvailability(data);
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch availability.';
            setError(errorMessage);
            setAvailability([]);
        } finally{
            setIsLoading(false);
        }
    }, []);
    const fetchBookings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bookingsApi"].getMyBookings();
            setBookings(data);
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch bookings.';
            setError(errorMessage);
        } finally{
            setIsLoading(false);
        }
    }, []);
    const createBooking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (data)=>{
        try {
            setError(null);
            setIsLoading(true);
            const booking = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bookingsApi"].createBooking(data);
            setBookings((prev)=>[
                    booking,
                    ...prev
                ]);
            return booking;
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to create booking.';
            setError(errorMessage);
            return null;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const updateBooking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id, data)=>{
        try {
            setError(null);
            setIsLoading(true);
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bookingsApi"].updateBooking(id, data);
            // Refresh bookings list
            await fetchBookings();
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to update booking.';
            setError(errorMessage);
            throw err;
        } finally{
            setIsLoading(false);
        }
    }, [
        fetchBookings
    ]);
    const cancelBooking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            setError(null);
            setIsLoading(true);
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$bookings$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bookingsApi"].cancelBooking(id);
            setBookings((prev)=>prev.filter((b)=>b.id !== id));
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to cancel booking.';
            setError(errorMessage);
            throw err;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setError(null);
    }, []);
    const clearAvailability = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setAvailability([]);
    }, []);
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
}),
"[project]/lib/hooks/useCourses.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCourses",
    ()=>useCourses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$courses$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/courses.api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function useCourses() {
    const [courses, setCourses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [enrollments, setEnrollments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchCourses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$courses$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["coursesApi"].getCourses();
            setCourses(data);
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch courses.';
            setError(errorMessage);
        } finally{
            setIsLoading(false);
        }
    }, []);
    const fetchCourse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$courses$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["coursesApi"].getCourse(id);
            return data;
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch course.';
            setError(errorMessage);
            return null;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const fetchEnrollments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$courses$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["coursesApi"].getMyEnrollments();
            setEnrollments(data);
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch enrollments.';
            setError(errorMessage);
        } finally{
            setIsLoading(false);
        }
    }, []);
    const updateProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (data)=>{
        try {
            setError(null);
            setIsLoading(true);
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$courses$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["coursesApi"].updateProgress(data);
            // Refresh enrollments to get updated progress
            await fetchEnrollments();
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to update progress.';
            setError(errorMessage);
            throw err;
        } finally{
            setIsLoading(false);
        }
    }, [
        fetchEnrollments
    ]);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setError(null);
    }, []);
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
}),
"[project]/lib/hooks/useEvents.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEvents",
    ()=>useEvents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$events$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/events.api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function useEvents() {
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tickets, setTickets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$events$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventsApi"].getEvents();
            setEvents(data);
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch events.';
            setError(errorMessage);
        } finally{
            setIsLoading(false);
        }
    }, []);
    const fetchEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$events$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventsApi"].getEvent(id);
            return data;
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch event.';
            setError(errorMessage);
            return null;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const fetchTickets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$events$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventsApi"].getMyTickets();
            setTickets(data);
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch tickets.';
            setError(errorMessage);
        } finally{
            setIsLoading(false);
        }
    }, []);
    const cancelTicket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            setError(null);
            setIsLoading(true);
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$events$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eventsApi"].cancelTicket(id);
            setTickets((prev)=>prev.filter((t)=>t.id !== id));
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to cancel ticket.';
            setError(errorMessage);
            throw err;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setError(null);
    }, []);
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
}),
"[project]/lib/hooks/useGroups.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGroups",
    ()=>useGroups
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/groups.api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function useGroups() {
    const [groups, setGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsApi"].getGroups();
            setGroups(data);
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch groups.';
            setError(errorMessage);
        } finally{
            setIsLoading(false);
        }
    }, []);
    const fetchGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsApi"].getGroup(id);
            return data;
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch group.';
            setError(errorMessage);
            return null;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const joinGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            setError(null);
            setIsLoading(true);
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsApi"].joinGroup(id);
            // Refresh groups to update membership status
            await fetchGroups();
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to join group.';
            setError(errorMessage);
            throw err;
        } finally{
            setIsLoading(false);
        }
    }, [
        fetchGroups
    ]);
    const leaveGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            setError(null);
            setIsLoading(true);
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsApi"].leaveGroup(id);
            // Refresh groups to update membership status
            await fetchGroups();
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to leave group.';
            setError(errorMessage);
            throw err;
        } finally{
            setIsLoading(false);
        }
    }, [
        fetchGroups
    ]);
    const fetchGroupPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (groupId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsApi"].getGroupPosts(groupId);
            setPosts(data);
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch posts.';
            setError(errorMessage);
            setPosts([]);
        } finally{
            setIsLoading(false);
        }
    }, []);
    const createPost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (groupId, data)=>{
        try {
            setError(null);
            setIsLoading(true);
            const post = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsApi"].createPost(groupId, data);
            setPosts((prev)=>[
                    post,
                    ...prev
                ]);
            return post;
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to create post.';
            setError(errorMessage);
            return null;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const fetchPost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (postId)=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsApi"].getPost(postId);
            return data;
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch post.';
            setError(errorMessage);
            return null;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const deletePost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (postId)=>{
        try {
            setError(null);
            setIsLoading(true);
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsApi"].deletePost(postId);
            setPosts((prev)=>prev.filter((p)=>p.id !== postId));
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to delete post.';
            setError(errorMessage);
            throw err;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const createComment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (postId, data)=>{
        try {
            setError(null);
            setIsLoading(true);
            const comment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsApi"].createComment(postId, data);
            // Refresh posts to get updated comments
            const updatedPost = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsApi"].getPost(postId);
            if (updatedPost) {
                setPosts((prev)=>prev.map((p)=>p.id === postId ? updatedPost : p));
            }
            return comment;
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to create comment.';
            setError(errorMessage);
            return null;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const deleteComment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (commentId)=>{
        try {
            setError(null);
            setIsLoading(true);
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsApi"].deleteComment(commentId);
        // Note: You may need to refresh the specific post to update comments
        // This is a simplified version
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to delete comment.';
            setError(errorMessage);
            throw err;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const addReaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (targetType, targetId, type)=>{
        try {
            setError(null);
            setIsLoading(true);
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsApi"].addReaction(targetType, targetId, type);
            // Refresh posts to get updated reactions
            // This could be optimized to only update the specific post/comment
            if (targetType === 'POST') {
                const updatedPost = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsApi"].getPost(targetId);
                if (updatedPost) {
                    setPosts((prev)=>prev.map((p)=>p.id === targetId ? updatedPost : p));
                }
            }
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to add reaction.';
            setError(errorMessage);
            throw err;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const removeReaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (targetType, targetId)=>{
        try {
            setError(null);
            setIsLoading(true);
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsApi"].removeReaction(targetType, targetId);
            // Refresh posts to get updated reactions
            if (targetType === 'POST') {
                const updatedPost = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$groups$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsApi"].getPost(targetId);
                if (updatedPost) {
                    setPosts((prev)=>prev.map((p)=>p.id === targetId ? updatedPost : p));
                }
            }
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to remove reaction.';
            setError(errorMessage);
            throw err;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setError(null);
    }, []);
    const clearPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setPosts([]);
    }, []);
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
}),
"[project]/lib/hooks/useCredits.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCredits",
    ()=>useCredits
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$credits$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/credits.api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function useCredits() {
    const [creditPacks, setCreditPacks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [balance, setBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchCreditPacks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$credits$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["creditsApi"].getCreditPacks();
            setCreditPacks(data);
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch credit packs.';
            setError(errorMessage);
        } finally{
            setIsLoading(false);
        }
    }, []);
    const fetchBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$credits$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["creditsApi"].getCreditBalance();
            setBalance(data);
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch credit balance.';
            setError(errorMessage);
        } finally{
            setIsLoading(false);
        }
    }, []);
    const fetchTransactions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$credits$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["creditsApi"].getCreditTransactions();
            setTransactions(data);
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch transactions.';
            setError(errorMessage);
        } finally{
            setIsLoading(false);
        }
    }, []);
    const submitQuestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (data)=>{
        try {
            setError(null);
            setIsLoading(true);
            const submitted = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$credits$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["creditsApi"].submitQuestions(data);
            setQuestions((prev)=>[
                    ...submitted,
                    ...prev
                ]);
            // Refresh balance after spending credits
            await fetchBalance();
            return submitted;
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to submit questions.';
            setError(errorMessage);
            return null;
        } finally{
            setIsLoading(false);
        }
    }, [
        fetchBalance
    ]);
    const fetchQuestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$credits$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["creditsApi"].getMyQuestions();
            setQuestions(data);
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch questions.';
            setError(errorMessage);
        } finally{
            setIsLoading(false);
        }
    }, []);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setError(null);
    }, []);
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
}),
"[project]/lib/hooks/useCheckout.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCheckout",
    ()=>useCheckout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$checkout$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/checkout.api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function useCheckout() {
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const checkout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (data)=>{
        try {
            setError(null);
            setIsLoading(true);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$checkout$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["checkoutApi"].checkout(data);
            return response;
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to complete checkout.';
            setError(errorMessage);
            return null;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setError(null);
    }, []);
    return {
        isLoading,
        error,
        checkout,
        clearError
    };
}
}),
"[project]/lib/hooks/useAdminCredits.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAdminCredits",
    ()=>useAdminCredits
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/api/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$admin$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/admin.api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function useAdminCredits() {
    const [creditPacks, setCreditPacks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchAllCreditPacks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setError(null);
            setIsLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$admin$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminApi"].getAllCreditPacks();
            setCreditPacks(data);
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to fetch credit packs.';
            setError(errorMessage);
        } finally{
            setIsLoading(false);
        }
    }, []);
    const createCreditPack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (data)=>{
        try {
            setError(null);
            setIsLoading(true);
            const newPack = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$admin$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminApi"].createCreditPack(data);
            setCreditPacks((prev)=>[
                    newPack,
                    ...prev
                ]);
            return newPack;
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to create credit pack.';
            setError(errorMessage);
            return null;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const updateCreditPack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id, data)=>{
        try {
            setError(null);
            setIsLoading(true);
            const updatedPack = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$admin$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminApi"].updateCreditPack(id, data);
            setCreditPacks((prev)=>prev.map((pack)=>pack.id === id ? updatedPack : pack));
            return updatedPack;
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to update credit pack.';
            setError(errorMessage);
            return null;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const deleteCreditPack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        try {
            setError(null);
            setIsLoading(true);
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$admin$2e$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminApi"].deleteCreditPack(id);
            setCreditPacks((prev)=>prev.filter((pack)=>pack.id !== id));
            return true;
        } catch (err) {
            const errorMessage = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiClientError"] ? err.message : 'Failed to delete credit pack.';
            setError(errorMessage);
            return false;
        } finally{
            setIsLoading(false);
        }
    }, []);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setError(null);
    }, []);
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
}),
"[project]/lib/hooks/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useBookings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useBookings.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCourses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useCourses.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useEvents.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useGroups$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useGroups.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCredits$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useCredits.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCheckout$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useCheckout.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAdminCredits$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useAdminCredits.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
}),
"[project]/contexts/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuthContext",
    ()=>useAuthContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/hooks/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useAuth.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: auth,
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/AuthContext.tsx",
        lineNumber: 28,
        columnNumber: 10
    }, this);
}
function useAuthContext() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}
}),
"[project]/contexts/Providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/theme-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        attribute: "class",
        defaultTheme: "dark",
        enableSystem: true,
        disableTransitionOnChange: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
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
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c4804da8._.js.map