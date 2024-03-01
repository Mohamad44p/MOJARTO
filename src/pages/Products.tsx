import { HeroProducts } from '@/components/Products/HeroProducts'
import { FC } from 'react'

interface ProductsProps {}

const Products: FC<ProductsProps> = () => {
  return (
    <div>
       <HeroProducts/> 
    </div>
  )
}

export default Products