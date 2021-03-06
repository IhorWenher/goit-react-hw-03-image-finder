import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import Button from './components/Button';
import Styles from './App.module.css';

class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    showModal: false,
    url: {
      srcLarge: '',
      altLarge: '',
    },
    fotos: false,
  };

  toggleModal = event => {
    if (event !== null) {
      this.setState({
        url: {
          srcLarge: event.target.currentSrc,
          altLarge: event.target.alt,
        },
      });
    }

    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleFormSubmit = searchValue => {
    this.setState({ searchValue });
  };

  loadMoreImages = () => {
    this.setState({ page: this.state.page + 1 });
    this.setState(prevState => ({ searchValue: prevState.searchValue }));
  };

  toggleFotos = () => {
    this.setState({ fotos: true });
  };

  render() {
    const { searchValue, page, showModal, url, fotos } = this.state;

    return (
      <div className={Styles.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer />
        <ImageGallery
          searchValue={searchValue}
          page={page}
          onImageClick={this.toggleModal}
          onAddFotos={this.toggleFotos}
        />

        {fotos && <Button onLoadMoreClick={this.loadMoreImages} />}

        {showModal && (
          <Modal
            srcLarge={url.srcLarge}
            altLarge={url.altLarge}
            onModalClick={this.toggleModal}
          />
        )}
      </div>
    );
  }
}

export default App;
