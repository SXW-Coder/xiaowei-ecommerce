import { productsAction } from "@/actions/products"
import Products from "@/components/Products"

export default async function ApparelPage() {
  const res = await productsAction()

  return (
    <div className="p-6">
      <Products data={res.data} category="shoes" />
    </div>
  )
}
