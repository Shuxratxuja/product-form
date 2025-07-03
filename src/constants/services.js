import { instance } from "../api/inctance"

export const productsService = {
    get: async () => {
        const responce = await instance('/products')
        return responce
    }
}

export const addProduct = async (productData) => {
  const res = await instance.post('/products', productData)
  return res.data
}


export const updateProduct = async (id, updatedData) => {
  const response = await instance.put(`/products/${id}`, updatedData);
  return response.data;
};


export const deleteProduct = async (id) => {
  const res = await instance.delete(`/products/${id}`)
  return res.data
}