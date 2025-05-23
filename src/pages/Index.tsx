
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CarSelection } from "@/components/CarSelection";
import { AppointmentBooking } from "@/components/AppointmentBooking";
import { ServiceForm } from "@/components/ServiceForm";
import { Calendar, Clock, MapPin, Phone, Mail } from "lucide-react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCar, setSelectedCar] = useState("");
  const [appointmentData, setAppointmentData] = useState({});

  const steps = [
    { number: 1, title: "Select Your Car" },
    { number: 2, title: "Choose Appointment" },
    { number: 3, title: "Service Details" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border">
              <svg viewBox="0 0 120 120" className="w-12 h-12">
                <text x="60" y="70" textAnchor="middle" className="fill-green-600 text-2xl font-bold">ŠKODA</text>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ŠKODA Service Center</h1>
              <p className="text-gray-600">Bangalore City</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>+91 80-4567-8900</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>service@skoda.in</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Book Your ŠKODA Service Appointment</h2>
          <p className="text-xl mb-8 text-green-100">
            Professional service for your ŠKODA with genuine parts and expert technicians
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="w-6 h-6" />
              <span>Easy Online Booking</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-6 h-6" />
              <span>1-Hour Time Slots</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="w-6 h-6" />
              <span>Bangalore Location</span>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step.number <= currentStep
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`ml-2 ${
                    step.number <= currentStep ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-16 h-1 bg-gray-200 mx-4">
                    <div
                      className={`h-full ${
                        step.number < currentStep ? "bg-green-600" : "bg-gray-200"
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Booking Steps */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <CarSelection
              selectedCar={selectedCar}
              onCarSelect={setSelectedCar}
              onNext={() => setCurrentStep(2)}
            />
          )}
          {currentStep === 2 && (
            <AppointmentBooking
              selectedCar={selectedCar}
              onAppointmentSelect={(data) => {
                setAppointmentData(data);
                setCurrentStep(3);
              }}
              onBack={() => setCurrentStep(1)}
            />
          )}
          {currentStep === 3 && (
            <ServiceForm
              selectedCar={selectedCar}
              appointmentData={appointmentData}
              onBack={() => setCurrentStep(2)}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ŠKODA Service Center</h3>
              <p className="text-gray-300 mb-4">
                Authorized ŠKODA service center in Bangalore with certified technicians and genuine parts.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Service Hours</h3>
              <div className="text-gray-300 space-y-2">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <div className="text-gray-300 space-y-2">
                <p>📍 Electronic City, Bangalore - 560100</p>
                <p>📞 +91 80-4567-8900</p>
                <p>✉️ service@skoda.in</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ŠKODA Auto India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
