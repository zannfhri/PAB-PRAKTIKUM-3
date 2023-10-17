import React, { useRef, useState } from "react";
import { View, DrawerLayoutAndroid, StatusBar, SafeAreaView, Modal, Text, TouchableOpacity } from "react-native";
import Header from "./components/header";
import Button from "./components/button";
import Separator from "./components/separator";
import List from "./screens/list";
import Article from "./screens/article";

const App = () => {
  const [page, setPage] = useState("list");
  const [isModalVisible, setModalVisible] = useState(false);
  const drawer = useRef(null);

  const changePage = (pageName) => {
    console.log(`Change page to ${pageName}`);
    setPage(pageName);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigationView = () => (
    <View style={{ padding: 50, backgroundColor: "#222222", flex: 1 }}>
      <Button text="List" onPress={() => changePage("list")} />
      <Separator height={30} />
      <Button text="Article" onPress={() => changePage("article")} />
      <Separator height={30} />
      <Button text="Open Modal" onPress={toggleModal} />
      <Separator height={30} />
      <Button text="Close" onPress={() => drawer.current.closeDrawer()} />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={navigationView}
      >
        <StatusBar backgroundColor="#AA0002" barStyle="light-content" />
        <View style={{ flex: 1 }}>
          <Header drawer={drawer} />
          {page === "list" ? <List /> : page === "article" ? <Article /> : null}
          <Button text="Article" onPress={() => changePage("article")} />
          <Button text="List" onPress={() => changePage("list")} />
        </View>
      </DrawerLayoutAndroid>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={{ width: 300, backgroundColor: "white", padding: 20, borderRadius: 10 }}>
            <Text>Modal Content</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default App;
