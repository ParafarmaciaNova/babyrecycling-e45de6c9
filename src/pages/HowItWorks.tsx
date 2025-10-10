import { Upload, Search, Heart, Package } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "1. Explora",
      description:
        "Navega pel nostre catàleg de productes de segona mà. Filtra per categoria, preu o estat.",
    },
    {
      icon: Heart,
      title: "2. Troba el que necessites",
      description:
        "Tria els articles que t'agraden. Tots els productes han estat curats amb cura i amor.",
    },
    {
      icon: Package,
      title: "3. Contacta amb el venedor",
      description:
        "Posa't en contacte amb el venedor per acordar la recollida o enviament del producte.",
    },
    {
      icon: Upload,
      title: "4. Vendre és fàcil",
      description:
        "També pots vendre els articles que el teu bebè ja no necessita. Contacta'ns i t'ajudarem!",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Com Funciona?</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprar i vendre articles de bebè mai ha estat tan fàcil. Segueix aquests passos i
            comença avui mateix.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Tens preguntes?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Estem aquí per ajudar-te. Contacta amb nosaltres i t'explicarem tot el que necessites
            saber sobre Baby Recycling.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
