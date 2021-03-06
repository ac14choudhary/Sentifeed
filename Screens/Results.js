import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  button,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import LottieView from 'lottie-react-native';
import axios from 'axios';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
var lottieSource1 = require('../assets/happy.json');
var lottieSource2 = require('../assets/angry.json');
var value = 'positive';
const finalLottie = value == 'positive' ? lottieSource1 : lottieSource2;

export default function Results({route}) {
  const individualValue = route.params.response;
  const [positive, setPositive] = useState(0);
  const [negative, setNegative] = useState(0);
  console.log(individualValue);
  const total = positive + negative;
  const data = [positive, negative];

  useEffect(() => {
    axios
      .get('https://ayushfirst.herokuapp.com/test2')
      .then(res => {
        setPositive(res.data.Positive);
        setNegative(res.data.Negative);
      })
      .catch(err => {
        console.log(err);
      });
  });
  console.log(positive);
  console.log(negative);

  const pieData = [
    {
      key: 1,
      value: positive,
      svg: {fill: '#31AE33'},
    },
    {
      key: 2,
      value: negative,
      svg: {fill: '#FA0A1B'},
    },
  ];

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/BG.png')}
        resizeMode={'cover'}
        style={{
          height: height,
          width: width,
          flex: 1,
          flexDirection: 'column',
        }}>
        <View style={styles.one}>
          <Text
            style={{
              fontSize: 30,
              marginVertical: 5,
              marginHorizontal: 10,
              fontWeight: 'bold',
              color: '#26538E',
            }}>
            Lets see the Results now
          </Text>
          <Text
            style={{fontSize: 14, marginHorizontal: 10, fontWeight: 'bold'}}>
            Sentifeed provides you with your individual feedback as well as
            total count
          </Text>
        </View>
        <View style={styles.two}>
          <View style={styles.twoone}>
            <Text
              style={{
                fontSize: 18,
                marginTop: 20,
                marginBottom: 5,
                marginLeft: 10,
                fontWeight: 'bold',
                color: '#26538E',
              }}>
              Your entered the statement -
            </Text>
            <View style={styles.twotwo}>
              <Text style={{fontSize: 16, margin: 10}}>
                {route.params.input}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.three}>
          <View style={styles.threeone}>
            <Text
              style={{
                fontSize: 18,
                marginTop: 10,
                marginHorizontal: 10,
                fontWeight: 'bold',
                color: '#26538E',
              }}>
              Your Statement was -
            </Text>
          </View>
          <View style={styles.threetwo}>
            <View style={styles.threetwoone}>
              <LottieView
                style={{alignSelf: 'center', height: height / 2.5}}
                source={
                  individualValue == 'positive' ? lottieSource1 : lottieSource2
                }
                autoPlay
                loop
              />
            </View>

            <View style={styles.threetwotwo}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  margin: 10,
                  alignSelf: 'center',
                  color: individualValue == 'positive' ? '#31AE33' : '#FA0A1B',
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor:
                    individualValue == 'positive' ? '#31AE33' : '#FA0A1B',
                  paddingHorizontal: '4%',
                  padding: '3%',
                }}>
                {individualValue}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.four}>
          <View style={styles.fourone}>
            <Text
              style={{
                fontSize: 18,
                marginTop: 10,
                marginHorizontal: 10,
                fontWeight: 'bold',
                color: '#26538E',
              }}>
              Ovreall Results are -
            </Text>
          </View>
          <View style={styles.fourtwo}>
            <View style={styles.fourtwoone}>
              <PieChart
                style={{height: height / 6}}
                data={pieData}
                outerRadius="90%"
                innerRadius="3%"
              />
            </View>
            <View style={styles.fourtwotwo}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  color: '#31AE33',
                  borderRadius: 4,
                  paddingHorizontal: '4%',
                  padding: '3%',
                }}>
                Positive - {Math.round((positive / total) * 100)}%
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginTop: 20,
                  alignSelf: 'center',
                  color: '#FA0A1B',
                  borderRadius: 4,
                  paddingHorizontal: '4%',
                  padding: '3%',
                }}>
                Negative - {Math.round((negative / total) * 100)}%
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  one: {
    flex: 3,
  },
  two: {
    flex: 6,
  },
  twoone: {flex: 1},
  twotwo: {flex: 2, margin: 10, backgroundColor: 'white', borderRadius: 10},

  three: {
    flex: 6,
  },
  threeone: {flex: 2},

  threetwo: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  threetwoone: {flex: 1, justifyContent: 'center'},
  threetwotwo: {flex: 1, alignSelf: 'center'},
  four: {
    flex: 8,
  },
  fourone: {flex: 2},
  fourtwo: {flex: 10, flexDirection: 'row', justifyContent: 'center'},
  fourtwoone: {flex: 1, justifyContent: 'center'},
  fourtwotwo: {flex: 1, alignSelf: 'center', justifyContent: 'center'},

  fourtwooneimage: {
    alignSelf: 'center',
    flex: 1,
    height: '75%',
    width: '75%',
  },
});
