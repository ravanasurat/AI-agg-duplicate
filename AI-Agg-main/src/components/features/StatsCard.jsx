import React from "react";
import { FileText, Users } from "lucide-react"; 

const StatsCard = ({ icon: Icon, value, label }) => (
  <div className="flex items-center gap-2">
    <div
      className={`p-2 rounded-full ${
        Icon === FileText
          ? "bg-orange-200"
          : Icon === Users
          ? "bg-purple-200"
          : "bg-blue-200"
      }`}
    >
      <Icon
        className={`w-5 h-5 ${
          Icon === FileText
            ? "text-orange-500"
            : Icon === Users
            ? "text-red-700"
            : "text-red-500"
        }`}
      />
    </div>
    <div>
      <div className="font-bold text-xl">{value}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </div>
  </div>
);

export default StatsCard;
