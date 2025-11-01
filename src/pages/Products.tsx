import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/ProductCard";
import productStroller from "@/assets/product-stroller.jpg";
import productCrib from "@/assets/product-crib.jpg";
import productClothes from "@/assets/product-clothes.jpg";
import productToys from "@/assets/product-toys.jpg";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
}

const Products = () => {
  const { toast } = useToast();
  const [dbProducts, setDbProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedProducts = (data || []).map((p) => ({
        id: p.id,
        image: p.image || "/placeholder.svg",
        title: p.title,
        description: p.description,
        price: `${p.price}€`,
      }));

      setDbProducts(formattedProducts);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No s'han pogut carregar els productes de la base de dades",
        variant: "destructive",
      });
    }
  };

  // Only show database products
  const allProducts = dbProducts;

  return (
    <div className="min-h-screen py-6 md:py-12 px-4">
      <div className="container">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Els Nostres Productes</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Descobreix articles de segona mà per al teu bebè. Qualitat, sostenibilitat i preus
            justos.
          </p>
        </div>

        {allProducts.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            Encara no hi ha productes disponibles
          </p>
        ) : (
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
        )}
      </div>
    </div>
  );
};

export default Products;
