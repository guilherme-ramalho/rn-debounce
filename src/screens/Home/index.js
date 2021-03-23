import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {
  Container,
  SearchInput,
  ListItem,
  ItemText,
  List,
  ItemSeparator,
  Label,
  LoaderContainer,
} from './styles';

import {useDebounce} from '../../hooks';
import { ActivityIndicator } from 'react-native';

export default function Home() {
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(search, 1000);

  const getList = () => {
    setIsLoading(true);

    axios({
      method: 'GET',
      url: 'http://192.168.1.104:3000/artists',
      params: {
        q: debouncedSearch,
      },
    })
      .then(response => {
        setIsLoading(false);
        setList(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length >= 2) {
      getList();
    } else {
      setList([]);
    }
  }, [debouncedSearch]);

  return (
    <Container>
      <Label>Search for an artist</Label>
      <SearchInput value={search} onChangeText={setSearch} />
      {
        isLoading ? (
          <LoaderContainer>
            <ActivityIndicator size="large" color="#fff" />
          </LoaderContainer>
        ) : (
          <List
        data={list}
        keyExtractor={item => `${item.id}`}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => (
          <ListItem>
            <ItemText>{item.title}</ItemText>
          </ListItem>
        )}
      />
        )
      }
    </Container>
  );
}
