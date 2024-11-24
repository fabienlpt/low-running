import { getProductById } from "@/libs/products";
import { Heart, ShoppingCart, Star } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color?: string; size?: string; image?: string }>;
};

export default async function ProductPage({ params, searchParams }: Props) {
  // Attendre la résolution des deux promesses
  const [{ id }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  const product = await getProductById(parseInt(id));

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  const selectedColor = resolvedSearchParams.color || product.colors[0];
  const selectedSize = resolvedSearchParams.size || product.sizes[0];
  const currentImageIndex = resolvedSearchParams.image
    ? parseInt(resolvedSearchParams.image)
    : 0;
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery Section */}
          <div className="relative">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <>
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.images.length > 1 && (
                    <>
                      <a
                        href={`/products/${product.id}?image=${
                          currentImageIndex === 0
                            ? product.images.length - 1
                            : currentImageIndex - 1
                        }${selectedColor ? `&color=${selectedColor}` : ""}${
                          selectedSize ? `&size=${selectedSize}` : ""
                        }`}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                      >
                        <span className="sr-only">Image précédente</span>
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </a>
                      <a
                        href={`/products/${product.id}?image=${
                          currentImageIndex === product.images.length - 1
                            ? 0
                            : currentImageIndex + 1
                        }${selectedColor ? `&color=${selectedColor}` : ""}${
                          selectedSize ? `&size=${selectedSize}` : ""
                        }`}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                      >
                        <span className="sr-only">Image suivante</span>
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">Aucune image disponible</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="mt-4 flex space-x-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <a
                    key={index}
                    href={`/products/${product.id}?image=${index}${
                      selectedColor ? `&color=${selectedColor}` : ""
                    }${selectedSize ? `&size=${selectedSize}` : ""}`}
                    className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
                      currentImageIndex === index ? "ring-2 ring-black" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - vue ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="space-y-8 lg:max-w-[400px]">
            <div>
              <h1 className="text-3xl font-bold mb-2 font-nike">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-4">{product.category}</p>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">(121 avis)</span>
              </div>
              <p className="text-2xl font-bold">{product.price}€</p>
            </div>

            {/* Color Selection */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Couleurs disponibles
              </h2>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <a
                    key={color}
                    href={`/products/${product.id}?color=${color}${
                      resolvedSearchParams.image
                        ? `&image=${resolvedSearchParams.image}`
                        : ""
                    }${selectedSize ? `&size=${selectedSize}` : ""}`}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Tailles disponibles
              </h2>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <a
                    key={size}
                    href={`/products/${product.id}?size=${size}${
                      resolvedSearchParams.image
                        ? `&image=${resolvedSearchParams.image}`
                        : ""
                    }${selectedColor ? `&color=${selectedColor}` : ""}`}
                    className={`py-3 rounded-md text-center ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </a>
                ))}
              </div>
            </div>

            {/* Material */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Matériaux</h2>
              <p className="text-gray-600">{product.material}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Caractéristiques</h2>
              <ul className="list-disc list-inside space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to Cart Section */}
            <form
              action="/api/cart"
              method="POST"
              className="space-y-4 pt-6 w-full"
            >
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="size" value={selectedSize} />
              <input type="hidden" name="color" value={selectedColor} />
              <button
                type="submit"
                className="flex-1 bg-black text-white py-4 rounded-[30px] hover:bg-opacity-50 flex items-center justify-center space-x-2 w-full"
              >
                <span>Ajouter au panier</span>
              </button>
              <button
                type="button"
                className="p-4 border border-gray-200 rounded-[30px] hover:border-black flex items-center justify-center space-x-2 w-full"
              >
                <span>Ajouter aux favoris</span>
                <Heart className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
