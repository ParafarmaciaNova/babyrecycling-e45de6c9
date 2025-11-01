import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Trash2, Shield, Upload, X, Edit } from "lucide-react";
import { Session, User } from "@supabase/supabase-js";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            checkAdminStatus(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setLoading(false);
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (error) throw error;
      
      setIsAdmin(!!data);
      
      if (data) {
        loadProducts();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No s'ha pogut verificar l'estat d'administrador",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No s'han pogut carregar els productes",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/auth");
      toast({
        title: "Sessió tancada",
        description: "Has tancat la sessió correctament",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview("");
    setNewProduct({ ...newProduct, image: "" });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
    });
    if (product.image && product.image.startsWith('data:')) {
      setImagePreview(product.image);
    } else if (product.image && product.image !== '/placeholder.svg') {
      setImagePreview(product.image);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setNewProduct({
      title: "",
      description: "",
      price: "",
      image: "",
    });
    setImageFile(null);
    setImagePreview("");
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newProduct.title || !newProduct.description || !newProduct.price) {
      toast({
        title: "Error",
        description: "Si us plau, omple tots els camps obligatoris",
        variant: "destructive",
      });
      return;
    }

    const priceNumber = parseFloat(newProduct.price);
    if (isNaN(priceNumber) || priceNumber < 0) {
      toast({
        title: "Error",
        description: "El preu ha de ser un número vàlid",
        variant: "destructive",
      });
      return;
    }

    let imageUrl = newProduct.image.trim() || "/placeholder.svg";

    // Convert image file to base64 if uploaded
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        imageUrl = reader.result as string;
        if (editingProduct) {
          await updateProduct(imageUrl, priceNumber);
        } else {
          await saveProduct(imageUrl, priceNumber);
        }
      };
      reader.readAsDataURL(imageFile);
    } else {
      if (editingProduct) {
        await updateProduct(imageUrl, priceNumber);
      } else {
        await saveProduct(imageUrl, priceNumber);
      }
    }
  };

  const saveProduct = async (imageUrl: string, priceNumber: number) => {
    try {
      const { error } = await supabase
        .from("products")
        .insert({
          title: newProduct.title.trim(),
          description: newProduct.description.trim(),
          price: priceNumber,
          image: imageUrl,
          created_by: user?.id,
        });

      if (error) throw error;

      toast({
        title: "Producte afegit!",
        description: "El producte s'ha afegit correctament",
      });

      // Reset form and reload products
      setNewProduct({
        title: "",
        description: "",
        price: "",
        image: "",
      });
      setImageFile(null);
      setImagePreview("");
      
      loadProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No s'ha pogut afegir el producte",
        variant: "destructive",
      });
    }
  };

  const updateProduct = async (imageUrl: string, priceNumber: number) => {
    if (!editingProduct) return;

    try {
      const { error } = await supabase
        .from("products")
        .update({
          title: newProduct.title.trim(),
          description: newProduct.description.trim(),
          price: priceNumber,
          image: imageUrl,
        })
        .eq("id", editingProduct.id);

      if (error) throw error;

      toast({
        title: "Producte actualitzat!",
        description: "El producte s'ha actualitzat correctament",
      });

      // Reset form and reload products
      setEditingProduct(null);
      setNewProduct({
        title: "",
        description: "",
        price: "",
        image: "",
      });
      setImageFile(null);
      setImagePreview("");
      
      loadProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No s'ha pogut actualitzar el producte",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Producte eliminat",
        description: "El producte s'ha eliminat correctament",
      });

      loadProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No s'ha pogut eliminar el producte",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Carregant...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 rounded-full bg-destructive/10 w-fit">
              <Shield className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Accés Denegat</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              No tens permisos d'administrador per accedir a aquesta pàgina.
            </p>
            <Button onClick={handleLogout} variant="outline" className="rounded-full">
              <LogOut className="h-4 w-4 mr-2" />
              Tancar Sessió
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 md:py-12 px-4">
      <div className="container max-w-6xl">
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Administració</h1>
            <p className="text-sm md:text-base text-muted-foreground">Gestiona els productes de Baby Recycling</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="rounded-full w-full sm:w-auto">
            <LogOut className="h-4 w-4 mr-2" />
            Tancar Sessió
          </Button>
        </div>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          {/* Add Product Form */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {editingProduct ? (
                  <>
                    <Edit className="h-5 w-5" />
                    Editar Producte
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    Afegir Nou Producte
                  </>
                )}
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
                    Preu (€) *
                  </label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    placeholder="Ex: 85"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="image" className="text-sm font-medium">
                    Imatge del producte
                  </label>
                  
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Vista prèvia"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={clearImage}
                        className="absolute top-2 right-2 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="imageFile"
                        className="flex items-center justify-center gap-2 p-6 md:p-8 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary transition-colors"
                      >
                        <Upload className="h-5 w-5" />
                        <span className="text-xs md:text-sm">Puja o fes una foto</span>
                      </label>
                      <Input
                        id="imageFile"
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        o introdueix una URL:
                      </p>
                      <Input
                        id="image"
                        value={newProduct.image}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, image: e.target.value })
                        }
                        placeholder="https://..."
                        className="rounded-xl mt-2"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 rounded-full">
                    {editingProduct ? (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Actualitzar Producte
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Afegir Producte
                      </>
                    )}
                  </Button>
                  {editingProduct && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="rounded-full"
                    >
                      Cancel·lar
                    </Button>
                  )}
                </div>
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
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col sm:flex-row items-start gap-3 p-3 md:p-4 border rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full sm:w-20 h-32 sm:h-20 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm md:text-base">{product.title}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                        <p className="text-sm md:text-base font-bold text-primary mt-1">
                          {product.price}€
                        </p>
                      </div>
                      <div className="flex gap-2 self-end sm:self-start flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditProduct(product)}
                          className="text-primary hover:text-primary"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Admin;
