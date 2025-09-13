import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import RegistrationDetailsModal from "./RegistrationDetailsModal";

const sportsList = [
  "Mr. Infinto", "CODM", "BGMI", "Valorant", "Free Fire",
  "Athletic", "Badminton", "Basketball", "Cricket", "Football",
  "Kabaddi", "Lawn Tennis", "Squash", "Table Tennis", "Volleyball",
  "Weight Lifting", "Power Lifting", "Chess",
];

// No sample data - show empty state
const getSampleRegistrations = (sport) => {
  return []; // Empty array = no fake players
};

const EventRegistrationsFallback = ({ eventType = "Football", onSportChange }) => {
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [selectedSport, setSelectedSport] = useState(eventType);

  const handleSportSelect = (sport) => {
    setSelectedSport(sport);
    if (onSportChange) {
      onSportChange(sport);
    }
  };

  const sampleRegistrations = getSampleRegistrations(selectedSport);

  return (
    <div className="space-y-6">
      {/* Sport Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {sportsList.map((sport) => (
          <button
            key={sport}
            onClick={() => handleSportSelect(sport)}
            className={`px-4 py-2 rounded-2xl text-sm font-semibold shadow-md transition-all duration-200 
              ${selectedSport === sport 
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white scale-105" 
                : "bg-gray-100 hover:bg-indigo-100 text-gray-700"
              }`}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold">🏆 {selectedSport} Registrations</h2>
      
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700">0</div>
            <div className="text-sm font-medium text-green-600">Total Registrations</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">0</div>
            <div className="text-sm font-medium text-blue-600">Active Registrations</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-700">0</div>
            <div className="text-sm font-medium text-purple-600">Total Participants</div>
          </CardContent>
        </Card>
      </div>

      {/* Registrations Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Registration Details</CardTitle>
          <p className="text-sm text-gray-600">Click on any registration to view full details</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Registration ID</TableHead>
                <TableHead>Captain Name</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Team Size</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan="7" className="text-center py-12">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="text-6xl">📝</div>
                    <h3 className="text-lg font-semibold text-gray-700">No Registrations Yet</h3>
                    <p className="text-gray-500 text-sm max-w-md">
                      No one has registered for {selectedSport} yet. When people register, 
                      their details will appear here with the improved modal interface.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                      <p className="text-blue-700 text-sm">
                        ✨ <strong>Be ready with a smile!</strong> ~Team webdev !!
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Registration Details Modal */}
      <RegistrationDetailsModal
        isOpen={!!selectedRegistration}
        onClose={() => setSelectedRegistration(null)}
        data={selectedRegistration}
        eventType={selectedSport}
      />
    </div>
  );
};

export default EventRegistrationsFallback;
