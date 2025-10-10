import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import productStroller from "@/assets/product-stroller.jpg";
import productCrib from "@/assets/product-crib.jpg";
import productClothes from "@/assets/product-clothes.jpg";
import productToys from "@/assets/product-toys.jpg";

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
}

const Products = () => {
  const [customProducts, setCustomProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load custom products from localStorage
    const savedProducts = localStorage.getItem("customProducts");
    if (savedProducts) {
      setCustomProducts(JSON.parse(savedProducts));
    }
  }, []);

  const defaultProducts = [
    {
      id: 1,
      image: productStroller,
      title: "Cotxet Rosa Pastel",
      description: "Cotxet en excel·lent estat, amb cistella de compra i parasol inclòs.",
      price: "85€",
    },
    {
      id: 2,
      image: productCrib,
      title: "Bressol de Fusta Natural",
      description: "Bressol ecològic de fusta, perfecte per als primers mesos del bebè.",
      price: "120€",
    },
    {
      id: 3,
      image: productClothes,
      title: "Lot de Roba de Bebè",
      description: "Conjunt de 10 peces de roba, colors pastels, talla 0-6 mesos.",
      price: "35€",
    },
    {
      id: 4,
      image: productToys,
      title: "Joguines Educatives",
      description: "Lot de joguines de fusta i tela suau, ideals per estimular els sentits.",
      price: "25€",
    },
    {
      id: 5,
      image: productStroller,
      title: "Cotxet de Passeig",
      description: "Model lleuger i fàcil de plegar, perfecte per a viatges.",
      price: "95€",
    },
    {
      id: 6,
      image: productClothes,
      title: "Conjunt Hivern",
      description: "Roba d'hivern talla 6-12 mesos, colors suaus i càlids.",
      price: "40€",
    },
  ];

  // Combine default and custom products
  const allProducts = [...defaultProducts, ...customProducts];

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Els Nostres Productes</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descobreix articles de segona mà per al teu bebè. Qualitat, sostenibilitat i preus
            justos.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
