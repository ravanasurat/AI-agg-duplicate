function DashboardStats() {
    const stats = [
      { title: 'Total Revenue', value: '$3,564', change: '+12.5%', color: 'blue' },
      { title: 'Subscriptions', value: '564', change: '+5.0%', color: 'orange' },
      { title: 'AI Agents', value: '249', change: '+8.7%', color: 'green' },
      { title: 'New Users', value: '127', change: '+15.3%', color: 'purple' }
    ];
  
    const renderChart = (color) => {
      const chartColors = {
        blue: '#38BDF8',
        orange: '#FB923C',
        green: '#4ADE80',
        purple: '#A78BFA'
      };
  
      return (
        <svg viewBox="0 0 100 30" className="h-12">
          <path
            d="M0 30 L10 20 L20 25 L30 15 L40 20 L50 10 L60 15 L70 5 L80 15 L90 0 L100 10"
            fill="none"
            stroke={chartColors[color]}
            strokeWidth="2"
          />
        </svg>
      );
    };
  
    return (
    //   <div>
    //     <div className="bg-gradient-to-r from-blue-500 to-red-400 text-white rounded-lg mb-6 p-4 relative overflow-hidden">
    //       <div className="flex flex-col space-y-2 z-10 relative">
    //         <h3 className="font-medium text-xl">Upgrade your Dashcode</h3>
    //         <p className="text-white/80">Pro plan for better results</p>
    //       </div>
    //       <button className="mt-4 bg-white text-cyan-600 px-6 py-2 rounded-full font-medium z-10 relative">
    //         now
    //       </button>
    //       <div className="absolute right-0 bottom-0 h-32 w-32 bg-white/20 rounded-full -mr-10 -mb-10"></div>
    //     </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 font-medium">{stat.title}</h3>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-green-500 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                    {stat.change}
                  </p>
                </div>
                <div>{renderChart(stat.color)}</div>
              </div>
            </div>
          ))}
        </div>
    //   </div>
    );
  }
  
  export default DashboardStats;