/**
 * Service factory function
 * @param {string} baseURL - API base URL
 * @param {object} [defaultHeaders={}] - Default request headers
 * @returns {object} - Service instance with methods to interact with the API
 */
const createService = (baseURL, defaultHeaders = {}) => {
  const interceptors = {
    request: [],
    response: []
  }

  /**
   * Set Authorization token
   * @param {string} token - Authorization token
   */
  const setAuthorizationToken = token => {
    defaultHeaders['Authorization'] = 'Bearer ' + token
  }

  /**
   * Add a request interceptor
   * @param {Function} interceptor - Function to modify headers before the request
   */
  const addRequestInterceptor = interceptor => {
    interceptors.request.push(interceptor)
  }

  /**
   * Add a response interceptor
   * @param {Function} interceptor - Function to handle responses after the request
   */
  const addResponseInterceptor = interceptor => {
    interceptors.response.push(interceptor)
  }

  /**
   * Make a request to the API
   * @param {object} params - Request parameters
   * @param {string} params.method - HTTP method { GET, POST, PUT, DELETE }
   * @param {string} params.endpoint - API endpoint
   * @param {object|null} [params.body=null] - Request body (For POST and PUT requests)
   * @param {object} [params.headers={}] - Additional request headers
   * @returns {Promise<object>} - Response data
   */
  const request = async ({ method, endpoint, body = null, headers = {} }) => {
    let finalHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
      ...headers
    }

    // Apply request interceptors
    interceptors.request.forEach(interceptor => {
      finalHeaders = interceptor(finalHeaders) || finalHeaders
    })

    const config = {
      method,
      headers: finalHeaders
    }

    if (body) config.body = JSON.stringify(body)

    try {
      const response = await fetch(baseURL + endpoint, config)

      // Apply response interceptors
      interceptors.response.forEach(interceptor => {
        interceptor(response)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Something went wrong')
      }

      return await response.json()
    } catch (error) {
      console.log('API Request Error: ', error)
      throw error
    }
  }

  return {
    /**
     * GET request
     * @param {string} endpoint - API endpoint
     * @param {object} [headers={}] - Additional request headers
     * @returns {Promise<object>} - Response data
     */
    get: (endpoint, headers = {}) =>
      request({ method: 'GET', endpoint, headers }),

    /**
     * POST request
     * @param {string} endpoint - API endpoint
     * @param {object} body - Request body
     * @param {object} [headers={}] - Additional request headers
     * @returns {Promise<object>} - Response data
     */
    post: (endpoint, body, headers = {}) =>
      request({ method: 'POST', endpoint, body, headers }),

    /**
     * PUT request
     * @param {string} endpoint - API endpoint
     * @param {object} body - Request body
     * @param {object} [headers={}] - Additional request headers
     * @returns {Promise<object>} - Response data
     */
    put: (endpoint, body, headers = {}) =>
      request({ method: 'PUT', endpoint, body, headers }),

    /**
     * DELETE request
     * @param {string} endpoint - API endpoint
     * @param {object} [headers={}] - Additional request headers
     * @returns {Promise<object>} - Response data
     */
    delete: (endpoint, headers = {}) =>
      request({ method: 'DELETE', endpoint, headers }),

    /**
     * Set Authorization token
     */
    setAuthorizationToken,

    /**
     * Add a request interceptor
     */
    addRequestInterceptor,

    /**
     * Add a response interceptor
     */
    addResponseInterceptor
  }
}

export default createService