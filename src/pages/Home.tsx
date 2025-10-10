import { Button } from "@/components/ui/button";
import { Heart, Leaf, Euro } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-baby.jpg";

const Home = () => {
  const features = [
    {
      icon: Heart,
      title: "Amb Amor",
      description: "Cada article té una història. Ajuda'ns a continuar-la.",
    },
    {
      icon: Leaf,
      title: "Sostenible",
      description: "Redueix residus i dona una segona vida als productes.",
    },
    {
      icon: Euro,
      title: "Econòmic",
      description: "Estalvia mentre compres el millor per al teu bebè.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-secondary/10 to-accent/10">
        <div className="container py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Dona una segona vida als
                <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  articles de bebè
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Un mercat de segona mà on pots comprar i vendre productes per a bebès de manera
                sostenible, econòmica i plena d'amor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/productes">Explorar Productes</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="/com-funciona">Com Funciona</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Articles de bebè adorables"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Per què Baby Recycling?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Més que un mercat, és una comunitat de famílies que comparteixen valors.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border hover:shadow-lg transition-all duration-300"
                >
                  <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comença avui mateix</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Uneix-te a la nostra comunitat i descobreix com és fàcil donar i rebre amor a través
            dels articles de bebè.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link to="/contacte">Contacta amb nosaltres</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
