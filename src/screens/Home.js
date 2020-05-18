import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {Container, SearchInput, ListItem, ItemText, List} from './styles';

import {useDebounce} from '../hooks';

export default function Home() {
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const debouncedSearch = useDebounce(search, 500);

  const getList = () => {
    axios({
      method: 'GET',
      url: 'http://192.168.1.110:3000/artists',
      params: {
        q: debouncedSearch,
      },
    })
      .then(response => {
        console.log(response.data);
        setList(response.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length > 0) {
      getList();
    } else {
      setList([]);
    }
  }, [debouncedSearch]);

  return (
    <Container>
      <SearchInput value={search} onChangeText={setSearch} />
      <List
        data={list}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => (
          <ListItem>
            <ItemText>{item.title}</ItemText>
          </ListItem>
        )}
      />
    </Container>
  );
}
