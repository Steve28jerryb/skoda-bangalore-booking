import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

interface ServiceFormProps {
  selectedCar: string;
  appointmentData: any;
  onBack: () => void;
}

export const ServiceForm = ({ selectedCar, appointmentData, onBack }: ServiceFormProps) => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    vehicleNumber: "",
    kmReading: "",
    serviceType: [],
    additionalNotes: ""
  });

  const serviceTypes = [
    { id: "basic", label: "Basic Service", description: "Oil change, basic checks", price: "₹3,500" },
    { id: "premium", label: "Premium Service", description: "Comprehensive inspection & service", price: "₹6,500" },
    { id: "ac", label: "AC Service", description: "AC cleaning & gas refill", price: "₹2,500" },
    { id: "brake", label: "Brake Service", description: "Brake pad inspection & service", price: "₹4,000" },
    { id: "battery", label: "Battery Check", description: "Battery health & replacement", price: "₹1,500" },
    { id: "wheel", label: "Wheel Alignment", description: "Wheel balancing & alignment", price: "₹2,000" }
  ];

  const generateBookingId = () => {
    const prefix = "SKODA";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  };

  const handleServiceTypeChange = (serviceId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      serviceType: checked
        ? [...prev.serviceType, serviceId]
        : prev.serviceType.filter(id => id !== serviceId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.email || !formData.phone || !formData.vehicleNumber || formData.serviceType.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select at least one service.",
        variant: "destructive"
      });
      return;
    }

    // Generate booking ID
    const newBookingId = generateBookingId();
    setBookingId(newBookingId);
    
    // Simulate booking confirmation
    setIsSubmitted(true);
    toast({
      title: "Appointment Booked Successfully!",
      description: `Your ŠKODA service appointment has been confirmed for ${appointmentData.formattedDate} at ${appointmentData.time}. Booking ID: ${newBookingId}`,
    });
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto text-center">
        <CardContent className="pt-8 pb-8">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600">Your ŠKODA service appointment has been successfully booked.</p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg mb-6">
            <div className="mb-4">
              <div className="text-2xl font-bold text-green-600 mb-2">
                Booking ID: {bookingId}
              </div>
              <p className="text-sm text-gray-600">Please save this booking ID for your records</p>
            </div>
            
            <h3 className="font-semibold mb-4">Appointment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><strong>Customer:</strong> {formData.customerName}</div>
              <div><strong>Vehicle:</strong> {selectedCar.replace('-', ' ')}</div>
              <div><strong>Date:</strong> {appointmentData.formattedDate}</div>
              <div><strong>Time:</strong> {appointmentData.time}</div>
              <div><strong>Vehicle No:</strong> {formData.vehicleNumber}</div>
              <div><strong>Services:</strong> {formData.serviceType.length} selected</div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <p>📍 <strong>Location:</strong> ŠKODA Service Center, Electronic City, Bangalore</p>
            <p>📞 <strong>Contact:</strong> +91 80-4567-8900</p>
            <p>📧 A confirmation email has been sent to {formData.email}</p>
          </div>

          <Button 
            onClick={() => window.location.reload()} 
            className="mt-6 bg-green-600 hover:bg-green-700"
          >
            Book Another Appointment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Details</h2>
        <p className="text-gray-600">Complete your booking information and select required services</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
              <div>
                <Label htmlFor="vehicleNumber">Vehicle Number *</Label>
                <Input
                  id="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, vehicleNumber: e.target.value.toUpperCase() }))}
                  placeholder="KA 01 AB 1234"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="kmReading">Current KM Reading</Label>
                <Input
                  id="kmReading"
                  value={formData.kmReading}
                  onChange={(e) => setFormData(prev => ({ ...prev, kmReading: e.target.value }))}
                  placeholder="25000"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Services *</CardTitle>
            <p className="text-sm text-gray-600">Choose the services you need for your ŠKODA</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceTypes.map((service) => (
                <div
                  key={service.id}
                  className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50"
                >
                  <Checkbox
                    id={service.id}
                    checked={formData.serviceType.includes(service.id)}
                    onCheckedChange={(checked) => handleServiceTypeChange(service.id, !!checked)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={service.id} className="font-medium cursor-pointer">
                      {service.label}
                    </Label>
                    <p className="text-sm text-gray-600">{service.description}</p>
                    <p className="text-sm font-semibold text-green-600">{service.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.additionalNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
              placeholder="Any specific concerns or requests for your vehicle service..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack} className="px-8 py-3">
            Back to Appointment
          </Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
            Confirm Booking
          </Button>
        </div>
      </form>
    </div>
  );
};
