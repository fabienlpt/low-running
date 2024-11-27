import Link from 'next/link'
import {Product} from "@/libs/products";

export default function ProductCard({product}: { product: Product }) {
    return (
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden border border-gray-300 mx-auto">
            <div className="relative w-full h-64">
                {product.images && product.images.length > 0 ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                        <span className="text-gray-400">Image not available</span>
                    </div>
                )}
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
            <span
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {product.category}
            </span>
                        <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</div>
                </div>
                <div className="space-y-">
                    <div className="text-sm text-gray-600">{product.sizes.length + ' tailles'}</div>
                    <div className="text-sm text-gray-600">{product.colors.length + ' couleurs'}</div>
                    <div className="text-sm text-gray-600">{product.material}</div>
                </div>
            </div>
            <div className="px-5 py-3 bg-gray-50">
                <Link href={`/product/${product.id}`}
                      className="w-full block text-center bg-black text-white font-bold py-2 px-4 rounded transition duration-300">
                    View Product
                </Link>
            </div>
        </div>
    )
}