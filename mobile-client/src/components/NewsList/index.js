import React from "react";
import { FlatList, ActivityIndicator, Text, View } from "react-native";

export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, newsList: [] };
  }

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    try {
      const response = await fetch("http://localhost:3030/api/v1/news/0");
      console.log(response);
      this.setState(
        {
          isLoading: false,
          newsList: response.newsList
        },
        function() {}
      );
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <Text>dasds</Text>
      </View>
    );
  }
}
