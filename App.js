import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
  Alert,
  Linking,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'MyPage') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Preferences') {
              iconName = focused ? 'cog' : 'cog-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Preferences" component={PreferencesScreen} />
        <Tab.Screen name="MyPage" component={MyPageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const PreferencesScreen = ({route, navigation}) => {
  const [foodCandidates, setFoodCandidates] = useState([]);
  const foodByPurpose = {
    Any: [
      'Beef',
      'Chicken',
      'Pork',
      'Fish',
      'Turkey',
      'Sushi',
      'Pasta',
      'Bulgogi',
      'Dumpling',
      'Noodles',
      'Cake',
      'Shrimp',
      'Burger',
      'Pizza',
      'Bacon',
      'Soup',
    ],
    Diet: ['Salad', 'Yogurt', 'Cereal', 'Fruits', 'Oatmeal', 'Beans'],
    Growth: ['Beef', 'Chicken', 'Pork', 'Fish', 'Turkey'],
    Bulk: ['Beef', 'Chicken', 'Pork', 'Fish', 'Turkey', 'Tofu'],
  };
  const [purpose, setPurpose] = useState(null);
  const [eatenFoods, setEatenFoods] = useState([]);
  useEffect(() => {
    if (route.params?.retry === true) {
      console.log('hi');
      setPurpose(null);
      setEatenFoods([]);
    }
  }, [route.params]);
  useEffect(() => {
    if (purpose) {
      let temp = foodCandidates.concat(foodByPurpose[purpose]);
      setFoodCandidates(temp);
    }
  }, [purpose]);
  useEffect(() => {
    if (eatenFoods.length >= 5) {
      let temp = foodCandidates.concat(eatenFoods);
      setFoodCandidates(temp);
      var item =
        foodCandidates[Math.floor(Math.random() * foodCandidates.length)];
      navigation.navigate('MyPage', {food: item});
    }
  }, [eatenFoods]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          top: 45,
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          zIndex: 3,
        }}>
        <Image
          source={require('./images/back.png')}
          style={{
            resizeMode: 'contain',
            width: 100,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          height: 50,
          flex: 0.5,
          backgroundColor: '#FF730E',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('./images/robot.png')}
          style={{
            height: 30,
            width: 30,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: 'black',
          }}>
          {`  BOT`}
        </Text>
      </View>
      <View
        style={{
          height: 618,
        }}>
        <ScrollView>
          <ChatBox
            color="#FC9449"
            width="70%"
            text="What Should I Eat Today?"
            textColor="white"
            left="20%"
          />
          <ChatBox
            color="#FFECDE"
            width="60%"
            text="What is Your Purpose?"
            textColor="black"
            left="0%"
          />
          {purpose && (
            <ChatBox
              color="#FC9449"
              width="30%"
              text={purpose}
              textColor="white"
              left="60%"
            />
          )}
          {purpose && (
            <ChatBox
              color="#FFECDE"
              width="70%"
              text="What Did You Eat In Past 2 Weeks? (Enter 5)"
              textColor="black"
              left="0%"
            />
          )}
          {eatenFoods?.length >= 1 && (
            <ChatBox
              color="#FC9449"
              width="30%"
              text={eatenFoods[0]}
              textColor="white"
              left="60%"
            />
          )}
          {eatenFoods?.length >= 2 && (
            <ChatBox
              color="#FC9449"
              width="30%"
              text={eatenFoods[1]}
              textColor="white"
              left="60%"
            />
          )}
          {eatenFoods?.length >= 3 && (
            <ChatBox
              color="#FC9449"
              width="30%"
              text={eatenFoods[2]}
              textColor="white"
              left="60%"
            />
          )}
          {eatenFoods?.length >= 4 && (
            <ChatBox
              color="#FC9449"
              width="30%"
              text={eatenFoods[3]}
              textColor="white"
              left="60%"
            />
          )}
          {eatenFoods?.length >= 5 && (
            <ChatBox
              color="#FC9449"
              width="30%"
              text={eatenFoods[4]}
              textColor="white"
              left="60%"
            />
          )}
        </ScrollView>
      </View>
      {!purpose && <SelectWindow setPurpose={setPurpose} />}
      {purpose && (
        <EnterBox eatenFoods={eatenFoods} setEatenFoods={setEatenFoods} />
      )}
    </SafeAreaView>
  );
};

const EnterBox = ({eatenFoods, setEatenFoods}) => {
  const [text, onChangeText] = useState(null);
  return (
    <View
      style={{
        backgroundColor: '#FFBE8F',
        height: 50,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        style={{
          backgroundColor: 'white',
          height: 35,
          margin: 5,
          width: '80%',
          borderRadius: 10,
        }}
      />
      <Button
        title="Enter"
        onPress={() => {
          setEatenFoods([...eatenFoods, text]);
          onChangeText(null);
        }}
      />
    </View>
  );
};

const SelectWindow = ({setPurpose}) => {
  return (
    <View
      style={{
        backgroundColor: '#FFBE8F',
        height: 100,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 180,
            height: 30,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            shadowOffset: {
              width: 5,
              height: 5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }}
          onPress={() => setPurpose('Any')}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
            }}>
            Any
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 180,
            height: 30,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            shadowOffset: {
              width: 5,
              height: 5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }}
          onPress={() => setPurpose('Diet')}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
            }}>
            Diet
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 180,
            height: 30,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            shadowOffset: {
              width: 5,
              height: 5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }}
          onPress={() => setPurpose('Bulk')}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
            }}>
            Bulk
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 180,
            height: 30,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            shadowOffset: {
              width: 5,
              height: 5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }}
          onPress={() => setPurpose('Growth')}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
            }}>
            Growth
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ChatBox = ({text, width, color, textColor, left}) => {
  return (
    <View
      style={{
        backgroundColor: color,
        height: 50,
        width: width,
        margin: 15,
        borderRadius: 20,
        left: left,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      }}>
      <Text
        style={{
          fontSize: 20,
          color: textColor,
          fontWeight: '600',
        }}>
        {text}
      </Text>
    </View>
  );
};

const MyPageScreen = ({route, navigation}) => {
  const path = {
    TBD: require('./images/TBD.png'),
    Beef: require('./images/Beef.png'),
    Chicken: require('./images/Chicken.png'),
    Pork: require('./images/Pork.png'),
    Fish: require('./images/Fish.png'),
    Turkey: require('./images/Turkey.png'),
    Sushi: require('./images/Sushi.png'),
    Pasta: require('./images/Pasta.png'),
    Bulgogi: require('./images/Bulgogi.png'),
    Dumpling: require('./images/Dumpling.png'),
    Noodles: require('./images/Noodles.png'),
    Cake: require('./images/Cake.png'),
    Shrimp: require('./images/Shrimp.png'),
    Burger: require('./images/Burger.png'),
    Pizza: require('./images/Pizza.png'),
    Bacon: require('./images/Bacon.png'),
    Soup: require('./images/Soup.png'),
    Salad: require('./images/Salad.png'),
    Yogurt: require('./images/Yogurt.png'),
    Cereal: require('./images/Cereal.png'),
    Fruits: require('./images/Fruits.png'),
    Oatmeal: require('./images/Oatmeal.png'),
    Beans: require('./images/Beans.png'),
    Tofu: require('./images/Tofu.png'),
  };
  const foodDescription = {
    TBD: '미정',
    Beef: 'Beef can be prepared in various ways; cuts are often used for steak, which can be cooked to varying degrees of doneness, while trimmings are often ground or minced, as found in most hamburgers. Beef contains protein, iron, and vitamin B12.',
    Chicken:
      'Fried chicken, also known as Southern fried chicken, is a dish consisting of chicken pieces that have been coated with seasoned flour or batter and pan-fried, deep fried, pressure fried, or air fried. The breading adds a crisp coating or crust to the exterior of the chicken while retaining juices in the meat. Broiler chickens are most commonly used.',
    Pork: 'Pork is eaten both freshly cooked and preserved; curing extends the shelf life of pork products. Ham, gammon, bacon, and sausage are examples of preserved pork.',
    Fish: 'Fish can be prepared in a variety of ways. It can be served uncooked (raw food, e.g., sashimi); cured by marinating (e.g., ceviche), pickling (e.g., pickled herring) or smoking (e.g., smoked salmon); or cooked by baking, frying (e.g., fish and chips), grilling, poaching (e.g., court-bouillon) or steaming.',
    Turkey:
      'A large amount of turkey meat is processed. It can be smoked, and as such, is sometimes sold as turkey ham or turkey bacon, which is considered to be far healthier[citation needed] than pork bacon. ',
    Sushi:
      'Sushi  is a Japanese dish of prepared vinegared rice, usually with some sugar and salt, accompanied by a variety of ingredients, such as seafood, often raw, and vegetables.',
    Pasta:
      'As a category in Italian cuisine, both fresh and dried pastas are classically used in one of three kinds of prepared dishes: as pasta asciutta (or pastasciutta), cooked pasta is plated and served with a complementary sauce or condiment',
    Bulgogi:
      'Bulgogi literally "fire meat", is a gui (Korean-style grilled or roasted dish) made of thin, marinated slices of meat, most commonly beef, grilled on a barbecue or on a stove-top griddle.',
    Dumpling:
      'Dumpling is a broad class of dishes that consist of pieces of dough (made from a variety of starch sources), often wrapped around a filling. The dough can be based on bread, flour, buckwheat or potatoes, and may be filled with meat, fish, tofu, cheese, vegetables, fruits or sweets.',
    Noodles:
      'Noodles are a type of food made from unleavened dough which is rolled flat and cut, stretched or extruded, into long strips or strings. Noodles can be refrigerated for short-term storage or dried and stored for future use.',
    Cake: 'Cake is a flour confection made from flour, sugar, and other ingredients, and is usually baked. In their oldest forms, cakes were modifications of bread, but cakes now cover a wide range of preparations that can be simple or elaborate',
    Shrimp:
      'As with other seafood, shrimp is high in protein but low in food energy. A shrimp-based meal is also a significant source of cholesterol, from 122 mg to 251 mg per 100 g of shrimp.',
    Burger:
      'A hamburger, or simply burger, is a food consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bunor bread roll.',
    Pizza:
      'Pizza is a dish of Italian origin consisting of a usually round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients',
    Bacon:
      'Bacon is a type of salt-cured pork made from various cuts, typically the belly or less fatty parts of the back',
    Soup: 'Soup is a primarily liquid food, generally served warm or hot (but may be cool or cold), that is made by combining ingredients of meat or vegetables with stock, milk, or water',
    Salad:
      'A salad is a dish consisting of mixed, mostly natural ingredients with at least one raw ingredient. They are often dressed, and typically served at room temperature or chilled, though some can be served warm.',
    Yogurt:
      'Yogurt is a food produced by bacterial fermentation of milk. The bacteria used to make yogurt are known as yogurt cultures.',
    Cereal:
      'A cereal is any grass cultivated for the edible components of its grain (botanically, a type of fruit called a caryopsis), composed of the endosperm, germ, and bran.',
    Fruits:
      'Various culinary fruits provide significant amounts of fiber and water, and many are generally high in vitamin C.',
    Oatmeal:
      'Oatmeal is a preparation of oats that have been de-husked, steamed, and flattened, or a coarse flour of hulled oat grains (groats) that have either been milled (ground) or steel-cut.',
    Beans:
      'A bean is the seed of one of several genera of the flowering plant family Fabaceae, which are used as vegetables for human or animal food.음식',
    Tofu: 'Tofu also known as bean curd in English, is a food prepared by coagulating soy milk and then pressing the resulting curds into solid white blocks of varying softness',
  };
  const food = route.params?.food ?? 'TBD';
  var foodName = JSON.stringify(food).replace(/['"]+/g, '');
  var foodImagePath = path[foodName] ?? require('./images/TBD.png');
  var mapLink =
    'https://www.google.com/maps/search/MA+Franklin+County+' +
    foodName +
    '/@42.5324513,-72.5966329,12z';
  const buttonPress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(mapLink);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(mapLink);
    } else {
      Alert.alert(
        `Don't know how to open this URL: https://www.grammarly.com/`,
      );
    }
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View
            style={{
              top: 30,
              bottom: 30,
              backgroundColor: '#FF730E',
              height: 60,
              width: '80%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 25,
              }}>
              Our Recommendation is...
            </Text>
          </View>
          <Image
            source={foodImagePath}
            style={{
              resizeMode: 'contain',
              width: 350,
              height: 350,
            }}
          />
          <Text
            style={{
              fontSize: 50,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {foodName}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#66e39c',
              borderColor: 'black',
              borderWidth: 2,
              width: 330,
              height: 60,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
            }}
            onPress={buttonPress}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              Click to Find {foodName} Restaurants
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              top: 30,
              height: 150,
              width: 150,
              backgroundColor: '#FF730E',
              borderRadius: 100,
              borderColor: '#FFC599',
              borderWidth: 20,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2,
            }}
            onPress={() => navigation.navigate('Preferences', {retry: true})}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {`RETRY`}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 150,
              width: '90%',
              top: 50,
            }}>
            <Text style={{fontSize: 20}}>
              {foodDescription[foodName] ?? ''}
            </Text>
          </View>
          <View style={{height: 100}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const HomeScreen = ({navigation}) => {
  const [showAds, setShowAds] = useState(true);
  const buttonPress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL('https://www.grammarly.com/');

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL('https://www.grammarly.com/');
    } else {
      Alert.alert(
        `Don't know how to open this URL: https://www.grammarly.com/`,
      );
    }
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 0.4,
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: '700',
          }}>
          What To Eat?
        </Text>
      </View>
      <Image
        source={require('./images/logo.png')}
        style={{
          resizeMode: 'contain',
          width: 150,
          height: 150,
        }}
      />
      <TouchableOpacity
        style={{
          height: 200,
          width: 200,
          backgroundColor: '#FF730E',
          borderRadius: 100,
          borderColor: '#FFC599',
          borderWidth: 20,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
        }}
        onPress={() => navigation.navigate('Preferences')}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {`Preferences\n(Click to Enter)`}
        </Text>
      </TouchableOpacity>
      {showAds && (
        <TouchableOpacity
          style={{
            top: 30,
            width: '80%',
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
          onPress={buttonPress}>
          <Image
            source={require('./images/ads.png')}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          <View
            style={{
              width: 30,
              height: 20,
              position: 'absolute',
              top: 10,
              left: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              Ads
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              position: 'absolute',
              top: 10,
              right: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setShowAds(false)}>
            <Image
              source={require('./images/cross.png')}
              style={{
                resizeMode: 'contain',
                width: 30,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={{
          top: 60,
          width: 120,
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FF730E',
          borderRadius: 10,
          borderWidth: 10,
          borderColor: '#FFC599',
        }}
        onPress={() =>
          Alert.alert('Made By Sean Choi (sean.choi@eaglebrook.org)')
        }>
        <Text style={{fontSize: 25, fontWeight: '700'}}>Credit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
