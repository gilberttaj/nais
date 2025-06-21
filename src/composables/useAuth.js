import { ref, reactive, computed } from 'vue'

const API_BASE_URL = import.meta.env.VITE_PRIVATE_API_URL || 'https://d0kbc4lmzg-vpce-03e2fb9671d9d8aed.execute-api.ap-northeast-1.amazonaws.com/dev'
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '253508748236-v8b0mno2cbav0l0ljparetkdj81fhem9.apps.googleusercontent.com'


// Validate required environment variables
if (!GOOGLE_CLIENT_ID) {
    console.error('VUE_APP_GOOGLE_CLIENT_ID is required but not found in environment variables')
  }

// Global auth state
const authState = reactive({
  user: null,
  accessToken: null,
  idToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
})

export function useAuth() {
  const isAuthenticated = computed(() => authState.isAuthenticated)
  const user = computed(() => authState.user)
  const isLoading = computed(() => authState.isLoading)
  const error = computed(() => authState.error)

  // Initialize auth from localStorage
  const initAuth = () => {
    const storedTokens = localStorage.getItem('auth_tokens')
    if (storedTokens) {
      try {
        const tokens = JSON.parse(storedTokens)
        if (tokens.accessToken && isTokenValid(tokens.accessToken)) {
          authState.accessToken = tokens.accessToken
          authState.idToken = tokens.idToken
          authState.refreshToken = tokens.refreshToken
          authState.user = parseJwtPayload(tokens.idToken)
          authState.isAuthenticated = true
        } else {
          // Token expired, try to refresh
          refreshTokens()
        }
      } catch (error) {
        console.error('Failed to parse stored tokens:', error)
        clearAuth()
      }
    }
  }

 // Start Google SSO flow
 const loginWithGoogle = async () => {
    try {
      authState.isLoading = true
      authState.error = null

      // Validate Google Client ID is available
      if (!GOOGLE_CLIENT_ID) {
        throw new Error('Google Client ID not configured. Please check VUE_APP_GOOGLE_CLIENT_ID environment variable.')
      }

      const response = await fetch(`${API_BASE_URL}/auth/google/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: GOOGLE_CLIENT_ID // Send for validation
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      // Validate the authUrl contains our client ID (security check)
      if (!data.authUrl || !data.authUrl.includes(GOOGLE_CLIENT_ID)) {
        throw new Error('Invalid Google OAuth URL received from server')
      }
      
      // Redirect to Google OAuth
      window.location.href = data.authUrl
      
    } catch (error) {
      authState.error = error.message
      console.error('Login error:', error)
    } finally {
      authState.isLoading = false
    }
  }


  // Handle Google OAuth callback
  const handleGoogleCallback = async (authorizationCode) => {
    try {
      authState.isLoading = true
      authState.error = null

      const response = await fetch(`${API_BASE_URL}/auth/google/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: authorizationCode
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      // Store tokens
      storeTokens(data)
      
      // Set auth state
      authState.accessToken = data.accessToken
      authState.idToken = data.idToken
      authState.refreshToken = data.refreshToken
      authState.user = parseJwtPayload(data.idToken)
      authState.isAuthenticated = true

      return data
      
    } catch (error) {
      authState.error = error.message
      console.error('Callback error:', error)
      throw error
    } finally {
      authState.isLoading = false
    }
  }

  // Refresh access token
  const refreshTokens = async () => {
    try {
      if (!authState.refreshToken || !authState.user) {
        throw new Error('No refresh token available')
      }

      const response = await fetch(`${API_BASE_URL}/auth/token/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: authState.refreshToken,
          username: authState.user.email
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      // Update tokens
      authState.accessToken = data.accessToken
      authState.idToken = data.idToken
      if (data.refreshToken) {
        authState.refreshToken = data.refreshToken
      }
      
      // Update stored tokens
      storeTokens({
        accessToken: authState.accessToken,
        idToken: authState.idToken,
        refreshToken: authState.refreshToken
      })

      return data
      
    } catch (error) {
      console.error('Token refresh error:', error)
      clearAuth()
      throw error
    }
  }

  // Logout
  const logout = async () => {
    try {
      authState.isLoading = true
      
      if (authState.accessToken) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authState.accessToken}`
          },
          body: JSON.stringify({
            accessToken: authState.accessToken
          })
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAuth()
      authState.isLoading = false
    }
  }

  // Utility functions
  const storeTokens = (tokens) => {
    localStorage.setItem('auth_tokens', JSON.stringify(tokens))
  }

  const clearAuth = () => {
    authState.user = null
    authState.accessToken = null
    authState.idToken = null
    authState.refreshToken = null
    authState.isAuthenticated = false
    authState.error = null
    localStorage.removeItem('auth_tokens')
  }

  const parseJwtPayload = (token) => {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch (error) {
      console.error('Failed to parse JWT:', error)
      return null
    }
  }

  const isTokenValid = (token) => {
    try {
      const payload = parseJwtPayload(token)
      const currentTime = Math.floor(Date.now() / 1000)
      return payload && payload.exp > currentTime
    } catch (error) {
      return false
    }
  }

  // HTTP interceptor for automatic token refresh
  const makeAuthenticatedRequest = async (url, options = {}) => {
    const makeRequest = async (token) => {
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
    }

    try {
      // First attempt with current token
      let response = await makeRequest(authState.accessToken)
      
      // If unauthorized, try to refresh token
      if (response.status === 401 && authState.refreshToken) {
        await refreshTokens()
        response = await makeRequest(authState.accessToken)
      }
      
      return response
    } catch (error) {
      console.error('Authenticated request failed:', error)
      throw error
    }
  }

  return {
    // State
    isAuthenticated,
    user,
    isLoading,
    error,
    
    // Methods
    initAuth,
    loginWithGoogle,
    handleGoogleCallback,
    refreshTokens,
    logout,
    makeAuthenticatedRequest,
    
    // Configuration (for debugging)
    getConfig: () => ({
      apiBaseUrl: API_BASE_URL,
      googleClientId: GOOGLE_CLIENT_ID
    })
  }
}