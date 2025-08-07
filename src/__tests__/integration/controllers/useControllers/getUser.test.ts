import { getUser } from '../../../../controllers/userController';
import { getUserById } from '../../../../services/userService';

jest.mock('../../../../services/userService');

describe('Тесты getUser', () => {
  const mockUser = {
    id: '123',
    email: 'test@example.com',
    firstName: 'John',
    secondName: 'Doe',
    roleId: 2,
  };

  const req = {
    params: { id: '123' },
  } as any;

  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('успешное получение пользователя', async () => {
    (getUserById as jest.Mock).mockResolvedValue(mockUser); // возвращаемый результат

    await getUser(req, res);

    expect(getUserById).toHaveBeenCalledWith('123');
    expect(res.json).toHaveBeenCalledWith({
      id: mockUser.id,
      email: mockUser.email,
      firstName: mockUser.firstName,
      secondName: mockUser.secondName,
      roleId: mockUser.roleId,
    });
    expect(res.status).not.toHaveBeenCalled();
  });

  test('пользователь не найден (404)', async () => {
    (getUserById as jest.Mock).mockResolvedValue(null); // возвращаемый результат

    await getUser(req, res);

    expect(getUserById).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Пользователь не найден' });
  });

  test('ошибка сервера (500)', async () => {
    (getUserById as jest.Mock).mockRejectedValue(new Error('Ошибка'));

    await getUser(req, res);

    expect(getUserById).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Внутренняя ошибка сервера' });
  });
});