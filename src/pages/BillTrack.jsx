import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaFileInvoice, 
  FaMoneyBillWave, 
  FaCalendarAlt,
  FaChartBar,
  FaDownload,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// 注册 ChartJS 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const BillTrack = () => {
  // 状态管理
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBill, setEditingBill] = useState(null);
  
  // 表单状态
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    dueDate: '',
    category: 'utility',
    status: 'pending',
    description: ''
  });

  // 模拟数据
  useEffect(() => {
    const mockBills = [
      {
        id: 1,
        title: 'Electricity Bill',
        amount: 120.50,
        dueDate: '2024-01-15',
        paidDate: '2024-01-10',
        category: 'utility',
        status: 'paid',
        description: 'Monthly electricity bill for December'
      },
      {
        id: 2,
        title: 'Internet Bill',
        amount: 89.99,
        dueDate: '2024-01-20',
        paidDate: null,
        category: 'internet',
        status: 'pending',
        description: 'Fiber internet subscription'
      },
      {
        id: 3,
        title: 'Rent',
        amount: 1500.00,
        dueDate: '2024-01-01',
        paidDate: '2024-01-01',
        category: 'housing',
        status: 'paid',
        description: 'Monthly apartment rent'
      },
      {
        id: 4,
        title: 'Credit Card',
        amount: 450.75,
        dueDate: '2024-01-25',
        paidDate: null,
        category: 'credit',
        status: 'pending',
        description: 'Credit card payment'
      },
      {
        id: 5,
        title: 'Water Bill',
        amount: 65.30,
        dueDate: '2024-01-18',
        paidDate: '2024-01-15',
        category: 'utility',
        status: 'paid',
        description: 'Water usage for December'
      },
      {
        id: 6,
        title: 'Netflix Subscription',
        amount: 15.99,
        dueDate: '2024-01-30',
        paidDate: null,
        category: 'entertainment',
        status: 'overdue',
        description: 'Monthly streaming service'
      }
    ];
    setBills(mockBills);
    setFilteredBills(mockBills);
  }, []);

  // 过滤和搜索功能
  useEffect(() => {
    let result = bills;
    
    // 根据状态过滤
    if (filterStatus !== 'all') {
      result = result.filter(bill => bill.status === filterStatus);
    }
    
    // 根据搜索词过滤
    if (searchTerm) {
      result = result.filter(bill =>
        bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredBills(result);
  }, [searchTerm, filterStatus, bills]);

  // 处理表单变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 提交表单
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBill) {
      // 更新账单
      setBills(bills.map(bill => 
        bill.id === editingBill.id 
          ? { ...formData, id: editingBill.id }
          : bill
      ));
    } else {
      // 添加新账单
      const newBill = {
        id: Date.now(),
        ...formData,
        amount: parseFloat(formData.amount)
      };
      setBills([...bills, newBill]);
    }
    
    // 重置表单
    setFormData({
      title: '',
      amount: '',
      dueDate: '',
      category: 'utility',
      status: 'pending',
      description: ''
    });
    setEditingBill(null);
    setShowAddModal(false);
  };

  // 编辑账单
  const handleEdit = (bill) => {
    setFormData(bill);
    setEditingBill(bill);
    setShowAddModal(true);
  };

  // 删除账单
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      setBills(bills.filter(bill => bill.id !== id));
    }
  };

  // 标记为已支付
  const markAsPaid = (id) => {
    setBills(bills.map(bill =>
      bill.id === id
        ? { ...bill, status: 'paid', paidDate: new Date().toISOString().split('T')[0] }
        : bill
    ));
  };

  // 图表数据
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Bills Amount ($)',
        data: [1200, 1900, 1500, 2100, 1800, 2200],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  };

  const categoryData = {
    labels: ['Utility', 'Housing', 'Credit', 'Internet', 'Entertainment'],
    datasets: [
      {
        label: 'Amount by Category ($)',
        data: [650, 1500, 450, 350, 120],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ]
      }
    ]
  };

  // 统计数据
  const totalBills = bills.length;
  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const pendingBills = bills.filter(bill => bill.status === 'pending').length;
  const paidBills = bills.filter(bill => bill.status === 'paid').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题和统计 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">BillTrack</h1>
              <p className="text-blue-200">Manage and track all your bills in one place</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <FaPlus />
              <span>Add New Bill</span>
            </button>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200">Total Bills</p>
                  <p className="text-3xl font-bold">{totalBills}</p>
                </div>
                <FaFileInvoice className="text-3xl opacity-70" />
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200">Total Amount</p>
                  <p className="text-3xl font-bold">${totalAmount.toFixed(2)}</p>
                </div>
                <FaMoneyBillWave className="text-3xl opacity-70" />
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200">Pending</p>
                  <p className="text-3xl font-bold">{pendingBills}</p>
                </div>
                <FaExclamationTriangle className="text-3xl opacity-70" />
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200">Paid</p>
                  <p className="text-3xl font-bold">{paidBills}</p>
                </div>
                <FaCheckCircle className="text-3xl opacity-70" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="container mx-auto px-4 py-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 左侧：图表和搜索 */}
          <div className="lg:col-span-2">
            {/* 搜索和过滤 */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search bills by title, category, or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                  
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                    <FaFilter />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 账单列表 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Recent Bills</h2>
                <span className="text-gray-500">{filteredBills.length} bills</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredBills.map((bill) => (
                      <tr key={bill.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{bill.title}</p>
                            <p className="text-sm text-gray-500">{bill.category}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold">${bill.amount.toFixed(2)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-gray-400" />
                            <span>{new Date(bill.dueDate).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            bill.status === 'paid' 
                              ? 'bg-green-100 text-green-800'
                              : bill.status === 'overdue'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(bill)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(bill.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                            {bill.status !== 'paid' && (
                              <button
                                onClick={() => markAsPaid(bill.id)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded"
                                title="Mark as Paid"
                              >
                                <FaCheckCircle />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 右侧：图表和摘要 */}
          <div className="space-y-8">
            {/* 月度趋势 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Monthly Trend</h3>
                <button className="text-blue-600 hover:text-blue-800">
                  <FaDownload />
                </button>
              </div>
              <div className="h-64">
                <Line 
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* 分类摘要 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-6">Category Breakdown</h3>
              <div className="h-64">
                <Bar 
                  data={categoryData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* 快速摘要 */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Quick Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Next Due Bill:</span>
                  <span className="font-bold">$89.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Monthly:</span>
                  <span className="font-bold">$1,200.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Savings Goal:</span>
                  <span className="font-bold">$5,000.00</span>
                </div>
                <button className="w-full mt-4 bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  View Detailed Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 添加/编辑账单模态框 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingBill ? 'Edit Bill' : 'Add New Bill'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingBill(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bill Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter bill title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount ($) *
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date *
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="utility">Utility</option>
                      <option value="housing">Housing</option>
                      <option value="credit">Credit</option>
                      <option value="internet">Internet</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="insurance">Insurance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Add any notes or details about this bill..."
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingBill(null);
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingBill ? 'Update Bill' : 'Add Bill'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillTrack;