import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
}

const ProductCard = ({ image, title, description, price }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-3 md:p-4 flex-1">
        <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">{title}</h3>
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="p-3 md:p-4 pt-0">
        <p className="text-xl md:text-2xl font-bold text-primary">{price}</p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
