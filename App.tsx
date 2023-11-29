import React, {useRef, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DraggableFlatList, {
  ScaleDecorator,
  OpacityDecorator,
  ShadowDecorator,
  useOnCellActiveAnimation,
} from 'react-native-draggable-flatlist';

type Item = {
  key: string;
  label: string;
  height: number;
  backgroundColor: string;
};

const App = () => {
  const dragRef: any = useRef(null);
  const [data, setData] = useState([
    {key: 1, label: 'Flashlight'},
    {key: 2, label: 'Timer'},
    {key: 3, label: 'Hearing'},
    {key: 4, label: 'Screen Mirroring'},
    {key: 5, label: 'Code Scanner'},
    {key: 6, label: 'Dark Mode'},
    {key: 7, label: 'Music Recognition'},
    {key: 8, label: 'Screen Recording'},
    {key: 9, label: 'Alarm'},
  ]);

  const renderHeaderComponent = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headingText}>INCLUDED CONTROLS</Text>
      </View>
    );
  };

  const renderItem = ({item}: any) => {
    console.log('item -----', item?.getIndex(), item?.item?.label);
    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.7}>
          <ShadowDecorator>
            <View style={styles.bodyContainer}>
              <View style={styles.innerContainer}>
                <Text style={styles.bodyText}>{item?.item?.label}</Text>
              </View>
              <TouchableOpacity
                onLongPress={item?.drag}
                activeOpacity={0.7}
                style={[
                  styles.boxContainer,
                  {
                    height: item?.item?.height,
                    backgroundColor: item?.item?.backgroundColor,
                    elevation: 0,
                  },
                ]}>
                <Image
                  source={{
                    uri: 'https://assets.stickpng.com/thumbs/588a64f5d06f6719692a2d13.png',
                  }}
                  resizeMode="contain"
                  style={{height: '100%', width: 50}}
                />
              </TouchableOpacity>
            </View>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: '#E8E8E8'}}>
      <DraggableFlatList
        ref={dragRef}
        data={data}
        keyExtractor={(item: any) => item?.key}
        onDragEnd={({data}: any) => setData(data)}
        renderItem={(item: any) => renderItem({item})}
        ListHeaderComponent={renderHeaderComponent}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headingText: {
    color: '#808080',
    fontSize: 15,
    fontWeight: '800',
  },
  bodyContainer: {
    height: 40,
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerContainer: {
    justifyContent: 'center',
    paddingStart: 20,
  },
  bodyText: {
    color: '#010101',
    fontSize: 16,
    fontWeight: '500',
  },
  boxContainer: {},
});

export default App;
