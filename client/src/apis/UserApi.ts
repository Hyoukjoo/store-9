import UserReqeust from '@shared/dtos/user/request';
import UserResponse from '@shared/dtos/user/response';
import BaseApi from './BaseApi';

class UserApi extends BaseApi {
  getMyInfo() {
    return this.get<UserResponse.GetMyInfo>('/', { isRequiredLogin: true });
  }

  getLikes() {
    return this.get<UserResponse.GetLikes>('/likes', { isRequiredLogin: true });
  }

  like({ productId }: UserReqeust.Like) {
    return this.post(`/likes/${productId}`, {}, { isRequiredLogin: true });
  }

  unlike({ productId }: UserReqeust.Like) {
    return this.delete(`/likes/${productId}`, { isRequiredLogin: true });
  }

  getAddress() {
    return this.get<UserResponse.GetAddress>('/address', { isRequiredLogin: true });
  }

  createAddress(body: UserReqeust.CreateAddress) {
    return this.post<UserResponse.CreateAddress>('/address', body, { isRequiredLogin: true });
  }

  updateAddress(body: UserReqeust.UpdateAddress) {
    return this.put<UserResponse.UpdateAddress>('/address', body, { isRequiredLogin: true });
  }

  removeAddress({ addressId }: UserReqeust.RemoveAddress) {
    return this.delete(`/address/${addressId}`, { isRequiredLogin: true });
  }
}

export default new UserApi('users');