
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, isWeekend, addDays, isBefore, startOfDay } from "date-fns";

interface AppointmentBookingProps {
  selectedCar: string;
  onAppointmentSelect: (data: any) => void;
  onBack: () => void;
}

export const AppointmentBooking = ({ selectedCar, onAppointmentSelect, onBack }: AppointmentBookingProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");

  // Generate time slots from 9 AM to 6 PM (1-hour intervals)
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM"
  ];

  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date());
    return isBefore(date, today) || isWeekend(date);
  };

  const handleConfirmAppointment = () => {
    if (selectedDate && selectedTime) {
      onAppointmentSelect({
        date: selectedDate,
        time: selectedTime,
        formattedDate: format(selectedDate, "PPP")
      });
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Book Your Appointment</h2>
        <p className="text-gray-600">Select your preferred date and time slot</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <p className="text-sm text-gray-600">Available Monday to Friday only</p>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={isDateDisabled}
              className={cn("w-full pointer-events-auto")}
              fromDate={new Date()}
              toDate={addDays(new Date(), 60)}
            />
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card>
          <CardHeader>
            <CardTitle>Select Time Slot</CardTitle>
            <p className="text-sm text-gray-600">Each service slot is 1 hour duration</p>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={cn(
                      "h-12",
                      selectedTime === time
                        ? "bg-green-600 hover:bg-green-700"
                        : "border-gray-300 hover:border-green-600"
                    )}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Please select a date first to view available time slots
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Selected Information */}
      {selectedDate && selectedTime && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Appointment Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Vehicle:</span>
                <p className="capitalize">{selectedCar.replace('-', ' ')}</p>
              </div>
              <div>
                <span className="font-medium">Date:</span>
                <p>{format(selectedDate, "PPP")}</p>
              </div>
              <div>
                <span className="font-medium">Time:</span>
                <p>{selectedTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="px-8 py-3">
          Back to Car Selection
        </Button>
        <Button
          onClick={handleConfirmAppointment}
          disabled={!selectedDate || !selectedTime}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
        >
          Continue to Service Details
        </Button>
      </div>
    </div>
  );
};
