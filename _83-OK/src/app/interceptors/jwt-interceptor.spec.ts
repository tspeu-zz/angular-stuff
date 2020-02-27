import { JwtInterceptor } from './jwt-interceptor.service';

describe('AuthInterceptor', () => {
  it('should create an instance', () => {
    expect(new JwtInterceptor()).toBeTruthy();
  });
});
