import React from "react";
import styled, { css } from "styled-components";

const inputStyle = css`
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.gray[1]};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  border-radius: 12px;
  font-size: 16px;
  line-height: 24px;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[0]};
  }

  &:focus {
    outline-color: ${({ error, theme }) =>
      error ? theme.colors.red[0] : theme.colors.blue[0]};
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    font-size: 18px;
  }
`;

const InputField = styled.input`
  ${inputStyle}
`;

const TextArea = styled.textarea`
  ${inputStyle}
  height: 200px;
  resize: none;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.red[0]};
  font-size: 12px;
  margin-top: 4px;
  margin-left: 16px; // 에러 메시지와 입력 필드 사이에 간격 추가
`;

function InputItem({
  id,
  label,
  value,
  onChange,
  placeholder,
  onKeyDown,
  isTextArea,
  error, // 에러 메시지를 전달받음
}) {
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      {isTextArea ? (
        <TextArea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
        />
      ) : (
        <InputField
          id={id}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          error={error}
        />
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

export default InputItem;
