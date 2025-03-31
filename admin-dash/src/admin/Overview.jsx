function Overview() {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Overview</h2>
          <button>
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
        
        <div className="flex justify-center items-center h-64">
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset="70"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="#10b981"
                strokeWidth="10"
                strokeDasharray="220"
                strokeDashoffset="88"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="25"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="25"
                fill="none"
                stroke="#f97316"
                strokeWidth="10"
                strokeDasharray="157"
                strokeDashoffset="47"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold">249</span>
              <span className="text-sm text-gray-500">Total</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Overview;