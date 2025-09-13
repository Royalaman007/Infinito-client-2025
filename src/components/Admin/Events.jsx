"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import RegistrationDetailsModal from "./RegistrationDetailsModal"
import EventRegistrationsFallback from "./EventRegistrationsFallback"
import axiosInstance from "../../utils/axios.js"

const sportsList = [
  "Mr. Infinto", "CODM", "BGMI", "Valorant", "Free Fire",
  "Athletic", "Badminton", "Basketball", "Cricket", "Football",
  "Kabaddi", "Lawn Tennis", "Squash", "Table Tennis", "Volleyball",
  "Weight Lifting", "Power Lifting", "Chess",
]

// Event type mapping for API endpoints
const eventTypeMapping = {
  "Mr. Infinto": "mr-infinto",
  "CODM": "codm",
  "BGMI": "bgmi", 
  "Valorant": "valorant",
  "Free Fire": "free-fire",
  "Athletic": "athletics",
  "Badminton": "badminton",
  "Basketball": "basketball",
  "Cricket": "cricket",
  "Football": "football",
  "Kabaddi": "kabbadi",
  "Lawn Tennis": "lawn-tennis",
  "Squash": "squash",
  "Table Tennis": "table-tennis",
  "Volleyball": "volleyball",
  "Weight Lifting": "weight-lifting",
  "Power Lifting": "power-lifting",
  "Chess": "chess",
}
  
export function Events() {
  const [selectedSport, setSelectedSport] = useState("Cricket")
  const [applications, setApplications] = useState({})
  const [modalData, setModalData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch applications for selected sport
  const fetchApplications = async (sport) => {
    try {
      setLoading(true)
      setError(null)
      const eventType = eventTypeMapping[sport]
      if (!eventType) {
        setError("Event type not found")
        return
      }
      
      const response = await axiosInstance.get(`/events/${eventType}/registrations`)
      setApplications(prev => ({
        ...prev,
        [sport]: response.data.registrations || []
      }))
    } catch (err) {
      console.error("Error fetching applications:", err)
      setError(err.response?.data?.message || "Failed to fetch applications")
      // Set empty array for this sport
      setApplications(prev => ({
        ...prev,
        [sport]: []
      }))
    } finally {
      setLoading(false)
    }
  }

  // Fetch applications when sport changes
  useEffect(() => {
    if (selectedSport && !applications[selectedSport]) {
      fetchApplications(selectedSport)
    }
  }, [selectedSport])

  // Handle sport selection
  const handleSportSelect = (sport) => {
    setSelectedSport(sport)
    if (!applications[sport]) {
      fetchApplications(sport)
    }
  }

  // Show fallback component if there's an error or no data for the selected sport
  if (error || (!applications[selectedSport] || applications[selectedSport].length === 0)) {
    return (
      <EventRegistrationsFallback 
        eventType={selectedSport} 
        onSportChange={handleSportSelect}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Sexy Sport Selector Buttons */}
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

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">⚠️ {error}</p>
          <p className="text-gray-600 text-xs mt-2">
            Showing improved UI with sample data. The new modal will display registration details in a much more readable format.
          </p>
        </div>
      )}

      {/* Applications Table */}
      <Card className="shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl text-indigo-700 font-bold">
            🏆 {selectedSport} Registrations
          </CardTitle>
          <p className="text-sm text-gray-600">
            {loading ? "Loading registrations..." : `List of registered participants`}
          </p>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading registrations...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications[selectedSport] && applications[selectedSport].length > 0 ? (
                  applications[selectedSport].map((app, index) => (
                    <TableRow key={app._id || index} className="hover:bg-indigo-50">
                      <TableCell className="font-mono font-medium text-xs">
                        {app._id ? app._id.slice(0, 8) + "..." : `#${index + 1}`}
                      </TableCell>
                      <TableCell className="font-medium">
                        {app.fullname || app.captain?.fullname || app.coach?.fullname || "—"}
                      </TableCell>
                      <TableCell>{app.email || app.captain?.email || app.coach?.email || "—"}</TableCell>
                      <TableCell>{app.collegeName || "—"}</TableCell>
                      <TableCell>
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "—"}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-lg border-indigo-500 text-indigo-600 hover:bg-indigo-100"
                          onClick={() => setModalData(app)}
                        >
                          📄 View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="6" className="text-center text-gray-500 py-6">
                      {error ? "Failed to load registrations" : `No registrations found for ${selectedSport}.`}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Registration Details Modal */}
      <RegistrationDetailsModal 
        isOpen={!!modalData} 
        onClose={() => setModalData(null)} 
        data={modalData}
        eventType={selectedSport}
      />
    </div>
  )
}
