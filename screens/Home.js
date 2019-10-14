import React from 'react'
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native'
import { authorize, logout, getUserArtistsPromise } from '../spotify-api-client'
import ArtistaFavorito from '../ArtistaFavorito'
import {connect} from 'react-redux';
import {UPDATE_FAVORITES} from '../reducers/artists'
import {getFavorites, saveFavorite} from '../firestore'

class HomeScreen extends React.Component {
  state = {
    result: null,
  }

  async componentDidMount() {
    getUserArtistsPromise().then(artistas => this.setState({ artistas }))
    const theFavorites = await getFavorites()
    console.warn(theFavorites)
    this.props.updateFavorites(theFavorites)
    console.warn(this.props.favorites)
  }

  _handleLogoutButtonPress = () => {
    logout().then(() => {
      this.props.navigation.navigate('Auth')
    })
  }

  async _updateFavoriteArtists () {
    const theFavorites = await getFavorites()
    this.props.updateFavorites(theFavorites)
    console.warn('updated')
  }

 _handleStarButtonPress = (artist) => {
     this.updateFavoriteArtists
     saveFavorite(artist)

  }

  render() {
    const { loggedIn, artistas } = this.state

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {artistas && artistas.map(artist => <ArtistaFavorito handleStarButtonPress={this._handleStarButtonPress} favorites={this.props.favorites} artista={artist} key={artist.nombre} />)}
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <Button title="Logout" onPress={this._handleLogoutButtonPress} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    favorites: state.artists.favoritos,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateFavorites: (favorites) => {
      return dispatch ({
        type: UPDATE_FAVORITES,
        payload: {
          favorites: favorites
        },
      });
    },
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (HomeScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000000C0',
  },

  scrollView: {
    flex: 1,
    width: '100%',
  },

  scrollViewContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
})
