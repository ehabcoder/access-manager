import mockTokens from '../mockData.js';



const getTokens = (req, res) => {
  const { service, status } = req.query;
  console.log("mocking", mockTokens)
  let filteredTokens = [...mockTokens];
  
  // Filter by service name
  if (service) {
    filteredTokens = filteredTokens.filter(token => 
      token.serviceName.toLowerCase().includes(service.toLowerCase())
    );
  }
  
  // Filter by status
  if (status) {
    filteredTokens = filteredTokens.filter(token => 
      token.status.toLowerCase() === status.toLowerCase()
    );
  }
  
  res.json({
    success: true,
    count: filteredTokens.length,
    data: filteredTokens
  });
}

// (dummy/stub endpoint as we don't have real service integration)
const renewToken = (req, res) => {
  const tokenId = parseInt(req.params.id);
  const token = mockTokens.find(t => t.id === tokenId);
  
  if (!token) {
    return res.status(404).json({
      success: false,
      message: 'Token not found'
    });
  }
  
  // stub response - in real implementation, this would call the service API
  res.json({
    success: true,
    message: `Token for ${token.serviceName} has been renewed`,
    data: {
      ...token,
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +1 year
      status: 'Active'
    }
  });
}

export { getTokens, renewToken };