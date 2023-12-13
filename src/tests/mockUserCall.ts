export const createUser = async (name: string): Promise<any> => {
  // Simulate the behavior of creating a user
  const newUser = { id: 1, name };
  return newUser;
};

export const deleteUser = async (id: string): Promise<any> => {
  // Simulate the behavior of deleting a user
  const deletedUser = { message: "User with the id: 1 deleted",
    result: "success", };

    if(id === '25') {
        throw new Error('User not found')
    }
    
  return deletedUser;
};

export const getUser = async (id: string): Promise<any> => {
  // Simulate the behavior of fetching a user
  if (id === '1') {
    return { id: '1', name: 'Test User' };
  } else if (id === '25') {
    throw new Error('User not found')
  } else {
    throw new Error('User not found');
  }
};