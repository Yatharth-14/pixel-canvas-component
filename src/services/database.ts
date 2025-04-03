
// This is a simple in-memory database simulation
// In a real application, this would be replaced with actual database calls

// User type definition
export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In real DB, this would be hashed
}

// In-memory database
class Database {
  private users: User[] = [];

  constructor() {
    // Load initial data from localStorage for development persistence
    try {
      const storedUsers = localStorage.getItem('db_users');
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      }
    } catch (error) {
      console.error('Error loading users from localStorage:', error);
    }
  }

  // Save changes to localStorage for persistence during development
  private saveChanges(): void {
    try {
      localStorage.setItem('db_users', JSON.stringify(this.users));
    } catch (error) {
      console.error('Error saving users to localStorage:', error);
    }
  }

  // Find user by email
  async findUserByEmail(email: string): Promise<User | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.users.find(user => user.email === email) || null;
  }

  // Create new user
  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    const existingUser = await this.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser = {
      ...userData,
      id: Date.now().toString(),
    };

    this.users.push(newUser);
    this.saveChanges();
    return newUser;
  }

  // Authenticate user
  async authenticateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = await this.findUserByEmail(email);
    if (!user || user.password !== password) {
      return null;
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

// Export singleton instance
export const db = new Database();
