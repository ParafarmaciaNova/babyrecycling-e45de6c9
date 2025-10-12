import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Si us plau, omple tots els camps.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Missatge enviat!",
      description: "Ens posarem en contacte amb tu aviat.",
    });

    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setFiles([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Nom
        </label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="El teu nom"
          className="rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="el.teu@email.cat"
          className="rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Missatge
        </label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Escriu el teu missatge aquí..."
          rows={6}
          className="rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="photos" className="text-sm font-medium">
          Fotos (opcional)
        </label>
        <div className="space-y-3">
          <label
            htmlFor="photos"
            className="flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary transition-colors"
          >
            <Upload className="h-5 w-5" />
            <span className="text-sm">Puja o fes una foto</span>
          </label>
          <Input
            id="photos"
            type="file"
            multiple
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-muted rounded-lg"
                >
                  <span className="text-sm truncate flex-1">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-8"
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-full bg-primary hover:bg-primary/90"
      >
        Enviar Missatge
      </Button>
    </form>
  );
};

export default ContactForm;
