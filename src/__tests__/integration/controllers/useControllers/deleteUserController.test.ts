import { deleteUserController } from '../../../../controllers/userController';
import { deleteUser } from '../../../../services/userService';

jest.mock('../../../../services/userService');

describe('Тесты deleteUserController', () => {
  const req = {
    params: { id: '123' },
  } as any;

  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('успешное удаление пользователя (204)', async () => {
    (deleteUser as jest.Mock).mockResolvedValue(undefined);

    await deleteUserController(req, res);

    expect(deleteUser).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test('ошибка при удалении (500)', async () => {
    (deleteUser as jest.Mock).mockRejectedValue(new Error('Ошибка'));

    await deleteUserController(req, res);

    expect(deleteUser).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Ошибка при удалении пользователя' });
  });
});