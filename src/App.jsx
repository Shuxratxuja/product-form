import { useEffect, useState } from "react"
import { productsService } from "./constants/services"
import ProductCards from "./components/layout/ProductCards"
import { Skeleton } from "./components/ui/skeleton"
import { instance } from "./api/inctance"
import AddProductModal from "./components/layout/AddProducts"

function App() {

   const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const {get} = productsService

  useEffect(() => {
    setIsLoading(true)
    get().then((res) => {
      setProducts(res?.data)
      setIsLoading(false)
    })
    .catch((err) =>{
      toast(err.message)
      setIsLoading(false)
    })
  }, [])

  const fetchProducts = async () => {
    const res = await instance.get('/products')
    setProducts(res.data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  
  const handleAdded = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]) 
  }

  const handleDeleted = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

    const handleProductUpdate = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    )
  }

  return (
    <div>
       <div className='flex justify-between p-4'>
          <p className='text-2xl font-bold'>Logo</p>
        <AddProductModal onAdded={handleAdded} />
      </div>
      <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 p-4">
         {isLoading &&
            Array.from({length:8 -products.length }).map((_, index) => (
              <div key={`skeleton-${index}`}>
                <Skeleton className="w-full h-[250px]" />
                <Skeleton className="w-full h-[20px] mt-3" />
                <Skeleton className="w-full h-[20px] mt-3" />
                <Skeleton className="w-full h-[40px] mt-3" />
              </div>
          ))}
        {products.map((product, id) => (
            <ProductCards key={id} product={product} onDeleted={handleDeleted} onUpdated={handleProductUpdate}/> 
          ))}
      </div>
    </div>
  )
}

export default App
