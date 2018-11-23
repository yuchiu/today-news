import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  Linking,
  Dimensions,
  SafeAreaView,
  Image,
  View
} from "react-native";

const { height } = Dimensions.get("window");

export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      newsList: [],
      // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
      screenHeight: 0
    };
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
  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };

  render() {
    const { isLoading, newsList } = this.state;
    const scrollEnabled = this.state.screenHeight > height;

    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.newsListWrapper}>
        {newsList.map((news, i) => (
          <ScrollView
            style={styles.newsWrapper}
            key={"news-list-index-" + i}
            scrollEnabled={scrollEnabled}
            onContentSizeChange={this.onContentSizeChange}
          >
            <StatusBar barStyle="light-content" backgroundColor="#468189" />

            <Image
              style={styles.thumbNailImg}
              source={{ uri: news.urlToImage }}
            />
            <Text style={styles.title}>{news.title}</Text>
            <Text style={styles.description}>{news.description}</Text>
            <Text style={styles.publishAt}>{news.publishAt}</Text>
            <Text style={styles.source}>{news.source}</Text>
            <Text style={styles.url} onPress={() => Linking.openURL(news.url)}>
              Link to Article
            </Text>
            <Text>---------------</Text>
          </ScrollView>
        ))}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  newsListWrapper: {
    width: "90%",
    borderColor: "grey"
  },
  newsWrapper: {
    flexGrow: 1
  },
  thumbNailImg: {
    alignSelf: "center",
    height: 150,
    width: "100%",
    borderWidth: 1,
    borderRadius: 2
  },
  title: { fontWeight: "bold" },
  description: {},
  publishAt: {},
  source: { fontWeight: "bold" },
  url: { color: "blue" }
});
