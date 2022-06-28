import React from 'react';
import styled from 'styled-components';

const StyledUsersList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  right: 800px;
  top: 70px;
  width: fit-content;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  min-width: 5rem;
  color: #1d1f22;
  box-shadow: 0px 0px 30px rgba(223, 220, 220, 0.5);
  padding: 15px;
  background: #ffffff;
  border: 1px solid #d4d4d5;
  border-radius: 0.3rem;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
`;

export const UserItem = styled.div`
  margin: 0px 0px;
`;
const UserList = props => <StyledUsersList {...props} />;

export { UserList };
