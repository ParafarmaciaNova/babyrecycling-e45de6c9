import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";
const Contact = () => {
  const contactInfo = [{
    icon: Mail,
    title: "Email",
    content: "info@baby-recycling.com"
  }, {
    icon: Phone,
    title: "Telèfon",
    content: "640 632 108"
  }, {
    icon: MapPin,
    title: "Adreça",
    content: "Barcelona, Catalunya"
  }];
  return <div className="min-h-screen py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacte</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tens alguna pregunta o vols vendre els teus articles? Escriu-nos i t'ajudarem
            encantats.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Informació de contacte</h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return <div key={index} className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        <p className="text-muted-foreground">{info.content}</p>
                      </div>
                    </div>;
              })}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
              <h3 className="font-semibold mb-2">Horari d'atenció</h3>
              <p className="text-sm text-muted-foreground">
                De dilluns a divendres de 10:00 a 14:00 i de 16:30 a 20:30.
                <br />
                Dissabtes de 10:00 a 14:00.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 rounded-2xl border shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Envia'ns un missatge</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>;
};
export default Contact;
