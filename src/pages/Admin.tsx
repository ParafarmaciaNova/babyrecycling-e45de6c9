import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock, Plus, Trash2 } from "lucide-react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    // Check if already authenticated in session
    const authenticated = sessionStorage.getItem("adminAuth") === "true";
    setIsAuthenticated(authenticated);

    // Load products from localStorage
    const savedProducts = localStorage.getItem("customProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
      toast({
        title: "Accés concedit",
        description: "Benvingut/da a l'administració",
      });
    } else {
      toast({
        title: "Error",
        description: "Contrasenya incorrecta",
        variant: "destructive",
      });
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newProduct.title || !newProduct.description || !newProduct.price) {
      toast({
        title: "Error",
        description: "Si us plau, omple tots els camps obligatoris",
        variant: "destructive",
      });
      return;
    }

    const product: Product = {
      id: Date.now(),
      ...newProduct,
    };

    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem("customProducts", JSON.stringify(updatedProducts));

    toast({
      title: "Producte afegit!",
      description: "El producte s'ha afegit correctament",
    });

    // Reset form
    setNewProduct({
      title: "",
      description: "",
      price: "",
      image: "",
    });
  };

  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("customProducts", JSON.stringify(updatedProducts));

    toast({
      title: "Producte eliminat",
      description: "El producte s'ha eliminat correctament",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-fit">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Accés a l'Administració</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Contrasenya
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introdueix la contrasenya"
                  className="rounded-xl"
                />
              </div>
              <Button type="submit" className="w-full rounded-full">
                Accedir
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Administració</h1>
          <p className="text-muted-foreground">Gestiona els productes de Baby Recycling</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Add Product Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Afegir Nou Producte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Títol *
                  </label>
                  <Input
                    id="title"
                    value={newProduct.title}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, title: e.target.value })
                    }
                    placeholder="Nom del producte"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Descripció *
                  </label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, description: e.target.value })
                    }
                    placeholder="Descripció del producte"
                    rows={3}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    Preu *
                  </label>
                  <Input
                    id="price"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    placeholder="Ex: 85€"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="image" className="text-sm font-medium">
                    URL de la imatge (opcional)
                  </label>
                  <Input
                    id="image"
                    value={newProduct.image}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, image: e.target.value })
                    }
                    placeholder="https://..."
                    className="rounded-xl"
                  />
                </div>

                <Button type="submit" className="w-full rounded-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Afegir Producte
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Products List */}
          <Card>
            <CardHeader>
              <CardTitle>Productes Personalitzats ({products.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {products.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Encara no hi ha productes personalitzats
                </p>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-start justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">{product.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                        <p className="text-sm font-bold text-primary mt-1">
                          {product.price}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
          <p className="text-sm text-destructive">
            ⚠️ <strong>Avís de seguretat:</strong> Aquesta és una solució temporal amb contrasenya
            hardcoded. Per a una aplicació en producció, utilitza Lovable Cloud amb autenticació
            real i base de dades.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
