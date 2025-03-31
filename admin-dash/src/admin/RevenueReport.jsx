function RevenueReport() {
    const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    
    const data = {
      netProfit: [45, 55, 57, 56, 61, 58, 63, 60, 66],
      revenue: [75, 85, 100, 98, 85, 105, 90, 115, 95],
      cashFlow: [35, 40, 35, 25, 45, 48, 52, 53, 41]
    };
  
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Revenue Report</h2>
          <div className="flex space-x-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
              <span className="text-xs text-gray-600">Net Profit</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-cyan-400 rounded-sm mr-2"></div>
              <span className="text-xs text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-400 rounded-sm mr-2"></div>
              <span className="text-xs text-gray-600">Free Cash Flow</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 relative">
          <div className="absolute inset-0 flex items-end">
            {months.map((month, index) => (
              <div key={month} className="flex-1 flex justify-center">
                <div className="w-10 flex flex-col items-center">
                  <div className="flex h-52 items-end space-x-1">
                    <div
                      className="w-2 bg-blue-500 rounded-t"
                      style={{ height: `${data.netProfit[index] * 2}px` }}
                    ></div>
                    <div
                      className="w-2 bg-cyan-400 rounded-t"
                      style={{ height: `${data.revenue[index] * 2}px` }}
                    ></div>
                    <div
                      className="w-2 bg-orange-400 rounded-t"
                      style={{ height: `${data.cashFlow[index] * 2}px` }}
                    ></div>
                  </div>
                  <span className="text-xs mt-2 text-gray-600">{month}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default RevenueReport;