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
} from './styles';

import {useDebounce} from '../../hooks';

export default function Home() {
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const debouncedSearch = useDebounce(search, 1000);

  const getList = () => {
    axios({
      method: 'GET',
      url: 'http://192.168.1.103:3000/artists',
      params: {
        q: debouncedSearch,
      },
    })
      .then(response => setList(response.data))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length >= 2) {
      getList();
    } else {
      setList([]);
    }
  }, [debouncedSearch]);

  // useEffect(() => {
  //   if (search && search.length >= 2) {
  //     getList();
  //   } else {
  //     setList([]);
  //   }
  // }, [search]);

  return (
    <Container>
      <Label>Search for an artist</Label>
      <SearchInput value={search} onChangeText={setSearch} />
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
    </Container>
  );
}
