
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CarSelectionProps {
  selectedCar: string;
  onCarSelect: (car: string) => void;
  onNext: () => void;
}

export const CarSelection = ({ selectedCar, onCarSelect, onNext }: CarSelectionProps) => {
  const skodaCars = [
    {
      id: "octavia",
      name: "ŠKODA Octavia",
      variant: "1.5 TSI & 2.0 TSI",
      price: "₹26.29 - ₹37.99 Lakh",
      image: "/lovable-uploads/f58c2523-5446-4018-a3d1-efacedb48506.png",
      features: ["Sedan", "Petrol", "Manual/Automatic"]
    },
    {
      id: "superb",
      name: "ŠKODA Superb",
      variant: "2.0 TSI",
      price: "₹36.29 - ₹39.99 Lakh",
      image: "/lovable-uploads/f58c2523-5446-4018-a3d1-efacedb48506.png",
      features: ["Sedan", "Petrol", "Automatic"]
    },
    {
      id: "kodiaq",
      name: "ŠKODA Kodiaq",
      variant: "2.0 TSI",
      price: "₹39.99 - ₹42.99 Lakh",
      image: "/lovable-uploads/a8ccfc03-fe27-4628-a2fa-a96402a512c1.png",
      features: ["SUV", "Petrol", "Automatic", "7-Seater"]
    },
    {
      id: "kushaq",
      name: "ŠKODA Kushaq",
      variant: "1.0 TSI & 1.5 TSI",
      price: "₹11.89 - ₹20.49 Lakh",
      image: "/lovable-uploads/5f94cf38-e6ad-4b95-a34c-cad81a909a52.png",
      features: ["Compact SUV", "Petrol", "Manual/Automatic"]
    },
    {
      id: "slavia",
      name: "ŠKODA Slavia",
      variant: "1.0 TSI & 1.5 TSI",
      price: "₹11.69 - ₹19.49 Lakh",
      image: "/lovable-uploads/5f94cf38-e6ad-4b95-a34c-cad81a909a52.png",
      features: ["Sedan", "Petrol", "Manual/Automatic"]
    },
    {
      id: "karoq",
      name: "ŠKODA Karoq",
      variant: "1.5 TSI",
      price: "₹26.49 - ₹30.99 Lakh",
      image: "/lovable-uploads/a8ccfc03-fe27-4628-a2fa-a96402a512c1.png",
      features: ["Compact SUV", "Petrol", "Automatic"]
    }
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Your ŠKODA Model</h2>
        <p className="text-gray-600">Choose your vehicle model to book a service appointment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {skodaCars.map((car) => (
          <Card
            key={car.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedCar === car.id
                ? "ring-2 ring-green-600 shadow-lg scale-105"
                : "hover:scale-102"
            }`}
            onClick={() => onCarSelect(car.id)}
          >
            <CardHeader className="pb-3">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover rounded-lg mb-3 bg-white"
              />
              <CardTitle className="text-xl text-gray-900">{car.name}</CardTitle>
              <p className="text-sm text-gray-600">{car.variant}</p>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-green-600 mb-3">{car.price}</p>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button
          onClick={onNext}
          disabled={!selectedCar}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
        >
          Continue to Appointment Booking
        </Button>
      </div>
    </div>
  );
};
