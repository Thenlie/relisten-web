import { Component } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'

import bands from '../lib/bands'

import Player from './Player'
import Modal from './Modal'
import Menu from './Menu'

class Navigation extends Component {
  render() {
    const { app } = this.props;

    return (
      <div className="navigation">
        <style jsx>{`
          .navigation {
            display: flex;
            flex-direction: row;
            height: 50px;
            border-bottom: 1px solid #AEAEAE;
          }

          .navigation .relisten-mobile {
            display: none;
          }

          .navigation .left > span, .navigation a, .navigation .right > div {
            height: 100%;
            font-size: 1.4em;
            text-align: center;
            font-weight: bold;

            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .left {
            display: flex;
            flex: 2;
          }

          .player {
            min-width: 40vw;
            text-align: center;
          }

          .right {
            height: 100%;
            display: flex;
            flex: 2;
            justify-content: flex-end;
            text-align: center;
            font-weight: bold;
            align-items: center;
            cursor: pointer;
          }

          a, .right > div {
            padding: 0 4px;
          }

          .artist, .default {
            padding: 0 8px;
            width: auto;
            text-transform: uppercase;
          }

          a:hover, .right > div:hover {
            background: #333;
            color: #FFF;
          }

          @media only screen and (max-width: 1024px) {
            .navigation .relisten {
              display: none;
            }

            .navigation .relisten-mobile {
              display: flex;
            }

            .navigation .left > span.to, .navigation .artist {
              display: none;
            }
          }

        `}</style>
        <div className="left">
          <Link href="/" prefetch><a className="relisten">RELISTEN</a></Link>
          <Link href="/" prefetch><a className="relisten-mobile">R</a></Link>
          {bands[app.artistSlug] && <span className="to">TO</span>}
          {bands[app.artistSlug] &&
            <Link href="/" as={`/${app.artistSlug}`}>
              <a className="artist">{bands[app.artistSlug].the ? 'THE ' : ''}{bands[app.artistSlug].name}</a>
            </Link>
            /*
            : <span className="default">1,028,334 songs on 60,888 tapes from 102 bands</span>
            */
          }
        </div>
        <div className="player">
          <Player />
        </div>
        <div className="right" onClick={this.toggleMenu}>
          <div>MENU</div>
        </div>
        <Modal ref={ref => this.modal = ref}>
          <Menu />
        </Modal>
      </div>
    )
  }

  toggleMenu = async () => {
    this.modal.toggleModal()
  }
}


const mapStateToProps = ({ app }) => {
  return {
    app
  }
}

export default connect(mapStateToProps)(Navigation)
