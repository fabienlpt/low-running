import { getActiveOrders, getPastOrders, formatDate } from "@/libs/orders";
import { PackageSearch, Truck, Box, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default async function OrdersPage() {
  const activeOrders = await getActiveOrders(1);
  const pastOrders = await getPastOrders(1);

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mes commandes</h1>
          <p className="text-gray-600 mt-2">
            Suivez vos commandes en cours et consultez votre historique
          </p>
        </div>

        {activeOrders.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              Commandes en cours
            </h2>

            <div className="space-y-6">
              {activeOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl p-6 border border-gray-100"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100">
                      {order.product.images &&
                      order.product.images.length > 0 ? (
                        <Image
                          src={order.product.images[0]}
                          alt={order.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <PackageSearch className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {order.product.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {order.size} • {order.color}
                          </p>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {order.status === "shipped"
                            ? "En livraison"
                            : "En préparation"}
                        </span>
                      </div>

                      {order.trackingNumber && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-700">
                            Numéro de suivi: {order.trackingNumber}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Livraison estimée:{" "}
                            {formatDate(order.estimatedDeliveryDate!)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Box className="w-5 h-5 text-gray-600" />
            Commandes passées
          </h2>

          <div className="space-y-6">
            {pastOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl p-6 border border-gray-100"
              >
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100">
                    {order.product.images && order.product.images.length > 0 ? (
                      <Image
                        src={order.product.images[0]}
                        alt={order.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PackageSearch className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {order.product.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {order.size} • {order.color}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
                          <CheckCircle2 className="w-4 h-4" />
                          Livré le {formatDate(order.deliveredDate!)}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">
                          Commandé le {formatDate(order.orderDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
