import React, {Component} from 'react';
import {
  Alert,
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  AsyncStorage,
} from 'react-native';

// import SplashScreen from 'react-native-smart-splash-screen';
import {Container, Icon, Content} from 'native-base';

import axios from 'axios';
import Spinner from 'react-native-spinkit';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //Change Your App Name Here
      title: 'Bus 365',
      email: '',
      pass: '',
      logo: '',
      settings: '',
      loading: true,
      size: 90,
      color: '#324191',
      base_url: 'https://moveit.ellixar.com/',
    };

    AsyncStorage.getItem('intro_tokenr', (err, result) => {
      if (result == 'intro123') {
        this.props.navigation.navigate('dash');
      }
    });
  }

  static navigationOptions = {
    drawerLockMode: 'locked-close',
    disableGestures: true,
  };

  componentDidMount() {
    // SplashScreen.close({
    //   animationType: SplashScreen.animationType.scale,
    //   duration: 3100,
    //   delay: 600,
    // });

    this._callwebSettings();
  }

  _callwebSettings() {
    axios
      .get(`${this.state.base_url}Api/webSetting`)
      .then((res) => {
        this.setState({
          logo: res.data.response.logo_url,
          settings: res.data.response,
        });
      })
      .catch((error) => console.log(error.response));

    this.setState({
      loading: false,
    });
  }

  static navigationOptions = {
    title: 'Home',
  };

  _loginBus365() {
    if (this.state.email === '' || this.state.pass === '') {
      Alert.alert(
        this.state.settings.settings.title,
        this.state.settings.must_put_email_pass,
        [
          {
            text: this.state.settings.havn_nt_acc + ' ?',
            onPress: () =>
              this.props.navigation.navigate('registration', {
                logo: this.state.logo,
                settings: this.state.settings,
              }),
          },
          {},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }

      axios
        .get(
          `${this.state.settings.base_url}Api/login?email=${this.state.email}&password=${this.state.pass}`,
        )
        .then((res) => {
          if (res.data.response.status === 'ok') {
            this.setState({
              email: '',
              pass: '',
            });
            AsyncStorage.setItem('intro_tokenr', 'intro123');
            AsyncStorage.setItem(
              'state_data',
              JSON.stringify(this.state),
            );
            AsyncStorage.setItem(
              'user_data',
              JSON.stringify(res.data.response.user_data),
            );
            this.props.navigation.navigate('dash');
          } else {
            Alert.alert(
              this.state.settings.settings.title,
              this.state.settings.email_and_password_d_match,
              [
                {
                  text: this.state.settings.forgot_password,
                  onPress: () =>
                    this.props.navigation.navigate('forget', {
                      logo: this.state.logo,
                      settings: this.state.settings,
                    }),
                },
                {},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
          }
        })
        .catch((error) => console.log(error.response));

      Keyboard.dismiss();
  }

  _logoBusL() {
    if (this.state.logo == '') {
      return <View style={{marginBottom: 50}} />;
    } else {
      return (
        <Image
          style={{width: 180, height: 50}}
          source={{uri: this.state.logo}}
        />
      );
    }
  }

  _getLoginDataPage() {
    if (this.state.loading == true) {
      <View style={{marginTop: 270, alignItems: 'center'}}>
        <Spinner
          style={styles.spinner}
          size={this.state.size}
          type={'Pulse'}
          color={this.state.color}
        />
      </View>;
    } else {
      if (this.state.settings == '') {
        return (
          <View style={{marginTop: 270, alignItems: 'center'}}>
            <Spinner
              style={styles.spinner}
              size={this.state.size}
              type={'Pulse'}
              color={this.state.color}
            />
          </View>
        );
      } else {
        return (
          <View>
            <View style={styles.logoD}>{this._logoBusL()}</View>
            <View style={{width: '90%', marginLeft: '5%'}}>
              <View style={styles.inputbox}>
                <Icon
                  type="FontAwesome"
                  style={styles.fontIcon}
                  name="envelope"
                />
                <TextInput
                  style={styles.inpBox}
                  onChangeText={(email) => this.setState({email})}
                  autoCapitalize="none"
                  placeholder={this.state.settings.email}
                  value={this.state.email}
                />
              </View>

              <View style={styles.inputbox}>
                <Icon type="FontAwesome" style={styles.lockicon} name="lock" />
                <TextInput
                  style={styles.inpBox}
                  onChangeText={(pass) => this.setState({pass})}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  placeholder={this.state.settings.password}
                  value={this.state.pass}
                />
              </View>

              <TouchableOpacity
                onPress={() => this._loginBus365()}
                style={styles.loginbtn}>
                <Text style={styles.logintext}>
                  {this.state.settings.login}
                </Text>
              </TouchableOpacity>

              <View style={{flexDirection: 'row', flex: 1, marginTop: 10}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('registration', {
                      logo: this.state.logo,
                      settings: this.state.settings,
                    })
                  }
                  style={{flex: 1}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#003B93',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {this.state.settings.register}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('forget', {
                      logo: this.state.logo,
                      settings: this.state.settings,
                    })
                  }
                  style={{flex: 1, flexDirection: 'row-reverse'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#003B93',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {this.state.settings.forgot_password}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      }
    }
  }

  render() {
    return (
      <Container>
        <Content style={{backgroundColor: '#F9F9F9'}}>
          {this._getLoginDataPage()}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  loginHeader: {
    backgroundColor: '#003B93',
  },
  inputbox: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#ececec',
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#ffffff',
  },
  logoD: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
    marginTop: 190,
  },
  logoImage: {
    resizeMode: 'contain',
    width: Dimensions.get('window').height <= '600' ? 180 : 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Dimensions.get('window').height <= '600' ? 0 : 30,
  },
  fontIcon: {
    fontSize: 20,
    color: '#003B93',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inpBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    width: '100%',
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 10,
    marginTop: 2,
    fontFamily: 'Montserrat-Regular',
  },
  loginbtn: {
    backgroundColor: '#003B93',
    fontSize: 20,
    borderRadius: 5,
    marginTop: Dimensions.get('window').height <= '600' ? 15 : 20,
    marginBottom: Dimensions.get('window').height <= '600' ? 15 : 20,
    alignItems: 'center',
  },
  logintext: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#ffffff',
    fontSize: 16,
    paddingVertical: 10,
  },
  dashd: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#DAE9FF',
  },
  orLogin: {
    marginTop: Dimensions.get('window').height <= '600' ? 0 : 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  fblogin: {
    width: '45%',
    marginRight: '10%',
    borderWidth: 2,
    borderColor: '#003B93',
    borderRadius: 5,
  },
  fbicon: {
    fontSize: 23,
    color: '#003B93',
    paddingVertical: 11,
    paddingHorizontal: 19,
    backgroundColor: '#003B93',
    color: '#fff',
  },
  lbtntext: {
    fontSize: 16,
    paddingTop: 9,
    paddingLeft: 18,
    color: '#003B93',
    fontFamily: 'Montserrat-SemiBold',
  },
  gmaillogin: {
    width: '45%',
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 5,
  },
  gmailicon: {
    fontSize: 23,
    paddingVertical: 11,
    paddingHorizontal: 19,
    backgroundColor: '#FF0000',
    color: '#fff',
  },
  gmailbtntext: {
    fontSize: 16,
    paddingTop: 9,
    paddingLeft: 18,
    color: '#FF0000',
    fontFamily: 'Montserrat-SemiBold',
  },
  lockicon: {
    fontSize: 20,
    color: '#003B93',
    paddingVertical: 10,
    paddingHorizontal: 19,
  },
});
