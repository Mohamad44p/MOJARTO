import { HeroProducts } from '@/components/Products/HeroProducts'
import ProductsList from '@/components/Products/ProductsList'
import { FC } from 'react'

interface ProductsProps {}

const Products: FC<ProductsProps> = () => {
  return (
    <div>
       <HeroProducts/> 
       <ProductsList/>
    </div>
  )
}

export default Products