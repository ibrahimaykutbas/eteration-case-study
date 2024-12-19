import createService from './createService'

const productsApi = createService('https://5fc9346b2af77700165ae514.mockapi.io/')

productsApi.addRequestInterceptor(headers => {
  //console.log('Request Interceptor: ', headers)
  return headers
})

productsApi.addResponseInterceptor(response => {
  //console.log('Response Interceptor: ', response)
})

const getProducts = async () => {
  return await productsApi.get('/products')
}

export default { getProducts }
