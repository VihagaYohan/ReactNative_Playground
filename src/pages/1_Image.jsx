import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  Image,
  ImageLoadEventData,
  NativeSyntheticEvent,
} from 'react-native';

//const {width, height} = Dimensions.get('screen');

const containerWidth = 300;
const containerHeight = 100;

const ImagePage = () => {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleImageLoad = (event, containerWidth, containerHeight) => {
    const {width, height} = event.nativeEvent.source;
    const aspectRatio = width / height;
    console.log(`width - ${width} height - ${height} ratio - ${aspectRatio}`);

    // Calculate dimensions to fit inside container without white space
    let displayWidth = containerWidth;
    let displayHeight = containerHeight;

    console.log(
      `displayWidth - ${displayWidth} displayHeight - ${displayHeight}`,
    );

    if (width > height) {
      console.log('1');
      // Landscape: Fit width to container
      displayHeight = displayWidth / aspectRatio;
      console.log(`displayHeight - ${displayHeight}`);
      if (displayHeight > containerHeight) {
        displayHeight = containerHeight;
        displayWidth = displayHeight * aspectRatio;
        console.log(
          `displayWidth - ${displayWidth} displayHeight - ${displayHeight}`,
        );
      }
    } else {
      console.log('2');
      // Portrait: Fit height to container
      displayWidth = displayHeight * aspectRatio;
      console.log(`displayWidth - ${displayWidth}`);
      if (displayWidth > containerWidth) {
        displayWidth = containerWidth;
        displayHeight = displayWidth / aspectRatio;
        console.log(
          `displayWidth - ${displayWidth} displayHeight - ${displayHeight}`,
        );
      }
    }

    setImageDimensions({width: displayWidth, height: displayHeight});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/2.jpg')}
          style={[
            styles.image,
            {
              width: imageDimensions.width,
              height: imageDimensions.height,
            },
          ]}
          onLoad={event =>
            handleImageLoad(event, containerWidth, containerHeight)
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: 300,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },

  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImagePage;
