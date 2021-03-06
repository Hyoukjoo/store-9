import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import Input from '@/components/common/Input';
import useAddress from '@/hooks/customHooks/useAddress';
import Button from '@/components/common/Button';
import { baeminFont, greyLine } from '@/static/style/common';
import AuthApi from '@/apis/AuthApi';
import useHistory from '@/hooks/customHooks/useHistory';
import { signupValidation } from '@/utils/validation';

type ValidResult = {
  isValid: boolean;
  errorInput: string;
};

const SignupPage = () => {
  const {
    onAddressSearchClick,
    address: { address, postcode },
  } = useAddress();
  const history = useHistory();
  const signUpFormRef = useRef<HTMLFormElement>(null);
  const [errorInput, setErrorInput] = useState('');

  const getGithubLoginId = () => localStorage.getItem('loginId');
  const isGithubLogin = !!getGithubLoginId();

  const isFormValid = (data): ValidResult => {
    for (const [inputName, inputValue] of data.entries()) {
      if (inputName === 'confirmPassword') {
        if (!signupValidation[inputName](inputValue, data.get('password'))) {
          return { isValid: false, errorInput: inputName };
        }
        continue;
      }
      if (!signupValidation[inputName](inputValue)) {
        return { isValid: false, errorInput: inputName };
      }
    }
    return { isValid: true, errorInput: '' };
  };

  const onSignupFormSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(signUpFormRef.current);
    const validResult = isFormValid(form);

    if (!validResult.isValid) {
      setErrorInput(validResult.errorInput);
      return;
    }
    const data = await AuthApi.signup(form);
    if (data.ok) {
      history.push('/login');
    }
  };

  const getInputErrorObject = (currentInputName): {} | null => {
    if (errorInput === currentInputName) {
      return { [currentInputName]: formErrorMessage[currentInputName] };
    }
    return null;
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem('loginId');
    };
  }, []);

  return (
    <SignupPageContainer>
      {/* <SignUpTitle>?????? ????????? ?????? ??????</SignUpTitle> */}
      <SignupForm onSubmit={onSignupFormSubmit} ref={signUpFormRef} encType="multipart/form-data">
        <SignupList>
          <ListItem>
            <Label htmlFor="id">?????????</Label>
            <InputContainer>
              <Input
                id="id"
                required
                variant="outlined"
                size="large"
                name="id"
                readOnly={isGithubLogin}
                type="text"
                defaultValue={isGithubLogin ? getGithubLoginId() : ''}
                error={getInputErrorObject('id')}
              />
            </InputContainer>
          </ListItem>
          {!isGithubLogin && (
            <>
              <ListItem>
                <Label htmlFor="password">????????????</Label>
                <InputContainer>
                  <Input
                    id="password"
                    variant="outlined"
                    size="medium"
                    name="password"
                    type="password"
                    error={getInputErrorObject('password')}
                  />
                </InputContainer>
              </ListItem>
              <ListItem>
                <Label htmlFor="confirmPassword">???????????? ??????</Label>
                <InputContainer>
                  <Input
                    id="confirmPassword"
                    variant="outlined"
                    size="medium"
                    name="confirmPassword"
                    type="password"
                    error={getInputErrorObject('confirmPassword')}
                  />
                </InputContainer>
              </ListItem>
            </>
          )}
          <ListItem>
            <Label htmlFor="name">??????</Label>
            <InputContainer>
              <Input
                id="name"
                variant="outlined"
                size="large"
                name="name"
                type="text"
                error={getInputErrorObject('name')}
              />
            </InputContainer>
          </ListItem>
          <ListItem>
            <Label htmlFor="email">?????????</Label>
            <InputContainer>
              <Input
                id="email"
                variant="outlined"
                size="medium"
                name="email"
                type="email"
                error={getInputErrorObject('email')}
              />
            </InputContainer>
          </ListItem>
          <ListItem>
            <Label htmlFor="phoneNumber">???????????????</Label>
            <InputContainer>
              <Input
                id="phoneNumber"
                variant="outlined"
                size="small"
                name="phoneNumber"
                type="text"
                placeholder="- ?????? ???????????????"
                error={getInputErrorObject('phoneNumber')}
              />
            </InputContainer>
          </ListItem>
          <ListItem>
            <Label htmlFor="callNumber">????????????</Label>
            <InputContainer>
              <Input
                id="callNumber"
                variant="outlined"
                size="large"
                name="callNumber"
                type="text"
                placeholder="- ?????? ???????????????"
                error={getInputErrorObject('callNumber')}
              />
            </InputContainer>
          </ListItem>
          <ListItem>
            <Label htmlFor="address">??????</Label>
            <InputContainer>
              <AddressContainer>
                <Input
                  readOnly
                  variant="outlined"
                  size="small"
                  name="postcode"
                  type="text"
                  value={postcode}
                  placeholder="???????????? ??????"
                  error={getInputErrorObject('postcode')}
                />
                <Button
                  size="xsmall"
                  value="?????? ??????"
                  type="button"
                  onClick={onAddressSearchClick}
                  theme="white"
                />
              </AddressContainer>
              <Input
                readOnly
                variant="outlined"
                size="large"
                name="address1"
                type="text"
                value={address}
                error={getInputErrorObject('address1')}
              />
              <Input
                id="address"
                variant="outlined"
                size="large"
                name="address2"
                type="text"
                placeholder="???????????? ??????"
              />
            </InputContainer>
          </ListItem>
        </SignupList>
        <Button size="small" value="????????????" type="submit" theme="normal" />
      </SignupForm>
    </SignupPageContainer>
  );
};

export default SignupPage;

const formErrorMessage = {
  id: '???????????? 3?????? ?????? ??????????????????',
  email: '????????? ????????? ?????? ????????????',
  password: '??????????????? 3?????? ?????? ??????????????????',
  confirmPassword: '??????????????? ???????????? ????????????',
  name: '????????? ????????? ????????? ??? ????????????',
  phoneNumber: '????????? ?????? ????????? ?????? ????????????',
  postcode: '??????????????? ???????????? ???????????????',
  address1: '????????? ???????????? ???????????????',
};

const signUpTitleSize = '2rem';
const signupPageHeight = '800px';
const signupFormMargin = '100px';
const signupListItemPadding = '15px';
const labelBgColor = '#e7e7e748';
const requiredColor = '#ff5353';

const SignupPageContainer = styled.section`
  width: 100%;
  height: ${signupPageHeight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpTitle = styled.div`
  font-size: ${signUpTitleSize};
  text-align: center;
`;

const SignupForm = styled.form`
  width: 50%;
  height: 100%;
  margin-top: ${signupFormMargin};
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignupList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const ListItem = styled.li`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${greyLine};
  &:last-child > div {
    & > div {
      margin-bottom: ${signupListItemPadding};
    }
  }
`;

const InputContainer = styled.div`
  padding: ${signupListItemPadding};
`;

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  width: 30%;
  height: 100%;
  background-color: ${labelBgColor};
  padding: ${signupListItemPadding};
  font-family: ${baeminFont};

  &::after {
    content: '*';
    margin-left: 5px;
    font-weight: bold;
    color: ${requiredColor};
  }
  &[for='callNumber']::after {
    content: '';
  }
`;
