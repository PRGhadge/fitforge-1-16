import { getClients, getClientById, getTrainerDetailsByTrainerId, signup, login, updateClientById } from '../Controllers/clientsController';
import { getConnection } from '../databaseConn';
import bcrypt from 'bcrypt';

jest.mock('../databaseConn');
jest.mock('bcrypt');

describe('clientsController', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getClients', () => {
    const mockResults = [
      { client_id: 1, fname: 'John', lname: 'Doe', email: 'john.doe@example.com' },
      { client_id: 2, fname: 'Jane', lname: 'Smith', email: 'jane.smith@example.com' },
    ];

    it('should return an array of clients', async () => {
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      getConnection.mockResolvedValueOnce({
        query: jest.fn().mockImplementation((query, callback) => {
          callback(null, mockResults, null);
        }),
      });

      await getClients(req, res);
      expect(res.json).toHaveBeenCalledWith(mockResults);
    });

    it('should return 500 if there is an error querying the database', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };

      const mockError = new Error('Database connection error');

      getConnection.mockResolvedValueOnce({
        query: jest.fn().mockImplementation((_, callback) => {
          callback(mockError, null, null);
        }),
      });

      await getClients(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error retrieving data from the database');
    });

    it('should return 404 if no clients are found', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };

      getConnection.mockResolvedValueOnce({
        query: jest.fn().mockImplementation((_, callback) => {
          callback(null, [], null);
        }),
      });

      await getClients(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('No clients found');
    });
  });

  describe('getClientById', () => {
    const mockResults = [
      {
        client_id: 2,
        fname: 'Jane',
        lname: 'Doe',
        email: 'jane.doe@example.com',
        phone: 2147483647,
        dob: '1985-12-25T08:00:00.000Z',
        gender: 'female',
        height: 162,
        weight: 55,
        role: 'client',
        is_assigned_trainer: 0,
        password: 'password456',
        medical_history: 'Allergic to peanuts',
        emergency_contact: 1234567890,
        emergency_contact_name: 'John Doe',
        created_at: '2024-04-24T00:31:32.000Z',
        updated_at: '2024-04-24T00:31:32.000Z',
        trainer_id: 3,
      },
    ];

    it('should return the client data for a valid client ID', async () => {
      const req = { params: { id: '2' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      getConnection.mockResolvedValueOnce({
        query: jest.fn().mockImplementation((_, __, callback) => {
          callback(null, mockResults, null);
        }),
      });

      await getClientById(req, res);
      expect(res.json).toHaveBeenCalledWith(mockResults[0]);
    });

    it('should return 500 if there is an error querying the database', async () => {
      const req = { params: { id: '2' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };

    

      const mockError = new Error('Database connection error');

      getConnection.mockResolvedValueOnce({
        query: jest.fn().mockImplementation((_, __, callback) => {
          callback(mockError, null, null);
        }),
      });

      await getClientById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error retrieving client data');
    });
  });

  describe('clientController', () => {
    describe('getTrainerDetailsByTrainerId', () => {
      const mockResults = [
        {
          client_id: 1,
          fname: 'John',
          lname: 'Doe',
          email: 'john.doe@example.com',
          phone: 1234567890,
          dob: '1990-05-15T07:00:00.000Z',
          gender: 'male',
          height: 176,
          weight: 70,
          role: 'client',
          is_assigned_trainer: 0,
          password: 'password123',
          medical_history: 'No known medical history',
          emergency_contact: 2147483647,
          emergency_contact_name: 'Jane Smith',
          created_at: '2024-04-24T00:31:32.000Z',
          updated_at: '2024-04-24T00:31:32.000Z',
        },
      ];
  
      afterEach(() => {
        jest.resetAllMocks();
      });
  
      it('should return the trainer details for a valid trainer ID', async () => {
        const req = { params: { id: '1' } };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
  
        getConnection.mockResolvedValueOnce({
          query: jest.fn().mockImplementation((_, __, callback) => {
            callback(null, mockResults, null);
          }),
        });
  
        await getTrainerDetailsByTrainerId(req, res);
        expect(res.json).toHaveBeenCalledWith(mockResults[0]);
      });
  
        it('should return 500 if there is an error querying the database', async () => {
          const req = {};
          const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
          };
    
          const mockError = new Error('Database connection error');
    
          getConnection.mockResolvedValueOnce({
            query: jest.fn().mockImplementation((_, callback) => {
              callback(mockError, null, null);
            }),
          });
    
          await getClients(req, res);
    
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith('Error retrieving data from the database');
        });
      });    });


    describe('clientsController', () => {
      describe('login', () => {
        const mockUser = {
          email: 'john.doe@example.com',
          password: '$2b$10$k5vQAVTSJnYjyJSZ6mUG4.Bh1RDaXizO3DuDPHdXaZNHPRQqnlWlK', // Hashed password for 'password123'
        };
    
        afterEach(() => {
          jest.resetAllMocks();
        });
    
        it('should return 400 if email or password is missing', async () => {
          const req = { body: { email: 'john.doe@example.com' } };
          const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
          await login(req, res);
    
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({ error: 'Email and password are required' });
        });
    
        it('should return 401 if no user is found with the provided email', async () => {
          const req = {
            body: { email: 'nonexistent@example.com', password: 'password123' }
          };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
          };
        
          getConnection.mockResolvedValueOnce({
            query: jest.fn().mockImplementation((query, values, callback) => {
              callback(null, []); // Simulate no user found
            })
          });
        
          await login(req, res);
          expect(res.status).toHaveBeenCalledWith(401);
          expect(res.json).toHaveBeenCalledWith({ error: 'No user found with this email' });
        });
        
    
        // it('should return 401 if password is incorrect', async () => {
        //   const req = { body: { email: 'john.doe@example.com', password: 'wrongpassword' } };
        //   const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
        //   getConnection.mockResolvedValueOnce({
        //     query: jest.fn().mockImplementation((query, values, callback) => {
        //       callback(null, [mockUser]);
        //     }),
        //   });
        //   bcrypt.compare.mockResolvedValueOnce(false);
    
        //   await login(req, res);
    
        //   expect(res.status).toHaveBeenCalledWith(401);
        //   expect(res.json).toHaveBeenCalledWith({ error: 'Password is incorrect' });
        // });
    
        // it('should return 200 if user is found and password is correct', async () => {
        //   const req = { body: { email: 'john.doe@example.com', password: 'password123' } };
        //   const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
        //   getConnection.mockResolvedValueOnce({
        //     query: jest.fn().mockImplementation((query, values, callback) => {
        //       callback(null, [mockUser]);
        //     }),
        //   });
        //   bcrypt.compare.mockResolvedValueOnce(true);
    
        //   await login(req, res);
    
        //   expect(res.status).toHaveBeenCalledWith(200);
        //   expect(res.json).toHaveBeenCalledWith({ message: 'User found and password is correct' });
        // });
    
        it('should return 500 if there is an error querying the database', async () => {
          const req = { body: { email: 'john.doe@example.com', password: 'password123' } };
          const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
          const mockError = new Error('Database connection error');
    
          getConnection.mockResolvedValueOnce({
            query: jest.fn().mockImplementation((query, values, callback) => {
              callback(mockError, null);
            }),
          });
    
          await login(req, res);
    
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        });
      });
    });



    describe('signup', () => {
      afterEach(() => {
        jest.resetAllMocks();
      });
    
      it('should return 400 if required fields are missing', async () => {
        const req = { body: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
        await signup(req, res);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'All fields are required' });
      });
    
      // it('should create a new user and return 201', async () => {
      //   const req = { body: { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123' } };
      //   const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      
      //   const mockConnection = {
      //     query: jest.fn().mockImplementation((query, values, callback) => {
      //       callback(null, { insertId: 1 });
      //     }),
      //   };
      
      //   getConnection.mockResolvedValueOnce(mockConnection);
      //   bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
      
      //   await signup(req, res);
      
      //   expect(res.status).toHaveBeenCalledWith(expectedStatusAndResponse.successfulSignupStatus);
      //   expect(res.json).toHaveBeenCalledWith(expectedStatusAndResponse.successfulSignupResponse);
      //   expect(bcrypt.hash).toHaveBeenCalledWith(...expectedStatusAndResponse.expectedBcryptHashCall);
      //   expect(mockConnection.query).toHaveBeenCalledWith(...expectedStatusAndResponse.expectedQueryCall);
      // });
      
    
      it('should return 500 if there is an error inserting the user', async () => {
        const req = { body: { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const mockError = new Error('Database connection error');
    
        getConnection.mockResolvedValueOnce({
          query: jest.fn().mockImplementation((query, values, callback) => {
            callback(mockError);
          }),
        });
    
        await signup(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error inserting user into the database' });
      });
    });

    describe('clientController', () => {
      describe('updateClientById', () => {
        afterEach(() => {
          jest.resetAllMocks();
        });
    
        it('should update the client data for a valid client ID', async () => {
          const req = {
            params: { clientId: '1' },
            body: {
              fname: 'John',
              lname: 'Doe',
              height: 175,
              dob: '1990-05-15',
              weight: 70,
            },
          };
          const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
          };
    
          const mockResult = { affectedRows: 1 };
    
          getConnection.mockResolvedValueOnce({
            query: jest.fn().mockImplementation((_, __, callback) => {
              callback(null, mockResult, null);
            }),
          });
    
          await updateClientById(req, res);
    
          expect(res.json).toHaveBeenCalledWith({ message: 'Client data updated successfully' });
        });
    
        it('should return 404 if the client is not found', async () => {
          const req = {
            params: { clientId: '1' },
            body: {
              fname: 'John',
              lname: 'Doe',
              height: 175,
              dob: '1990-05-15',
              weight: 70,
            },
          };
          const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
          };
    
          const mockResult = { affectedRows: 0 };
    
          getConnection.mockResolvedValueOnce({
            query: jest.fn().mockImplementation((_, __, callback) => {
              callback(null, mockResult, null);
            }),
          });
    
          await updateClientById(req, res);
    
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.send).toHaveBeenCalledWith('Client not found');
        });
    
        it('should return 500 if there is an error querying the database', async () => {
          const req = {
            params: { clientId: '1' },
            body: {
              fname: 'John',
              lname: 'Doe',
              height: 175,
              dob: '1990-05-15',
              weight: 70,
            },
          };
          const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
          };
    
          const mockError = new Error('Database connection error');
    
          getConnection.mockResolvedValueOnce({
            query: jest.fn().mockImplementation((_, __, callback) => {
              callback(mockError, null, null);
            }),
          });
    
          await updateClientById(req, res);
    
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith('Error updating client data');
      });
      });
    });
  })