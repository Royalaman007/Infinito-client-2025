import React from 'react';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaGraduationCap, FaUsers, FaTrophy, FaCalendar } from 'react-icons/fa';

const RegistrationDetailsModal = ({ isOpen, onClose, data, eventType }) => {
  if (!isOpen || !data) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const renderUserInfo = (user, title = "User Information") => (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <FaUser className="text-blue-600" />
        {title}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <FaUser className="text-gray-500 w-4" />
          <span className="font-medium">Name:</span>
          <span>{user.fullname || user.name || "—"}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-gray-500 w-4" />
          <span className="font-medium">Email:</span>
          <span>{user.email || "—"}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaPhone className="text-gray-500 w-4" />
          <span className="font-medium">Phone:</span>
          <span>{user.phoneNumber || user.phone || "—"}</span>
        </div>
        {user.aadharId && (
          <div className="flex items-center gap-2">
            <FaIdCard className="text-gray-500 w-4" />
            <span className="font-medium">Aadhar ID:</span>
            <span>{user.aadharId}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderTeamInfo = (team) => (
    <div className="bg-blue-50 rounded-lg p-4 mb-4">
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <FaUsers className="text-blue-600" />
        Team Information
      </h4>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <FaTrophy className="text-gray-500 w-4" />
          <span className="font-medium">Team Name:</span>
          <span>{team.teamName || "—"}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaUsers className="text-gray-500 w-4" />
          <span className="font-medium">Team Size:</span>
          <span>{team.teamSize || team.members?.length || "—"}</span>
        </div>
        {team.members && team.members.length > 0 && (
          <div className="mt-3">
            <span className="font-medium text-gray-700">Team Members:</span>
            <div className="mt-2 space-y-1">
              {team.members.map((member, index) => (
                <div key={index} className="bg-white rounded p-2 text-xs">
                  <div className="flex justify-between">
                    <span className="font-medium">{member.fullname || member.name}</span>
                    <span className="text-blue-600">{member.role}</span>
                  </div>
                  <div className="text-gray-500">{member.email}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCollegeInfo = () => (
    <div className="bg-green-50 rounded-lg p-4 mb-4">
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <FaGraduationCap className="text-green-600" />
        College Information
      </h4>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <FaGraduationCap className="text-gray-500 w-4" />
          <span className="font-medium">College:</span>
          <span>{data.collegeName || "—"}</span>
        </div>
        {data.collegeAddress && (
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-gray-500 w-4 mt-0.5" />
            <span className="font-medium">Address:</span>
            <span className="text-gray-600">{data.collegeAddress}</span>
          </div>
        )}
        {data.collegeId && (
          <div className="flex items-center gap-2">
            <FaIdCard className="text-gray-500 w-4" />
            <span className="font-medium">College ID:</span>
            <span>{data.collegeId}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderEventSpecificInfo = () => {
    const eventInfo = { ...data };
    // Remove common fields to show only event-specific data //
  //   _id: "123",
  // fullname: "John Doe",
  // email: "john@example.com",
  // collegeName: "IIT Patna",
  // category: "Men's Singles",        // ← This stays
  // skillLevel: "Advanced",           // ← This stays  
  // position: "Forward"               // ← This stays
  
    delete eventInfo._id;
    delete eventInfo.userId;
    delete eventInfo.collegeName;
    delete eventInfo.collegeAddress;
    delete eventInfo.collegeId;
    delete eventInfo.fullname;
    delete eventInfo.email;
    delete eventInfo.phoneNumber;
    delete eventInfo.phone;
    delete eventInfo.aadharId;
    delete eventInfo.team;
    delete eventInfo.coach;
    delete eventInfo.captain;
    delete eventInfo.viceCaptain;
    delete eventInfo.createdAt;
    delete eventInfo.updatedAt;

    const eventSpecificFields = Object.entries(eventInfo).filter(([key, value]) => 
      value !== null && value !== undefined && value !== "" && 
      !key.startsWith('_') && 
      typeof value !== 'object'
    );

    if (eventSpecificFields.length === 0) return null;

    return (
      <div className="bg-purple-50 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <FaTrophy className="text-purple-600" />
          Event Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {eventSpecificFields.map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="font-medium capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
              </span>
              <span className="text-gray-600">
                {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Registration Details</h2>
              <p className="text-sm text-gray-600 mt-1">
                {eventType ? `${eventType} Registration` : 'Event Registration'} • 
                {data._id && ` ID: ${data._id.slice(0, 8)}...`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Registration Date */}
          {data.createdAt && (
            <div className="bg-yellow-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <FaCalendar className="text-yellow-600" />
                <span className="font-medium">Registration Date:</span>
                <span>{formatDate(data.createdAt)}</span>
              </div>
            </div>
          )}

          {/* User Information */}
          {renderUserInfo(data, "Primary Contact")}

          {/* Coach Information */}
          {data.coach && renderUserInfo(data.coach, "Coach Information")}

          {/* Captain Information */}
          {data.captain && renderUserInfo(data.captain, "Captain Information")}

          {/* Vice Captain Information */}
          {data.viceCaptain && renderUserInfo(data.viceCaptain, "Vice Captain Information")}

          {/* College Information */}
          {renderCollegeInfo()}

          {/* Team Information */}
          {data.team && renderTeamInfo(data.team)}

          {/* Event Specific Information */}
          {renderEventSpecificInfo()}

          {/* User ID Information */}
          {data.userId && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">User Account</h4>
              <div className="text-sm space-y-1">
                <div><span className="font-medium">Username:</span> {data.userId.username}</div>
                <div><span className="font-medium">User ID:</span> {data.userId._id}</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetailsModal;
