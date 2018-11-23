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
      const rawResponse = await fetch("http://10.0.2.2:3030/api/v1/news/0");
      const response = await rawResponse.json();
      this.setState({
        newsList: response.news,
        isLoading: false
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { isLoading, newsList } = this.state;
    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        {newsList.map((news, i) => (
          <View key={"news-list-index-" + i}>
            <Text>{news.title}</Text>
          </View>
        ))}
      </View>
    );
  }
}
