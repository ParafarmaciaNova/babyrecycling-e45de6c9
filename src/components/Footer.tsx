import { Baby, Facebook, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Baby className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Baby Recycling
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Donant una segona vida als articles de bebè. Sostenible, econòmic i fàcil.
            </p>
          </div>

          {/* Links section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Enllaços</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/productes" className="hover:text-primary transition-colors">
                  Productes
                </Link>
              </li>
              <li>
                <Link to="/com-funciona" className="hover:text-primary transition-colors">
                  Com Funciona
                </Link>
              </li>
              <li>
                <Link to="/contacte" className="hover:text-primary transition-colors">
                  Contacte
                </Link>
              </li>
            </ul>
          </div>

          {/* Social section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Segueix-nos</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/ParafarmaciaNova"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/parafarmacianova2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@baby-recycling.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 Baby Recycling. Tots els drets reservats.</p>
          <p className="mt-2">
            <Link to="/avis-legal" className="hover:text-primary transition-colors">
              Avís Legal
            </Link>
            {" · "}
            <Link to="/privacitat" className="hover:text-primary transition-colors">
              Política de Privacitat
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
