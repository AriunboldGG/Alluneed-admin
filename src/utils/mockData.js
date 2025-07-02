// Mock user data for development
export const mockUsers = [
  {
    id: 1,
    email: 'admin@alluneed.com',
    password: 'admin123',
    username: 'admin',
    firstname: 'Admin',
    lastname: 'User',
    role: 'admin',
    phoneNumber: '+976 99999999',
    position: 'System Administrator',
    avatar: null,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    email: 'superadmin@alluneed.com',
    password: 'super123',
    username: 'superadmin',
    firstname: 'Super',
    lastname: 'Admin',
    role: 'superadmin',
    phoneNumber: '+976 88888888',
    position: 'Super Administrator',
    avatar: null,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 3,
    email: 'reporter@alluneed.com',
    password: 'reporter123',
    username: 'reporter',
    firstname: 'Reporter',
    lastname: 'User',
    role: 'reporter',
    phoneNumber: '+976 77777777',
    position: 'Reporter',
    avatar: null,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 4,
    email: 'demo@alluneed.com',
    password: 'demo123',
    username: 'demo',
    firstname: 'Demo',
    lastname: 'User',
    role: 'admin',
    phoneNumber: '+976 66666666',
    position: 'Demo User',
    avatar: null,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
];

// Mock authentication functions
export const mockAuth = {
  // Simulate login
  login: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Create a mock JWT token
      const token = btoa(JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
        exp: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
      }));
      
      return {
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          phoneNumber: user.phoneNumber,
          position: user.position,
          avatar: user.avatar,
        },
        message: 'Login successful'
      };
    } else {
      throw new Error('Invalid email or password');
    }
  },

  // Simulate user info fetch
  getUserInfo: async (token) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const decoded = JSON.parse(atob(token));
      const user = mockUsers.find(u => u.id === decoded.id);
      
      if (user && decoded.exp > Date.now()) {
        return {
          success: true,
          data: {
            id: user.id,
            email: user.email,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
            phoneNumber: user.phoneNumber,
            position: user.position,
            avatar: user.avatar,
          }
        };
      } else {
        throw new Error('Token expired or invalid');
      }
    } catch (error) {
      throw new Error('Invalid token');
    }
  },

  // Simulate password reset
  forgotPassword: async (email) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email);
    
    if (user) {
      return {
        success: true,
        message: 'Password reset email sent successfully'
      };
    } else {
      throw new Error('Email not found');
    }
  }
};

// Mock data for different sections
export const mockUserData = {
  users: mockUsers.map(user => ({
    id: user.id,
    name: `${user.firstname} ${user.lastname}`,
    email: user.email,
    roleId: user.role,
    phoneNumber: user.phoneNumber,
    position: user.position,
    isActive: user.isActive,
    createdAt: user.createdAt,
  })),
  
  roles: [
    { id: 'admin', name: 'Admin' },
    { id: 'superadmin', name: 'Super Admin' },
    { id: 'reporter', name: 'Reporter' },
  ],
  
  campaigns: [
    {
      id: 1,
      name: 'Summer Campaign 2024',
      description: 'Summer marketing campaign',
      status: 'active',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      budget: 50000,
      createdBy: 'admin@alluneed.com',
    },
    {
      id: 2,
      name: 'Winter Promotion',
      description: 'Winter season promotion',
      status: 'pending',
      startDate: '2024-12-01',
      endDate: '2025-02-28',
      budget: 30000,
      createdBy: 'admin@alluneed.com',
    },
  ],
  
  agencies: [
    {
      id: 1,
      name: 'Digital Marketing Agency',
      email: 'contact@digitalagency.com',
      phone: '+976 11111111',
      address: 'Ulaanbaatar, Mongolia',
      status: 'active',
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 2,
      name: 'Creative Solutions',
      email: 'info@creativesolutions.com',
      phone: '+976 22222222',
      address: 'Ulaanbaatar, Mongolia',
      status: 'active',
      createdAt: '2024-01-01T00:00:00Z',
    },
  ],
  
  references: [
    {
      id: 1,
      name: 'Campaign Types',
      value: 'social_media',
      description: 'Social media marketing campaigns',
      category: 'campaign',
    },
    {
      id: 2,
      name: 'User Status',
      value: 'active',
      description: 'Active user status',
      category: 'user',
    },
  ],
}; 