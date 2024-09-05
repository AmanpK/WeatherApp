import React from 'react';
import {
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { SearchNormal1 } from 'iconsax-react-native';

const SearchBar = ({ onSelectCity, data, searchValue, handleSearch, loading }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onSelectCity(item.name)} style={style.listStyle}>
      <Text style={style.suggestion}>{item.name + ", "+ item.region + ", "+ item.country}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
          borderColor: '#342564',
          borderWidth: 1,
          paddingLeft: 10,
          paddingRight: 13,
          backgroundColor: '#c9e2f6',
          alignSelf: "center",
          borderRadius: 32,
        }}>
        <TextInput
          value={searchValue}
          onChangeText={handleSearch}
          placeholder="Enter city"
          placeholderTextColor={'#342564'}
          style={style.inputContainer}
        />
        {loading ? <ActivityIndicator size={"small"} color={"#342564"}/> :
        <SearchNormal1 size="20" color="#342564" />
}
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    fontSize: 14,
    fontWeight: "500",
    width: '90%',
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 10,
    color: "#342564"
  },
  listStyle: {
    width: "85%",
    alignSelf:"center",
    borderRadius: 10,
    marginTop: "2%"
  },
});

export default SearchBar;
