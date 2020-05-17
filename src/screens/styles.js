import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #2b2b2b;
  padding: 15px;
`;

export const SearchInput = styled.TextInput`
  background-color: #fff;
  max-height: 45px;
  width: 100%;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #5c5c5c;
`;

export const ListItem = styled.View`
  flex: 1;
  height: 60px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
`;

export const ItemText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export const List = styled.FlatList`
  flex: 1;
  background-color: yellow;
`;
